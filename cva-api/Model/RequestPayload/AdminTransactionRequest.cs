using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class AdminTransactionRequest
    {
        [Required(ErrorMessage = "Amount is required")]
        public double Amount { get; set; }

        [Required(ErrorMessage = "TransactionCoinType is required")]    
        public TransactionCoinType TransactionCoinType {get; set;}
        public string TransactionMethod { get; set; }
        
        [Required(ErrorMessage = "FromId is required")]
        public string FromId { get; set; }  
        [Required(ErrorMessage = "ToId is required")]  
        public string ToId { get; set; }
    }
}
