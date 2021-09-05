using System.Collections.Generic;
using cva_api.Model;
using System.Threading.Tasks;
using cva_api.ViewModel;
using cva_api.Model.RequestPayload;

namespace cva_api.Service
{
    public interface IUserService
    {
        Task<StatisticView> GetStatistic();
        Task<List<Wallet>> GetWallets();

        Task<List<UserProfile>> GetUsers();
        Task<List<UserProfile>> GetReferees(string UserId);

        Task<User> GetUser(string UserId);

        Task<List<WalletHistory>> GetWalletHistories(string UpdateType);

        Task<List<WalletHistory>> GetWalletHistoriesByWalletId(string UpdateType,string WalletId);

        Task<int> UpdateUserIndex(User User);

        Task<User> GetReferrerByCode( string Code );

        Task<Wallet> AddWalletByUserId(string UserId);

        Task<int> UpdateWallet(Wallet wallet);
        Task<int> UpdateUserProfile(UpdateUserProfile updateUserProfile);

        Task<UserProfile> GetUserProfile(string UserId);
        Task<UserVerification> AddUserVerification(UserVerification UserVerification);

        Task<SellerVerification> AddSellerVerification(SellerVerification SellerVerification);
        Task<int> UpdateUserVerification(UserVerification UserVerification);
        Task<int> UpdateSellerVerification(SellerVerification SellerVerification);
        Task<int> DeleteUserVerification(int ID);
        Task<int> DeleteSellerVerification(int ID);
        Task<int> ApproveUserVerification(UserVerification UserVerification);
        Task<int> ApproveSellerVerification(SellerVerification SellerVerification);
        Task<List<UserVerification>> GetUserVerifications();
        Task<List<SellerVerification>> GetSellerVerifications();
        Task<UserVerification> GetUserVerificationById(int ID);
        Task<SellerVerification> GetSellerVerificationById(int ID);

        Task<List<UserVerification>> GetUserVerificationsByUserId(string UserId);
        Task<List<SellerVerification>> GetSellerVerificationsByUserId(string UserId);

    }
}
