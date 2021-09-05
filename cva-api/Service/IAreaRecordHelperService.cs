using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;

namespace cva_api.Service
{
    public interface IAreaRecordHelperService
    {
        Task<string> ValidateOrder(int orderId, string userId, int areaClaimId, int areaRecordId);

        Task<string> AddBBWRecord(int areaClaimId);
        Task<User> ProcessOrder(string userId,int areaClaimId,int orderId,string PaymentType);
    }
}
