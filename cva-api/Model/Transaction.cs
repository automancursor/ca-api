using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{

    public enum TransactionType { RECHARGE, WITHDRAW, TRANSEFER ,CLAIM, RPTCONVERSION}
    public enum TransactionCoinType { Cva, Abg, Cvt, CvtCredit,Rpt }
    public enum TransactionStatus { IN_PROGRESS, SUCCESS, REJECTED }
    public class Transaction
    {
        [Required(ErrorMessage = "ID is required")]
        public int ID { get; set; }
        public string UserId { get; set; }
        public string? ToId { get; set; }
        [Column(TypeName = "decimal(20, 3)")]
        public double? Amount { get; set; }
        public string? TransactionMethod { get; set; }
        
        public TransactionType TransactionType {get; set;}

        public TransactionCoinType TransactionCoinType {get; set;}

        public TransactionStatus TransactionStatus {get; set;}

        public string AttachedFilesLink {get; set;}
        public string PaymentLink {get; set;}
        
        [JsonIgnore]
        public User User { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}

