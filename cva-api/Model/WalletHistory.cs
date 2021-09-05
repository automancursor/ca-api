using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public enum WalletHistoryType { SYSTEM, REWARD, USER_TRANSEFER, SURCHARGE }
    public class WalletHistory{
        public int ID { get; set; }
        public string UpdateType {get; set;}

        public string WalletId {get; set;}

        [JsonIgnore]
        public Wallet Wallet {get; set;}
        [Column(TypeName = "decimal(20, 3)")]
        public double BeforeValue {get; set;}
        [Column(TypeName = "decimal(20, 3)")]
        public double AfterValue {get; set;}

        public string Msg { get; set; }
        public WalletHistoryType WalletHistoryType {get;set;} = WalletHistoryType.SYSTEM;
        public DateTime? CreatedDate { get; set; }

    }
}