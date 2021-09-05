using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.Module;
using cva_api.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Reflection;
using System;
using cva_api.Model.RequestPayload;
using Hangfire;

namespace cva_api.Service
{
    public class AreaService : IAreaService
    {
        SqlContext db;
        public AreaService(SqlContext _db)
        {
            this.db = _db;
        }

        public async Task<int?> AddAreaRecord(AreaRecord areaRecord)
        {
            if (db != null)
            {
                // var maxBlockNum = await db.AreaRecords.Where(x=>x.AreaClaimId == areaRecord.AreaClaimId).MaxAsync(p => (int?)p.BlockNum) ?? 0;
                // areaRecord.BlockNum = maxBlockNum + 1;   
            
                await db.AreaRecords.AddAsync(areaRecord);
                return await db.SaveChangesAsync();

            }

            return null;
        }

        public async Task<AreaClaim> GetAreaClaimById(int ID)
        {
            if (db != null)
            {
                return await db.AreaClaims.FirstOrDefaultAsync( i=> i.ID == ID);
         
            }

            return null;
        }

        public async Task<List<AreaClaim>> GetAreaClaims()
        {
            if (db != null)
            {
                return await db.AreaClaims.ToListAsync();
            }
            return null;
        }

        public async Task<List<AreaHistory>> GetAreaHistories()
        {
            if (db != null)
            {
                return await db.AreaHistories.ToListAsync();
            }
            return null;
        }

        public async Task<List<AreaHistory>> GetAreaHistoriesByOrderId(int OrderId)
        {
            if (db != null)
            {
                return await db.AreaHistories.Where(x=>x.OrderId == OrderId).ToListAsync();
            }
            return null;
        }

        public async Task<List<AreaRecord>> GetAreaRecords()
        {
            if (db != null)
            {
                return await db.AreaRecords.ToListAsync();
            }
            return null;
        }

        public async Task<List<AreaRecord>> GetAreaRecordsByUserId(string UserId)
        {
            if (db != null)
            {
                return await db.AreaRecords.Where(x=>x.UserId == UserId).ToListAsync();
            }
            return null;
        }

        public async Task<List<AreaRecord>> GetAreaRecordsByUserIdAndAreaClaimId(string UserId, int areaClaimId)
        {
            if (db != null)
            {
                return await db.AreaRecords.Where(x=>x.UserId == UserId && x.AreaClaimId == areaClaimId).ToListAsync();
            }
            return null;
        }

        public async Task<int> UpdateAreaClaims(UpdateAreaClaimPayload updateAreaClaim)
        {
            if (db != null)
            {
                var result = await db.AreaClaims.FirstOrDefaultAsync(x => x.ID == updateAreaClaim.ID);
                if (result == null)
                {
                    return 0;
                }
                Type type = typeof(UpdateAreaClaimPayload);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(updateAreaClaim, null) != null)
                    {
                        var p = result.GetType().GetProperty(property.Name);
                        p.SetValue(result,property.GetValue(updateAreaClaim, null));
                        
                    }
                }
                db.AreaClaims.Update(result);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateAreaRecord(UpdateAreaRecord updateAreaRecord)
        {
            if (db != null)
            {
                var result = await db.AreaRecords.FirstOrDefaultAsync(x => x.ID == updateAreaRecord.ID);
                if (result == null)
                {
                    return 0;
                }
                result.Live = updateAreaRecord.Live;
                db.AreaRecords.Update(result);
                return await db.SaveChangesAsync();
            }
            return 0;
        }
        [AutomaticRetry(Attempts = 5)]
        [Queue("reward")]
        public async Task<string> ValidateOrder(int orderId, string userId, int areaClaimId, int areaRecordId)
        {
            var AreaRecordHelper = new AreaRecordHelper(orderId,userId,areaClaimId,areaRecordId,db);
            return await AreaRecordHelper.ValidateOrder();
        }
    }
}
