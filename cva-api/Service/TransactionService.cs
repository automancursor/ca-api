using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using cva_api.Data;
using cva_api.Model;
using cva_api.ViewModel;
using Microsoft.EntityFrameworkCore;

namespace cva_api.Service
{
    public class TransactionService : ITransactionService
    {
        SqlContext db;
        public TransactionService(SqlContext _db)
        {
            this.db = _db;
        }

        public async Task<int> AddSurchargeToAdmin(double value, string coinType, int transactionId)
        {
            if (db == null)
            {
                return 0;
            }
            var user = await this.db.Users
                    .Include(x => x.Wallet)
                    .Include(x => x.Wallet.WalletHistories)
                    .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
            Type type = typeof(Wallet);
            PropertyInfo property = type.GetProperty(coinType);
            var BeforeValue = property.GetValue(user.Wallet, null);
            if (BeforeValue == null)
            {
                return 0;
            }
            user.Wallet
                .WalletHistories
                .Add(
                        new WalletHistory
                        {
                            Wallet = user.Wallet,
                            BeforeValue = (double)BeforeValue,
                            AfterValue = (double)BeforeValue + value,
                            UpdateType = coinType,
                            Msg = $"系统收取Transaction,{coinType}手续费，Transaction订单:{transactionId}",
                            CreatedDate = DateTime.Now,
                            WalletHistoryType = WalletHistoryType.SURCHARGE,
                        }
                    );
            property.SetValue(user.Wallet, (double)BeforeValue + value);
            return await this.db.SaveChangesAsync();
        }

        public async Task<Transaction> AddTransaction(Transaction Transaction)
        {
            if (db != null)
            {
                await db.Transactions.AddAsync(Transaction);
                await db.SaveChangesAsync();
                return Transaction;
            }

            return null;
        }

        public async Task<int> DeleteTransactionById(int ID)
        {
            if (db != null)
            {
                var TransactionToRemove = await db.Transactions.FirstOrDefaultAsync(i => i.ID == ID);
                if (TransactionToRemove == null)
                {
                    return 0;
                }
                db.Transactions.Remove(TransactionToRemove);
                return await db.SaveChangesAsync();
            }
            return 0;
        }

        public async Task<Transaction> GetTransactionById(int ID)
        {
            if (db != null)
            {
                return await db.Transactions
                .Include(x => x.User)
                .Include(x => x.User.Wallet)
                .FirstOrDefaultAsync(x => x.ID == ID);
            }

            return null;
        }

        public async Task<List<TransactionView>> GetTransactions(TransactionType TransactionType)
        {
            if (db != null)
            {
                var list = await db.Transactions.Include(x => x.User).Where(x => x.TransactionType == TransactionType).ToListAsync();
                var result = new List<TransactionView>();
                foreach (var transaction in list)
                {
                    var TransactionView = new TransactionView()
                    {
                        ID = transaction.ID,
                        Amount = transaction.Amount,
                        ToId = transaction.ToId,
                        UserId = transaction.UserId,
                        TransactionType = transaction.TransactionType,
                        AttachedFilesLink = transaction.AttachedFilesLink,
                        TransactionCoinType = transaction.TransactionCoinType,
                        TransactionMethod = transaction.TransactionMethod,
                        TransactionStatus = transaction.TransactionStatus,
                        UserName = transaction.User.UserName,
                        PaymentLink = transaction.PaymentLink,
                        CreatedDate = transaction.CreatedDate
                    };
                    TransactionView.UserName = transaction.User.UserName;
                    result.Add(
                        TransactionView
                    );
                }
                return result;
            }

            return null;
        }

        public async Task<List<Transaction>> GetTransactionsByUserId(string UserId)
        {
            if (db != null)
            {
                return await db.Transactions.Where(i => i.UserId == UserId).ToListAsync();
            }

            return null;
        }
        public async Task<Response<dynamic>> UpdateBalance(string coinType, User user, Transaction Transaction, double changeValue)
        {
            Type type = typeof(Wallet);
            PropertyInfo property = type.GetProperty(coinType);
            var userWalletBeforeValue = property.GetValue(user.Wallet, null);
            var history = new WalletHistory
            {
                Wallet = user.Wallet,
                BeforeValue = (double)userWalletBeforeValue,
                AfterValue = (double)userWalletBeforeValue + changeValue,
                UpdateType = coinType,
                Msg = $"Transaction:{Transaction.TransactionType.ToString()},{coinType}，Transaction订单:{Transaction.ID}",
                CreatedDate = DateTime.Now
            };
            if (Transaction.TransactionType == TransactionType.TRANSEFER)
            {
                history.WalletHistoryType = WalletHistoryType.USER_TRANSEFER;
            }
            user.Wallet
                .WalletHistories
                .Add(history);
            if (userWalletBeforeValue == null)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "Invalid Coin", Data = 400 };
            }
            property.SetValue(user.Wallet, (double)userWalletBeforeValue + changeValue);
            var result = await this.db.SaveChangesAsync();
            if (result == 0)
            {
                return new Response<dynamic> { Status = "BAD REQUEST", Message = "UPDATE FAILD", Data = 400 };
            }
            return new Response<dynamic> { Status = "SUCCESS", Message = "SUCCESS", Data = Transaction };

        }

        public async Task<Response<dynamic>> PrcoessTransaction(Transaction Transaction, double surcharge)
        {
            if (db == null)
            {
                return new Response<dynamic> { Status = "ERROR", Message = "DB ERROR", Data = 500 };
            }
            if (Transaction.TransactionStatus == TransactionStatus.SUCCESS)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "Already Succeed", Data = 400 };
            }
            var user = await this.db.Users
                            .Include(x => x.Wallet.WalletHistories)
                            .FirstOrDefaultAsync(x => x.Id == Transaction.UserId);
            var toUser = await this.db.Users
                            .Include(x => x.Wallet.WalletHistories)
                            .FirstOrDefaultAsync(x => x.Id == Transaction.ToId);
            if (Transaction.TransactionType == TransactionType.CLAIM || Transaction.TransactionType == TransactionType.RECHARGE)
            {
                toUser = user;
                user = await this.db.Users
                            .Include(x => x.Wallet.WalletHistories)
                            .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
            }
            if (Transaction.TransactionType == TransactionType.WITHDRAW)
            {
                toUser = await this.db.Users
                            .Include(x => x.Wallet.WalletHistories)
                            .FirstOrDefaultAsync(x => x.Id == UserConsts.AdminUserId);
            }
            if (user == null || toUser == null)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "User not found", Data = 400 };
            }
            if (user.Id == toUser.Id)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "Same User!", Data = 400 };
            }
            var coinType = Transaction.TransactionCoinType.ToString();
            Type type = typeof(Wallet);
            PropertyInfo property = type.GetProperty(coinType);
            var userWalletBeforeValue = property.GetValue(user.Wallet, null);
            var toUserWalletBeforeValue = property.GetValue(toUser.Wallet, null);
            var changeValue = 0.000;
            if (TransactionType.WITHDRAW == Transaction.TransactionType)
            {
                changeValue = (double)Transaction.Amount;
            }
            else
            {
                changeValue = (double)Transaction.Amount * (1 - surcharge);
            }
            if (userWalletBeforeValue == null || toUserWalletBeforeValue == null)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "Invalid Coin", Data = 400 };
            }
            if ((double)userWalletBeforeValue < Transaction.Amount)
            {
                return new Response<dynamic> { Status = "BadRequest", Message = "Insufficient Balance", Data = 400 };
            }
            if (Transaction.TransactionType == TransactionType.CLAIM)
            {
                if (toUser.Wallet.Cvt < (Transaction.Amount * (double)333.33))
                {
                    return new Response<dynamic> { Status = "BadRequest", Message = "Insufficient CVT", Data = 400 };
                }
                var cvtChangeValue = (double)Transaction.Amount * (double)333.33;
                toUser.Wallet
                  .WalletHistories
                  .Add(
                        new WalletHistory
                        {
                            Wallet = toUser.Wallet,
                            BeforeValue = toUser.Wallet.Cvt,
                            AfterValue = toUser.Wallet.Cvt - cvtChangeValue,
                            UpdateType = "Cvt",
                            Msg = $"Transaction:{Transaction.TransactionType.ToString()},Cvt，Transaction订单:{Transaction.ID}",
                            CreatedDate = DateTime.Now
                        }
                   );
                toUser.Wallet.Cvt -= cvtChangeValue;
            }
            if (Transaction.TransactionType != TransactionType.CLAIM && Transaction.TransactionType != TransactionType.RECHARGE)
            {
                var userUpdate = await this.UpdateBalance(coinType, user, Transaction, -changeValue);
            }
            if (Transaction.TransactionType != TransactionType.WITHDRAW)
            {
                var toUserUpdate = await this.UpdateBalance(coinType, toUser, Transaction, changeValue);
            }


            var surchargeResult = await this.AddSurchargeToAdmin(surcharge * (double)Transaction.Amount, coinType, Transaction.ID);
            Transaction.TransactionStatus = TransactionStatus.SUCCESS;
            this.db.Transactions.Update(Transaction);
            var result = await this.db.SaveChangesAsync();
            if (surchargeResult == 0 || result == 0)
            {
                return new Response<dynamic> { Status = "BAD REQUEST", Message = "UPDATE FAILD", Data = 400 };
            }
            return new Response<dynamic> { Status = "SUCCESS", Message = "SUCCESS", Data = Transaction };
        }

        public async Task<int> UpdateTransaction(Transaction transaction)
        {
            if (db != null)
            {
                var result = await db.Transactions.AsNoTracking().FirstOrDefaultAsync(x => x.ID == transaction.ID);
                if (result == null)
                {
                    return 0;
                }
                var entry = db.Transactions.Update(transaction);
                Type type = typeof(Transaction);
                PropertyInfo[] properties = type.GetProperties();
                foreach (PropertyInfo property in properties)
                {
                    if (property.GetValue(transaction, null) == null)
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

        public async Task<Response<dynamic>> PrcoessRptConversion(Transaction Transaction)
        {
            if (db == null)
            {
                return new Response<dynamic> { Status = "ERROR", Message = "DB ERROR", Data = 500 };
            }
            var a = await db.Configs.FirstOrDefaultAsync(x => x.Name == "RPT2CVA");
            var b = await db.Configs.FirstOrDefaultAsync(x => x.Name == "RPT2CVT");
            if (a == null || b == null)
            {
                return new Response<dynamic> { Status = "ERROR", Message = "Invalid RPT config", Data = 400 };
            }
            var resulta = (string)a.Value;
            var resultb = (string)b.Value;
            var RPT2CVA = double.Parse(resulta);
            var RPT2CVT = double.Parse(resultb);
            var user = await this.db.Users
                            .Include(x => x.Wallet.WalletHistories)
                            .FirstOrDefaultAsync(x => x.Id == Transaction.UserId);
            if ((user.Wallet.Rpt - user.Wallet.RptDebts) < Transaction.Amount)
            {
                return new Response<dynamic> { Status = "ERROR", Message = "Insufficient Available Rpt (Rpt - RptDebts)", Data = 400 };
            }
            var userUpdate = await this.UpdateBalance("Rpt", user, Transaction, -(double)Transaction.Amount);

            if (Transaction.TransactionCoinType == TransactionCoinType.Cva)
            {

                await this.UpdateBalance("Cva", user, Transaction, (double)Transaction.Amount * RPT2CVA);
            }
            else if (Transaction.TransactionCoinType == TransactionCoinType.Cvt)
            {
                await this.UpdateBalance("Cvt", user, Transaction, (double)Transaction.Amount * RPT2CVT);
            }
            else
            {
                return new Response<dynamic> { Status = "ERROR", Message = "Invalid Coin Type", Data = 400 };
            }
            Transaction.TransactionStatus = TransactionStatus.SUCCESS;
            this.db.Transactions.Update(Transaction);
            var result = await this.db.SaveChangesAsync();
            if (result == 0)
            {
                return new Response<dynamic> { Status = "BAD REQUEST", Message = "UPDATE FAILD", Data = 400 };
            }
            return new Response<dynamic> { Status = "SUCCESS", Message = "SUCCESS", Data = Transaction };
        }
    }
}
