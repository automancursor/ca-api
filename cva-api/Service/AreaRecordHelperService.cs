
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using System.Transactions;
using cva_api.Data;
using cva_api.Model;
using Hangfire;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace cva_api.Service
{

    public class AreaRecordHelperService : IAreaRecordHelperService
    {
        private Order order;
        private User user;
        private AreaClaim areaClaim;
        private AreaRecord areaRecord;
        private SqlContext db;



        public AreaRecordHelperService(SqlContext db)
        {
            this.db = db;
        }
        [AutomaticRetry(Attempts = 5)]
        [Queue("reward")]
        public async Task<string> ValidateOrder(int orderId, string userId, int areaClaimId, int areaRecordId)
        {
            // using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled)){
            try
            {
                this.order = await this.db.Orders.FindAsync(orderId);
                this.areaClaim = await this.db.AreaClaims.FindAsync(areaClaimId);
                this.user = await this.db.Users.FindAsync(userId);
                this.areaRecord = await this.db.AreaRecords.FindAsync(areaRecordId);

                var maxBlockNum = await GetMaxBlockNum();
                this.areaRecord.BlockNum = maxBlockNum + 1;
                await this.db.SaveChangesAsync();

                if (this.order == null || this.areaClaim == null || this.user == null || this.areaRecord == null)
                {
                    throw new Exception("Some Data not ready");
                }

                // await this.ProcessOrder(user,this.areaClaim.ID,this.order.ID);
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
            }
            catch (Exception e)
            {
                throw e;
            }

            // }

        }

        [AutomaticRetry(Attempts = 5)]
        [Queue("reward")]
        public async Task<User> ProcessOrder(string userId, int areaClaimId, int orderId, string PaymentType)
        {
            var currentUser = await this.db.Users
                                    .Include(x => x.Wallet)
                                    .Include(x => x.Wallet.WalletHistories)
                                    .FirstOrDefaultAsync(x => x.Id == userId);
            var targetAreaCliam = await this.db.AreaClaims.FindAsync(areaClaimId);
            if (PaymentType == "Rpt")
            {
                currentUser.Wallet.WalletHistories.Add(
                                        new WalletHistory
                                        {
                                            Wallet = currentUser.Wallet,
                                            BeforeValue = currentUser.Wallet.Rpt,
                                            AfterValue = currentUser.Wallet.Rpt - targetAreaCliam.Cva * 3,
                                            UpdateType = "Rpt",
                                            Msg = $"区域订单:{orderId}，购买订单支付Rpt",
                                            CreatedDate = DateTime.Now
                                        }
                                    );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.Cvt,
                        AfterValue = currentUser.Wallet.Cvt + targetAreaCliam.Cvt,
                        UpdateType = "Cvt",
                        Msg = $"区域订单:{orderId}，购买订单系统给予Cvt",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.CvtCredit,
                        AfterValue = currentUser.Wallet.CvtCredit + targetAreaCliam.Cvt * (targetAreaCliam.Round - 1),
                        UpdateType = "CvtCredit",
                        Msg = $"区域订单:{orderId}，购买订单系统给予CvtCredit",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.Abg,
                        AfterValue = currentUser.Wallet.Abg + targetAreaCliam.Abg,
                        UpdateType = "Abg",
                        Msg = $"区域订单:{orderId}，购买订单系统给予Abg",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.Rpt = currentUser.Wallet.Rpt - targetAreaCliam.Cva * 3;
                currentUser.Wallet.Cvt = currentUser.Wallet.Cvt + targetAreaCliam.Cvt;
                currentUser.Wallet.CvtCredit = currentUser.Wallet.CvtCredit + targetAreaCliam.Cvt * (targetAreaCliam.Round - 1);
                currentUser.Wallet.Abg = currentUser.Wallet.Abg + targetAreaCliam.Abg;
            }
            else
            {
                currentUser.Wallet.WalletHistories.Add(
                                        new WalletHistory
                                        {
                                            Wallet = currentUser.Wallet,
                                            BeforeValue = currentUser.Wallet.Cva,
                                            AfterValue = currentUser.Wallet.Cva - targetAreaCliam.Cva,
                                            UpdateType = "Cva",
                                            Msg = $"区域订单:{orderId}，购买订单支付Cva",
                                            CreatedDate = DateTime.Now
                                        }
                                    );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.Cvt,
                        AfterValue = currentUser.Wallet.Cvt + targetAreaCliam.Cvt,
                        UpdateType = "Cvt",
                        Msg = $"区域订单:{orderId}，购买订单系统给予Cvt",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.CvtCredit,
                        AfterValue = currentUser.Wallet.CvtCredit + targetAreaCliam.Cvt * (targetAreaCliam.Round - 1),
                        UpdateType = "CvtCredit",
                        Msg = $"区域订单:{orderId}，购买订单系统给予CvtCredit",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.WalletHistories.Add(
                    new WalletHistory
                    {
                        Wallet = currentUser.Wallet,
                        BeforeValue = currentUser.Wallet.Abg,
                        AfterValue = currentUser.Wallet.Abg + targetAreaCliam.Abg,
                        UpdateType = "Abg",
                        Msg = $"区域订单:{orderId}，购买订单系统给予Abg",
                        CreatedDate = DateTime.Now
                    }
                );
                currentUser.Wallet.Cva = currentUser.Wallet.Cva - targetAreaCliam.Cva;
                currentUser.Wallet.Cvt = currentUser.Wallet.Cvt + targetAreaCliam.Cvt;
                currentUser.Wallet.CvtCredit = currentUser.Wallet.CvtCredit + targetAreaCliam.Cvt * (targetAreaCliam.Round - 1);
                currentUser.Wallet.Abg = currentUser.Wallet.Abg + targetAreaCliam.Abg;
            }

            await this.db.SaveChangesAsync();
            return currentUser;
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
                        var targetAreaClaim = await this.db.AreaClaims.FindAsync(int.Parse(key));
                        if (targetAreaClaim != null)
                        {
                            if (this.areaClaim.Active == true)
                            {
                                await this.AddBonus(targetAreaClaim, list[key] * this.areaClaim.Cva);
                            }
                            else
                            {
                                await this.AddBonusCredit(targetAreaClaim, list[key] * this.areaClaim.Cva);
                            }

                        }
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
            var minBlockNum = await this.db.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID && x.Live > 0 && x.BlockNum != 0).MinAsync(p => (int?)p.BlockNum) ?? 0;
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
            if (this.areaRecord.BlockNum == 1)
            {
                return "FirstOne Skip";
            }
            var target = await this.db.AreaRecords.FirstOrDefaultAsync(x => x.BlockNum == this.areaRecord.BlockNum - 1 && x.AreaClaimId == this.areaClaim.ID);
            if (target == null)
            {
                throw new Exception($"FAILED CANNOT FOUND PRE TARGET,BlockNum:{this.areaRecord.BlockNum - 1},AreaClaimID:{this.areaClaim.ID}");
            }
            await this.AddRedLightReward(target.UserId, target);
            await this.AddLight(target, "RED");
            return "SUCCESS";

        }
        public async Task<string> HandleTypeA()
        {

            var currentAreaRecord = await this.db.AreaRecords
                                        .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.UserId == this.user.ReferrerId);
            await this.AddGreenLightReward(this.user.ReferrerId, currentAreaRecord);
            var referrer = await this.db.Users.FindAsync(this.user.ReferrerId);

            if (referrer != null && referrer.ReferrerId != null)
            {
                var referrerAreaRecord = await this.db.AreaRecords
                                        .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.UserId == referrer.ReferrerId);
                await this.AddGrandReward(referrer.ReferrerId, referrerAreaRecord);
            }

            if (currentAreaRecord != null && currentAreaRecord.Live > 0)
            {
                await this.AddLight(currentAreaRecord, "GREEN");
            }
            // await this.AddCvtCredit(this.user.ReferrerId, currentAreaRecord);
            return "SUCCESS";
        }

        public async Task<string> HandleTypeB()
        {
            // await this.AddRedLightReward(this.user.Id, this.areaRecord);
            // await this.AddBaseReward(this.user.ReferrerId, this.areaRecord);
            var records = await this.db.AreaRecords
                                        .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.UserId == this.user.Id && x.ID != this.areaRecord.ID);
            if (records != null)
            {
                await this.AddLight(records, "GREEN");
            }
            await this.AddGreenLightReward(this.user.Id, this.areaRecord);

            var currentAreaRecord = await this.db.AreaRecords
                                        .FirstOrDefaultAsync(x => x.AreaClaimId == this.areaClaim.ID && x.UserId == this.user.ReferrerId);
            await this.AddGrandReward(this.user.ReferrerId, currentAreaRecord);

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
            var list = await this.db.AreaRecords.Where(x => x.AreaClaimId == this.areaClaim.ID).ToListAsync();

            while (target == null)
            {
                if (currentBlockIndex == LastRewardedBlockNum)
                {
                    return null;
                }
                if (currentBlockIndex > maxBlockNum - 1)
                {
                    currentBlockIndex = 1;
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
            this.db.AreaRecords.Update(target);
            await this.db.SaveChangesAsync();
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
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }
        async public Task<int> AddSurCharge(double value, string coinType, string rewardType, int ID)
        {
            var bbw = await this.db.Users
                    .Include(x => x.Wallet)
                    .Include(x => x.Wallet.WalletHistories)
                    .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
            if (bbw == null)
            {
                return 0;
            }
            Type type = typeof(Wallet);
            PropertyInfo property = type.GetProperty(coinType);
            var BeforeValue = property.GetValue(bbw.Wallet, null);
            if (BeforeValue == null)
            {
                return 0;
            }
            bbw.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = bbw.Wallet,
                    BeforeValue = (double)BeforeValue,
                    AfterValue = (double)BeforeValue + value,
                    UpdateType = coinType,
                    Msg = $"系统收取{rewardType},{coinType}手续费，订单:{ID}",
                    CreatedDate = DateTime.Now,
                    WalletHistoryType = WalletHistoryType.SURCHARGE,
                }
            );
            property.SetValue(bbw.Wallet, (double)BeforeValue + value);
            return await this.db.SaveChangesAsync();
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
                    CreatedDate = DateTime.Now,
                    WalletHistoryType = WalletHistoryType.REWARD,
                }
            );
            currentUser.Wallet.Cva += reward;
            await this.AddSurCharge(this.order.Cva * (double)greenReward * (double)surcharge, "Cva", "绿灯分红", this.order.ID);
            await this.db.AreaHistories.AddAsync(areaHistory);
            this.db.Wallets.Update(currentUser.Wallet);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }
        async public Task<string> AddGrandReward(string userId, AreaRecord? target)
        {

            var currentUser = await this.db.Users
            .Include(x => x.Wallet)
            .Include(x => x.Wallet.WalletHistories)
            .FirstOrDefaultAsync(x => x.Id == userId);

            var surcharge = await this.GetConfigdoubleValue("REWARD_SURCHARGE");
            var redReward = await this.GetConfigdoubleValue("GRAND_REWARD");
            if (currentUser == null || surcharge == null || redReward == null)
            {
                return "FAILED";
            }
            var reward = this.order.Cva * (double)redReward * (1 - (double)surcharge);
            var areaHistory = new AreaHistory
            {
                Msg = "系统上级分红",
                ChangedValue = reward,
                BeforeValue = currentUser.Wallet.Cva,
                AfterValue = currentUser.Wallet.Cva + reward,
                UpdateType = "Cva",
                SourceAreaRecordId = this.areaRecord.ID,
                ToAreaRecordId = target?.ID ?? 0,
                OrderId = this.order.ID,
                CreatedDate = DateTime.Now,
            };
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cva,
                    AfterValue = currentUser.Wallet.Cva + reward,
                    UpdateType = "Cva",
                    Msg = $"区域订单:{this.order.ID}, 系统上级分红",
                    CreatedDate = DateTime.Now,
                    WalletHistoryType = WalletHistoryType.REWARD,
                }
            );

            currentUser.Wallet.Cva += reward;
            await this.AddSurCharge(this.order.Cva * (double)redReward * (double)surcharge, "Cva", "上级分红", this.order.ID);
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
                CreatedDate = DateTime.Now,
            };
            currentUser.Wallet.WalletHistories.Add(
                new WalletHistory
                {
                    Wallet = currentUser.Wallet,
                    BeforeValue = currentUser.Wallet.Cva,
                    AfterValue = currentUser.Wallet.Cva + reward,
                    UpdateType = "Cva",
                    Msg = $"区域订单:{this.order.ID}, 系统红灯分红",
                    CreatedDate = DateTime.Now,
                    WalletHistoryType = WalletHistoryType.REWARD,
                }
            );

            currentUser.Wallet.Cva += reward;
            await this.AddSurCharge(this.order.Cva * (double)redReward * (double)surcharge, "Cva", "红灯分红", this.order.ID);
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
                    CreatedDate = DateTime.Now,
                    WalletHistoryType = WalletHistoryType.REWARD,
                }
            );
            currentUser.Wallet.Cva += reward;
            await this.AddSurCharge(this.order.Cva * (double)baseReward * (double)surcharge, "Cva", "3%分红", this.order.ID);
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
            // target.BlockNum = maxBlockNum + 1;
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
            BackgroundJob.Enqueue(() => this.ValidateOrder(targetOrder.ID, targetOrder.UserId, this.areaClaim.ID, target.ID));
            // await this.ValidateOrder(targetOrder.ID, this.user.Id, this.areaClaim.ID, target.ID);
            return "SUCCESS";
        }

        public async Task<string> AddBonus(AreaClaim targetAreaClaim, double bonus)
        {

            targetAreaClaim.AccumulatedBonus += bonus;
            var reward = false;
            if (targetAreaClaim.AccumulatedBonus >= targetAreaClaim.TargetBonus)
            {
                targetAreaClaim.AccumulatedBonus -= targetAreaClaim.TargetBonus;
                reward = true;
            }
            this.db.AreaClaims.Update(targetAreaClaim);
            await this.db.SaveChangesAsync();
            if (reward == true)
            {
                await this.AddBBWRecord(targetAreaClaim.ID);
            }

            return "SUCCESS";
        }

        public async Task<string> AddBonusCredit(AreaClaim targetAreaClaim, double bonus)
        {

            targetAreaClaim.AccumulatedBonusCredit += bonus;
            this.db.AreaClaims.Update(targetAreaClaim);
            await this.db.SaveChangesAsync();
            return "SUCCESS";
        }

        [AutomaticRetry(Attempts = 5)]
        [Queue("reward")]
        public async Task<string> AddBBWRecord(int areaClaimId)
        {
            var targetAreaClaim = await this.db.AreaClaims.FindAsync(areaClaimId);
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
                    .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
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
                // BlockNum = maxBlockNum + 1,
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
            bbw.Wallet.CvtCredit = bbw.Wallet.CvtCredit + targetAreaClaim.Cvt * (targetAreaClaim.Round - 1);
            bbw.Wallet.Abg = bbw.Wallet.Abg + targetAreaClaim.Abg;
            this.db.Users.Update(bbw);
            await this.db.SaveChangesAsync();
            BackgroundJob.Enqueue(() => this.ValidateOrder(bbwOrder.ID, bbw.Id, targetAreaClaim.ID, bbwRecord.ID));
            // await this.ValidateOrder(bbwOrder.ID, bbw.Id, targetAreaClaim.ID, bbwRecord.ID);
            return "AddBBWRecord SUCCESS";
        }


    }
}