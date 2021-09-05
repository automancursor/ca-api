using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.Model.RequestPayload;

namespace cva_api.Service
{
    public interface IAreaService
    {
        Task<List<AreaClaim>> GetAreaClaims();
        Task<int> UpdateAreaClaims(UpdateAreaClaimPayload updateAreaClaim);
        Task<int> UpdateAreaRecord(UpdateAreaRecord updateAreaRecord);
        Task<AreaClaim> GetAreaClaimById(int ID);
        Task<int?> AddAreaRecord(AreaRecord areaRecord);
        Task<List<AreaRecord>> GetAreaRecords();
        Task<List<AreaRecord>> GetAreaRecordsByUserId( string UserId);
        Task<List<AreaRecord>> GetAreaRecordsByUserIdAndAreaClaimId( string UserId,int areaClaimId);

        Task<string> ValidateOrder(int orderId, string userId, int areaClaimId, int areaRecordId);

        Task<List<AreaHistory>> GetAreaHistories();
        Task<List<AreaHistory>> GetAreaHistoriesByOrderId( int OrderId);

    }
}
