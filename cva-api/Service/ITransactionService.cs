using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.ViewModel;

namespace cva_api.Service
{
    public interface ITransactionService
    {
        Task<List<TransactionView>> GetTransactions(TransactionType TransactionType);
        Task<List<Transaction>> GetTransactionsByUserId(string UserId);
        Task<Transaction> GetTransactionById(int ID);
        Task<Transaction> AddTransaction(Transaction Transaction);
        Task<Response<dynamic>> PrcoessTransaction(Transaction Transaction,double surcharge);
        Task<Response<dynamic>> PrcoessRptConversion(Transaction Transaction);
        Task<int> DeleteTransactionById(int ID);
        Task<int> AddSurchargeToAdmin(double value,string coinType,int transactionId);
        Task<int> UpdateTransaction(Transaction Transaction);
    }
}
