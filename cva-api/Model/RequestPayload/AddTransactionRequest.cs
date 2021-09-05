using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class AddTransactionRequest
    {
        [Required(ErrorMessage = "Amount is required")]
        public double Amount { get; set; }

        [Required(ErrorMessage = "TransactionType is required")]
        public TransactionType TransactionType { get; set; }

        [Required(ErrorMessage = "TransactionCoinType is required")]    
        public TransactionCoinType TransactionCoinType {get; set;}

        public string PayPassword { get; set; }

        public string TransactionMethod { get; set; }
        
        public string VerifyCode { get; set; }
        public string ToUserName { get; set; }
        public List<IFormFile>? AttachedFiles {get; set;}
    }
}
