using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Data;
using cva_api.Model;
using cva_api.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Reflection;
using System;
using cva_api.Model.RequestPayload;

namespace cva_api.Service
{
    public class UserService : IUserService
    {
        SqlContext db;
        public UserService(SqlContext _db)
        {
            this.db = _db;
        }

        public async Task<List<UserProfile>> GetUsers()
        {
            if (db != null)
            {

                var result = new List<UserProfile>();
                var users = await db.Users
                .Include(e => e.Referrer)
                .Include(e => e.Wallet)
                .ToListAsync();
                foreach (var user in users)
                {
                    result.Add(this.ConvertToUserProfile(user));
                }
                return result;
            }

            return null;
        }

        public async Task<List<Wallet>> GetWallets()
        {
            if (db != null)
            {
                var result = await db.Wallets.ToListAsync();
                return result;
            }

            return null;
        }



        public async Task<Wallet> AddWalletByUserId(string UserId)
        {
            if (db != null)
            {
                Wallet wallet = new Wallet()
                {
                    UserId = UserId
                };
                await db.Wallets.AddAsync(wallet);
                await db.SaveChangesAsync();
                return wallet;
            }
            return null;
        }

        public async Task<User> GetReferrerByCode(string Code)
        {
            if (db != null)
            {
                return await db.Users.FirstOrDefaultAsync(x => x.ReferCode == Code);
            }
            return null;
        }

        public UserProfile ConvertToUserProfile(User user)
        {
            var result = new UserProfile()
            {
                Id = user.Id,
                Wallet = user.Wallet,
                Username = user.UserName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                ReferCode = user.ReferCode,
                CreatedDate = user.CreatedDate,
                UserIndex = user.UserIndex,
                PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                EmailConfirmed = user.EmailConfirmed,
                Passport = user.Passport,
                IdCard = user.IdCard,
                CountryCode = user.CountryCode,
                BankDetailCN = user.BankDetailCN,
                OverSeaBankDetail = user.OverSeaBankDetail,
                BlockChainWalletAddress = user.BlockChainWalletAddress,
                AliPay = user.AliPay,
                Wechat = user.Wechat,
                Address = user.Address,
                CompanyName = user.CompanyName,
                CompanyLink = user.CompanyLink,
                CompanyDescription = user.CompanyDescription,
                ShopName = user.ShopName,
                Abn = user.Abn,
                RptRate = user.RptRate,
                SellerVerified = user.SellerVerified,
                shopAvatarImage = user.shopAvatarImage
            };
            if (user.Referrer != null)
            {
                result.Referrer = new UserProfile()
                {
                    Id = user.Referrer.Id,
                    Username = user.Referrer.UserName,
                    Email = user.Referrer.Email,
                    PhoneNumber = user.Referrer.PhoneNumber,
                    ReferCode = user.Referrer.ReferCode,
                    CreatedDate = user.Referrer.CreatedDate,
                    UserIndex = user.Referrer.UserIndex,
                    PhoneNumberConfirmed = user.PhoneNumberConfirmed,
                    EmailConfirmed = user.EmailConfirmed,
                    Address = user.Address
                };
            }

            return result;
        }

        public async Task<UserProfile> GetUserProfile(string UserId)
        {
            if (db != null)
            {
                var user = await db.Users
                    .Include(e => e.Wallet)
                    .Include(e => e.Referrer)
                    .FirstOrDefaultAsync(x => x.Id == UserId);

                if (user == null)
                {
                    return null;
                };
                var result = this.ConvertToUserProfile(user);

                return result;
            }
            return null;
        }

        public async Task<User> GetUser(string UserId)
        {
            if (db != null)
            {
                return await db.Users
                    .Include(e => e.Wallet)
                    .Include(e => e.Wallet.WalletHistories)
                    .Include(e => e.Referrer)
                    .FirstOrDefaultAsync(x => x.Id == UserId);

            }
            return null;
        }

        public async Task<int> UpdateWallet(Wallet wallet)
        {
            if (db != null)
            {
                db.Wallets.Update(wallet);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> UpdateUserIndex(User user)
        {
            if (db != null)
            {
                var maxIndex = await db.Users.MaxAsync(p => (int?)p.UserIndex) ?? 0;
                user.UserIndex = maxIndex + 1;
                db.Users.Update(user);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<List<WalletHistory>> GetWalletHistories(string UpdateType)
        {
            if (db != null)
            {
                return await db.WalletHistories.Where(x => x.UpdateType == UpdateType).ToListAsync();
            }
            return null;
        }

        public async Task<List<WalletHistory>> GetWalletHistoriesByWalletId(string UpdateType, string WalletId)
        {
            if (db != null)
            {
                return await db.WalletHistories.Where(x => x.UpdateType == UpdateType && x.WalletId == WalletId).ToListAsync();
            }
            return null;
        }

        public async Task<List<UserProfile>> GetReferees(string UserId)
        {
            if (db != null)
            {
                var user = await db.Users
                    .Include(e => e.Referees)
                    .FirstOrDefaultAsync(x => x.Id == UserId);
                if (user == null)
                {
                    return null;
                }
                var result = new List<UserProfile>();
                foreach (var u in user.Referees)
                {
                    result.Add(this.ConvertToUserProfile(u));
                }
                return result;

            }
            return null;
        }

        public async Task<StatisticView> GetStatistic()
        {
            if (db != null)
            {
                var result = new StatisticView();
                var wallets = await this.db.Wallets.ToListAsync();
                double Cva = 0;
                double Cvt = 0;
                foreach (var wallet in wallets)
                {
                    Cva += wallet.Cva;
                    Cvt += wallet.Cvt;
                }
                result.Cva = Cva;
                result.Cvt = Cvt;
                return result;
            }
            else
            {
                return null;
            }

        }

        public async Task<int> UpdateUserProfile(UpdateUserProfile updateUserProfile)
        {
            if (db != null)
            {
                var user = await db.Users.FirstOrDefaultAsync(x => x.Id == updateUserProfile.userId);
                if (user == null)
                {
                    return 0;
                }
                user.UserName = updateUserProfile.UserName;
                user.NormalizedUserName = updateUserProfile.UserName.Normalize();
                user.Email = updateUserProfile.Email;
                user.NormalizedEmail = updateUserProfile.Email.Normalize();
                user.PhoneNumber = updateUserProfile.PhoneNumber;
                user.CountryCode = updateUserProfile.CountryCode;
                user.BankDetailCN = updateUserProfile.BankDetailCN;
                user.OverSeaBankDetail = updateUserProfile.OverSeaBankDetail;
                user.AliPay = updateUserProfile.AliPay;
                user.Wechat = updateUserProfile.Wechat;
                user.BlockChainWalletAddress = updateUserProfile.BlockChainWalletAddress;
                user.Address = updateUserProfile.Address;
                user.ShopName = updateUserProfile.ShopName;
                user.CompanyName = updateUserProfile.CompanyName;
                user.CompanyLink = updateUserProfile.CompanyLink;
                user.CompanyDescription = updateUserProfile.CompanyDescription;

                db.Update(user);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<UserVerification> AddUserVerification(UserVerification UserVerification)
        {
            if (db != null)
            {
                if(UserVerification.IdCardNumber!= null){
                    var record = await db.UserVerifications.FirstOrDefaultAsync(x=>x.IdCardNumber == UserVerification.IdCardNumber);
                    if(record != null){
                        return null;
                    }
                }
                if(UserVerification.PassportNumber!= null){
                    var record = await db.UserVerifications.FirstOrDefaultAsync(x=>x.PassportNumber == UserVerification.PassportNumber);
                    if(record != null){
                        return null;
                    }
                }      
                db.UserVerifications.Add(UserVerification);
                var result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                return UserVerification;
            }
            return null;
        }

        public async Task<int> UpdateUserVerification(UserVerification UserVerification)
        {
            if (db != null)
            {
                var result = await db.UserVerifications.AsNoTracking().FirstOrDefaultAsync(x => x.ID == UserVerification.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.UserVerifications.Update(UserVerification);
                Type type = typeof(UserVerification);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(UserVerification, null) == null)
                    {
                        if (property.Name != "User")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> ApproveUserVerification(UserVerification userVerification)
        {
            if (db != null)
            {
                var user = await db.Users.FindAsync(userVerification.UserId);
                userVerification.UserVerificationStatus = UserVerificationStatus.SUCCESS;
                if (userVerification.IdCard != null)
                {
                    user.IdCard = userVerification.IdCard;
                }
                if (userVerification.Passport != null)
                {
                    user.IdCard = userVerification.Passport;
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<List<UserVerification>> GetUserVerifications()
        {
            if (db != null)
            {
                var result = await db.UserVerifications.ToListAsync();
                return result;
            }
            return null;
        }

        public async Task<UserVerification> GetUserVerificationById(int ID)
        {
            if (db != null)
            {
                var result = await db.UserVerifications.FindAsync(ID);
                return result;
            }
            return null;
        }

        public async Task<List<UserVerification>> GetUserVerificationsByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.UserVerifications.Where(x => x.UserId == UserId).ToListAsync();
                return result;
            }
            return null;
        }

        public async Task<int> DeleteUserVerification(int ID)
        {
            if (db != null)
            {
                var result = await db.UserVerifications.FindAsync(ID);
                if (result != null)
                {
                    db.UserVerifications.Remove(result);
                    return await db.SaveChangesAsync();
                }
                else{
                    return 0;
                }

            }
            return 0;
        }

        public async Task<int> UpdateSellerVerification(SellerVerification SellerVerification)
        {
             if (db != null)
            {
                var result = await db.UserVerifications.AsNoTracking().FirstOrDefaultAsync(x => x.ID == SellerVerification.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.SellerVerifications.Update(SellerVerification);
                Type type = typeof(SellerVerification);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(SellerVerification, null) == null)
                    {
                        if (property.Name != "User")
                        {
                            entry.Property(property.Name).IsModified = false;
                        }
                    }
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<int> DeleteSellerVerification(int ID)
        {
            if (db != null)
            {
                var result = await db.SellerVerifications.FindAsync(ID);
                if (result != null)
                {
                    db.SellerVerifications.Remove(result);
                    return await db.SaveChangesAsync();
                }
                else{
                    return 0;
                }

            }
            return 0;
        }

        public async Task<int> ApproveSellerVerification(SellerVerification SellerVerification)
        {
            if (db != null)
            {
                var user = await db.Users.FindAsync(SellerVerification.UserId);
                SellerVerification.SellerVerificationStatus = SellerVerificationStatus.SUCCESS;
                user.SellerVerified = true;
                if (SellerVerification.ABN != null)
                {
                    user.Abn = SellerVerification.ABN;
                }
                if (SellerVerification.ShopName != null)
                {
                    user.ShopName = SellerVerification.ShopName;
                }
                if (SellerVerification.AvatarImage != null)
                {
                    user.shopAvatarImage = SellerVerification.AvatarImage;
                }
                if (SellerVerification.CompanyName != null)
                {
                    user.CompanyName = SellerVerification.CompanyName;
                }
                if(SellerVerification.CompanyLink!=null){
                    user.CompanyLink = SellerVerification.CompanyLink;
                }
                if(SellerVerification.RptRate.HasValue){
                    user.RptRate =  (double)SellerVerification.RptRate;
                }
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<List<SellerVerification>> GetSellerVerifications()
        {
            if (db != null)
            {
                var result = await db.SellerVerifications.ToListAsync();
                return result;
            }
            return null;
        }

        public async Task<SellerVerification> GetSellerVerificationById(int ID)
        {
            if (db != null)
            {
                var result = await db.SellerVerifications.FirstOrDefaultAsync(x=>x.ID == ID);
                return result;
            }
            return null;
        }

        public async Task<List<SellerVerification>> GetSellerVerificationsByUserId(string UserId)
        {
            if (db != null)
            {
                var result = await db.SellerVerifications.Where(x=>x.UserId == UserId).ToListAsync();
                return result;
            }
            return null;
        }

        public async Task<SellerVerification> AddSellerVerification(SellerVerification SellerVerification)
        {
            if (db != null)
            {
                if(SellerVerification.ABN!= null){
                    var record = await db.SellerVerifications.FirstOrDefaultAsync(x=>x.ABN == SellerVerification.ABN);
                    if(record != null){
                        return null;
                    }
                }
                
                db.SellerVerifications.Add(SellerVerification);
                var result = await db.SaveChangesAsync();
                if (result == 0)
                {
                    return null;
                }
                return SellerVerification;
            }
            return null;
        }
    }
}
