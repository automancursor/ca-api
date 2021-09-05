
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using cva_api.Data;
using cva_api.Model;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cva_api.Module
{

    public class AreaRecordHelper
    {
        private Order order;
        private User user;
        private AreaClaim areaClaim;
        private AreaRecord areaRecord;
        private SqlContext db;
        private int orderId;
        private string userId;
        private int areaClaimId;
        private int areaRecordId;



        public AreaRecordHelper(int orderId, string userId, int areaClaimId, int areaRecordId, SqlContext db)
        {
            this.db = db;
            this.orderId = orderId;
            this.userId = userId;
            this.areaClaimId = areaClaimId;
            this.areaRecordId = areaRecordId;
        }
        
        public async Task<string> ValidateOrder()
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)){
                this.order = await this.db.Orders.FindAsync(this.orderId);
                this.areaClaim = await this.db.AreaClaims.FindAsync(this.areaClaimId);
                this.user = await this.db.Users.FindAsync(this.userId);
                this.areaRecord = await this.db.AreaRecords.FindAsync(this.areaRecordId);

                await HandleRewardPre();
                await HandleRewardMin();  
                switch (this.areaRecord.Type)
                {
                    case "a":
                        await HandleTypeA();
                        break;
                    case "b":
                        await HandleTypeB();
                        break;
                    case "c":
                        await HandleTypeC();
                        break;
                    case "d":
                        await HandleTypeD();
                        break;
                    default:
                        break;
                }

                await ReleaseBonus();
                
                await this.db.SaveChangesAsync();
            
                return "SUCCESS";
            // }
           
        }



        public async Task<string> ReleaseBonus()
        {
            var BONUS_LOGIC = await this.db.Configs.AsNoTracking().FirstOrDefaultAsync(x => x.Name == "BONUS_LOGIC");
            if (BONUS_LOGIC == null)
            {
                return "NO BONUS_LOGIC";
            }
            var bonus_json = JsonConvert.DeserializeObject<Dictionary<string, Dictionary<string, double>>>(BONUS_LOGIC.Value, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
            if (bonus_json.ContainsKey(this.areaClaim.ID.ToString()))
            {
                var list = bonus_json[this.areaClaim.ID.ToString()];
                if (list != null)
                {
                    foreach (var key in list.Keys.ToList())
                    {                     
                        await this.AddBonus(int.Parse(key), list[key] * this.areaClaim.Cva);
                        
                    }
                }
                return "ReleaseBonus SUCCESS";
            }
            return "No such Rule";

        }

        public async Task<int> GetMaxBlockNum()
        {
            var maxBlockNum = await this.db.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID).MaxAsync(p => (int?)p.BlockNum) ?? 0;
            return maxBlockNum;
        }

        public async Task<string> HandleRewardMin()
        {
            var minBlockNum = await this.db.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID && x.Live > 0).MinAsync(p => (int?)p.BlockNum) ?? 0;
            if (minBlockNum == 0)
            {
                return "No";
            }
            var target = await this.db.AreaRecords
                               .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.BlockNum == minBlockNum);
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");

            return "SUCCESS";
        }

        public async Task<string> HandleReward()
        {
            var maxBlockNum = await GetMaxBlockNum();
            var target = await this.GetNextRewardTarget(this.areaClaim.LastRewardedBlockNum, maxBlockNum);
            if (target == null)
            {
                return "FAILED CANNOT FOUND NEXT TARGET";
            }
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");
            this.UpdateLastRewardBlockNum(target);
            return "SUCCESS";

        }

        public async Task<string> HandleRewardPre()
        {
            var maxBlockNum = await GetMaxBlockNum();
            var target = await this.db.AreaRecords.FirstOrDefaultAsync(x => x.BlockNum == maxBlockNum - 1 && x.AreaClaimId == this.areaClaim.ID);
            if (target == null)
            {
                return "FAILED CANNOT FOUND NEXT TARGET";
            }
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");
            return "SUCCESS";

        }
        public async Task<string> HandleTypeA()
        {

            var currentAreaRecord = await this.db.AreaRecords
                                        .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.UserId == this.user.ReferrerId);

            if (currentAreaRecord.Live <= 0)
            {
                return "No LIVE";
            }
            await this.AddGreenLightReward(this.user.ReferrerId, currentAreaRecord);
            if (currentAreaRecord != null)
            {
                await this.AddLight(currentAreaRecord, "GREEN");
            }
            await this.AddCvtCredit(this.user.ReferrerId, currentAreaRecord);
            return "SUCCESS";
        }

        public async Task<string> HandleTypeB()
        {
            await this.AddRedLightReward(this.user.Id, this.areaRecord);
            await this.AddBaseReward(this.user.Id, this.areaRecord);
            // var records = this.user.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID).Reverse().ToList();
            // if (records.Count > 1)
            // {
            //     throw new Exception("您已购买该区");
            //     // await this.AddLight(records.Skip(1).Take(1).Last(),"RED");
            // }

            return "SUCCESS";
        }

        public async void UpdateLastRewardBlockNum(AreaRecord target)
        {  
            var targetAreaClaim = await this.db.AreaClaims.FindAsync(target.AreaClaimId);
            targetAreaClaim.LastRewardedBlockNum = target.BlockNum;
            this.db.AreaClaims.Update(targetAreaClaim);
            this.areaClaim.LastRewardedBlockNum = target.BlockNum;
        }
        public async Task<AreaRecord> GetNextRewardTarget(int LastRewardedBlockNum, int maxBlockNum)
        {
            var currentBlockIndex = LastRewardedBlockNum + 1;
            AreaRecord target = null;
            var list = await this.db.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID ).ToListAsync();

            while (target == null)
            {
                if (currentBlockIndex == LastRewardedBlockNum)
                {
                    return null;
                }
                if (currentBlockIndex > maxBlockNum - 1)
                {
                    currentBlockIndex = 0;
                    continue;
                }
                target = list.FindLast(x => x.BlockNum == currentBlockIndex);

                if (target != null)
                {
                    if (target.Live <= 0)
                    {
                        target = null;
                        continue;
                    }
                    else
                    {
                        break;
                    }
                }
                currentBlockIndex += 1;

            }
            return target;
        }

        public async Task<string> HandleTypeC()
        {
            var maxBlockNum = await GetMaxBlockNum();
            var target = await this.GetNextRewardTarget(this.areaClaim.LastRewardedBlockNum, maxBlockNum);
            if (target == null)
            {
                return "FAILED CANNOT FOUND NEXT TARGET";
            }
            await this.AddBaseReward(UserConsts.AdminUserId, target);
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");
            this.UpdateLastRewardBlockNum(target);

            return "SUCCESS";
        }

        public async Task<string> HandleTypeD()
        {
            var maxBlockNum = await GetMaxBlockNum();
            var target = await this.GetNextRewardTarget(this.areaClaim.LastRewardedBlockNum, maxBlockNum);
            if (target == null)
            {
                return "FAILED CANNOT FOUND NEXT TARGET";
            }
            await this.AddBaseReward(this.user.ReferrerId, target);
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");
            this.UpdateLastRewardBlockNum(target);
            return "SUCCESS";
        }

        async public Task<string> AddLight(AreaRecord target, string Type)
        {
            if (Type == "GREEN")
            {
                target.Live += 1;
            }

            var newLight = new LightDto
            {
                Type = Type,
                SourceAreaId = this.areaRecord.ID
            };
            var roundIndex = target.RoundNum - 1;
            if (target.Lights.ElementAtOrDefault(roundIndex) == null)
            {
                var light = new List<LightDto>();
                light.Add(new LightDto
                {
                    Type = "YELLOW"
                });
                light.Add(newLight);
                target.Lights.Insert(roundIndex, light);
            }
            else
            {
                target.Lights[roundIndex].Add(newLight);
            }
            var rebornLight = await this.GetConfigdoubleValue("REBORN_LIGHTS");
            if (rebornLight == null)
            {
                return "FAILED";
            }
            if (target.Lights[roundIndex].Count >= (int)rebornLight + 1)
            {
                if (target.Live >= 0)
                {
                    await this.Reborn(target);
                    await this.ReleaseCvt(target.UserId, target);
                }
                else
                {
                    await this.AddBBWRecord(this.areaClaim.ID);
                }

            }
            this.db.AreaRecords.Update(target);
       
            return "SUCCESS";
        }

        async public Task<double?> GetConfigdoubleValue(string Name)
        {
            var result = await this.db.Configs.AsNoTracking().FirstOrDefaultAsync(x => x.Name == Name);
            if (result == null)
            {
                return null;
            }
            var value = (string)result.Value;
            return double.Parse(value);
        }
        async public Task<string> AddCvtCredit(string userId, AreaRecord? target)
        {
            var currentUser = await this.db.Users
                                    .Include(x => x.Wallet)
                                    .Include(x => x.Wallet.WalletHistories)
                                    .FirstOrDefaultAsync(x => x.Id == userId);
            if (currentUser == null)
            {
                return "FAILED";
            }
            var reward = this.areaClaim.Cvt;
            var areaHistory = new AreaHistory
            {
                Msg = "系统增加CVT_CREADIT",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.CvtCredit,
                AfterValue = currentUser.Wallet.CvtCredit + reward,
                UpdateType = "CvtCredit",
                SourceAreaRecordId = this.areaRecord.ID,
                ToAreaRecordId = target?.ID ?? 0,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            await this.db.AreaHistories.AddAsync(areaHistory);

            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.CvtCredit,
                    AfterValue = currentUser.Wallet.CvtCredit + reward,
                    UpdateType = "CvtCredit",
                    Msg = $"区域订单:{this.order.ID}，系统增加CVT_CREADIT",
                    CreatedDate = DateTime.Now
                }
            );
            currentUser.Wallet.CvtCredit += reward;
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }
        async public Task<string> ReleaseCvt(string userId, AreaRecord target)
        {
            var currentUser = await this.db.Users
                                    .Include(x => x.Wallet)
                                    .Include(x => x.Wallet.WalletHistories)
                                    .FirstOrDefaultAsync(x => x.Id == userId);
            if (currentUser == null)
            {
                return "FAILED";
            }
            var reward = this.areaClaim.Cvt;
            var areaHistory = new AreaHistory
            {
                Msg = "系统加入CVT",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.Cvt,
                AfterValue = currentUser.Wallet.Cvt + reward,
                UpdateType = "cvt",
                SourceAreaRecordId = 0,
                ToAreaRecordId = target.ID,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            await this.db.AreaHistories.AddAsync(areaHistory);
            var areaHistoryRlease = new AreaHistory
            {
                Msg = "系统释放CVT (CVT_CREADIT减少)",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.CvtCredit,
                AfterValue = currentUser.Wallet.CvtCredit - reward,
                UpdateType = "CvtCredit",
                SourceAreaRecordId = 0,
                ToAreaRecordId = target.ID,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            await this.db.AreaHistories.AddAsync(areaHistoryRlease);

            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cvt,
                    AfterValue = currentUser.Wallet.Cvt + reward,
                    UpdateType = "cvt",
                    Msg = $"区域订单:{this.order.ID}，系统加入CVT",
                    CreatedDate = DateTime.Now
                }
            );
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.CvtCredit,
                    AfterValue = currentUser.Wallet.CvtCredit - reward,
                    UpdateType = "CvtCredit",
                    Msg = $"区域订单:{this.order.ID}，系统释放CVT (CVT_CREADIT减少)",
                    CreatedDate = DateTime.Now
                }
            );
            currentUser.Wallet.Cvt += reward;
            currentUser.Wallet.CvtCredit -= reward;
    
            return "SUCCESS";
        }

        async public Task<string> AddGreenLightReward(string userId, AreaRecord? target)
        {
            var currentUser = await this.db.Users
            .Include(x => x.Wallet)
            .Include(x => x.Wallet.WalletHistories)
            .FirstOrDefaultAsync(x => x.Id == userId);

            var surcharge = await this.GetConfigdoubleValue("REWARD_SURCHARGE");
            var greenReward = await this.GetConfigdoubleValue("GREEN_REWARD");
            if (currentUser == null || surcharge == null || greenReward == null)
            {
                return "FAILED";
            }
            var reward = this.order.Cva * (double)greenReward * (1 - (double)surcharge);
            var areaHistory = new AreaHistory
            {
                Msg = "系统绿灯分红",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.Cva,
                AfterValue = currentUser.Wallet.Cva + reward,
                UpdateType = "cva",
                SourceAreaRecordId = this.areaRecord.ID,
                ToAreaRecordId = target?.ID ?? 0,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cva,
                    AfterValue = currentUser.Wallet.Cva + reward,
                    UpdateType = "Cva",
                    Msg = $"区域订单:{this.order.ID}，系统绿灯分红",
                    CreatedDate = DateTime.Now
                }
            );
            currentUser.Wallet.Cva += reward;

            await this.db.AreaHistories.AddAsync(areaHistory);
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }
        async public Task<string> AddRedLightReward(string userId, AreaRecord target)
        {

            var currentUser = await this.db.Users
            .Include(x => x.Wallet)
            .Include(x => x.Wallet.WalletHistories)
            .FirstOrDefaultAsync(x => x.Id == userId);

            var surcharge = await this.GetConfigdoubleValue("REWARD_SURCHARGE");
            var redReward = await this.GetConfigdoubleValue("RED_REWARD");
            if (currentUser == null || surcharge == null || redReward == null)
            {
                return "FAILED";
            }
            var reward = this.order.Cva * (double)redReward * (1 - (double)surcharge);
            var areaHistory = new AreaHistory
            {
                Msg = "系统红灯分红",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.Cva,
                AfterValue = currentUser.Wallet.Cva + reward,
                UpdateType = "Cva",
                SourceAreaRecordId = this.areaRecord.ID,
                ToAreaRecordId = target.ID,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cva,
                    AfterValue = currentUser.Wallet.Cva + reward,
                    UpdateType = "Cva",
                    Msg = $"区域订单:{this.order.ID}, 系统红灯分红",
                    CreatedDate = DateTime.Now
                }
            );

            currentUser.Wallet.Cva += reward;

            await this.db.AreaHistories.AddAsync(areaHistory);
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }
        async public Task<string> AddBaseReward(string userId, AreaRecord target)
        {

            var currentUser = await this.db.Users
            .Include(x => x.Wallet)
            .Include(x => x.Wallet.WalletHistories)
            .FirstOrDefaultAsync(x => x.Id == userId);

            var surcharge = await this.GetConfigdoubleValue("REWARD_SURCHARGE");
            var baseReward = await this.GetConfigdoubleValue("BASE_REWARD");
            if (currentUser == null || surcharge == null || baseReward == null)
            {
                return "FAILED";
            }
            var reward = this.order.Cva * (double)baseReward * (1 - (double)surcharge);
            var areaHistory = new AreaHistory
            {
                Msg = "系统3%分红",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.Cva,
                AfterValue = currentUser.Wallet.Cva + reward,
                UpdateType = "Cva",
                SourceAreaRecordId = this.areaRecord.ID,
                ToAreaRecordId = target.ID,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now
            };
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cva,
                    AfterValue = currentUser.Wallet.Cva + reward,
                    UpdateType = "Cva",
                    Msg = $"区域订单:{this.order.ID}, 系统3%分红",
                    CreatedDate = DateTime.Now
                }
            );
            currentUser.Wallet.Cva += reward;

            await this.db.AreaHistories.AddAsync(areaHistory);
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }

        public async Task<string> Reborn(AreaRecord target)
        {
            var maxBlockNum = await GetMaxBlockNum();
            target.HistoryRecords.Add(new HistoryRecord { BlockNum = target.BlockNum, Type = target.Type });
            target.Live -= 1;
            target.BlockNum = maxBlockNum + 1;
            target.Type = "d";
            target.RoundNum += 1;
            var nextRound = new List<LightDto>(){
                        new LightDto{
                            Type = "YELLOW"
                        }
                    };
            target.Lights.Insert(target.RoundNum - 1, nextRound);
            this.db.AreaRecords.Update(target);
            var targetOrder = await this.db.Orders.FindAsync(target.OrderId);
            await this.db.SaveChangesAsync();  
            var newAreaRecordHelper = new AreaRecordHelper(targetOrder.ID, this.user.Id, this.areaClaim.ID, target.ID, this.db);
            await newAreaRecordHelper.ValidateOrder();
            return "SUCCESS";
        }

        public async Task<string> AddBonus(int targetAreaClaimId, double bonus)
        {
            var targetAreaClaim = await this.db.AreaClaims.FindAsync(targetAreaClaimId);
            if(targetAreaClaim == null){
                return "NO such AreaClaims";
            }
            targetAreaClaim.AccumulatedBonus += bonus;
            var reward = false;
            if (targetAreaClaim.AccumulatedBonus >= targetAreaClaim.TargetBonus)
            {
                targetAreaClaim.AccumulatedBonus -= targetAreaClaim.TargetBonus;
                reward = true;
            }
            this.db.AreaClaims.Update(targetAreaClaim);
            await this.db.SaveChangesAsync();    
            if(reward == true){  
                await this.AddBBWRecord(targetAreaClaim.ID);
            }
            
            return "SUCCESS";
        }
        public async Task<string> AddBBWRecord(int targetAreaClaimId)
        {
            var targetAreaClaim = await this.db.AreaClaims.FindAsync(targetAreaClaimId);
            var lights = new List<List<LightDto>>();
            var light = new List<LightDto>();
            light.Add(new LightDto
            {
                Type = "YELLOW"
            });
            lights.Add(light);
            var bbw = await this.db.Users
                    .Include(x => x.Wallet)
                    .Include(x => x.Wallet.WalletHistories)
                    .FirstOrDefaultAsync(x=> x.Id == UserConsts.AdminUserId);
            if (bbw == null)
            {
                return "NO BBW";
            }
            var maxRecordIndex = await this.db.AreaRecords.Where(x => x.AreaClaimId == targetAreaClaim.ID).MaxAsync(p => (int?)p.RecordIndex) ?? 0;
            var bbwOrder = new Order
            {
                UserId = bbw.Id,
                CreatedDate = DateTime.Now,
                Cva = targetAreaClaim.Cva,
                Cvt = targetAreaClaim.Cvt,
                Abg = targetAreaClaim.Abg,
                CvtCredit = targetAreaClaim.Cvt * targetAreaClaim.Round,
                Msg = $"{targetAreaClaim.Name}区域产生BBW衡量点{maxRecordIndex + 1}"
            };

            bbwOrder.User = bbw;
            var maxBlockNum = await this.db.AreaRecords.Where(x => x.AreaClaimId == targetAreaClaim.ID).MaxAsync(p => (int?)p.BlockNum) ?? 0;
            var bbwRecord = new AreaRecord
            {
                Live = targetAreaClaim.Round,
                AreaClaimId = targetAreaClaim.ID,
                BlockNum = maxBlockNum + 1,
                Lights = lights,
                OrderId = bbwOrder.ID,
                Order = bbwOrder,
                UserId = bbw.Id,
                User = bbw,
                AreaClaim = targetAreaClaim,
                RoundNum = 1,
                HistoryRecords = new List<HistoryRecord>(),
                Type = "c",
                RecordIndex = maxRecordIndex + 1
            };
            this.db.Orders.Add(bbwOrder);
            this.db.AreaRecords.Add(bbwRecord);
           
            bbw.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = bbw.Wallet,
                    BeforeValue = bbw.Wallet.Cvt,
                    AfterValue = bbw.Wallet.Cvt + targetAreaClaim.Cvt,
                    UpdateType = "Cvt",
                    Msg = $"区域订单:{bbwOrder.ID}, {targetAreaClaim.Name}区域产生BBW衡量点{maxRecordIndex + 1}, 系统给予Cvt",
                    CreatedDate = DateTime.Now
                }
            );
            bbw.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = bbw.Wallet,
                    BeforeValue = bbw.Wallet.CvtCredit,
                    AfterValue = bbw.Wallet.CvtCredit + targetAreaClaim.Cvt * (targetAreaClaim.Round - 1),
                    UpdateType = "CvtCredit",
                    Msg = $"区域订单:{bbwOrder.ID}，{targetAreaClaim.Name}区域产生BBW衡量点{maxRecordIndex + 1}, 系统给予CvtCredit",
                    CreatedDate = DateTime.Now
                }
            );
            bbw.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = bbw.Wallet,
                    BeforeValue = bbw.Wallet.Abg,
                    AfterValue = bbw.Wallet.Abg + targetAreaClaim.Abg,
                    UpdateType = "Abg",
                    Msg = $"区域订单:{bbwOrder.ID}，{targetAreaClaim.Name}区域产生BBW衡量点{maxRecordIndex + 1}, 系统给予Abg",
                    CreatedDate = DateTime.Now
                }
            );
            
            bbw.Wallet.Cvt = bbw.Wallet.Cvt + targetAreaClaim.Cvt;
            bbw.Wallet.CvtCredit = bbw.Wallet.CvtCredit + this.areaClaim.Cvt * (targetAreaClaim.Round - 1);
            bbw.Wallet.Abg = bbw.Wallet.Abg + targetAreaClaim.Abg;
            this.db.Users.Update(bbw);
            await this.db.SaveChangesAsync();
            var newAreaRecordHelper = new AreaRecordHelper(bbwOrder.ID, bbw.Id, targetAreaClaim.ID, bbwRecord.ID, this.db);
            await newAreaRecordHelper.ValidateOrder();
            return "AddBBWRecord SUCCESS";
        }
    }
}