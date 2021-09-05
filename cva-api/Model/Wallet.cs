using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class Wallet
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        [Column(TypeName = "decimal(20, 3)")]
        public double Cva { get; set; } = 0;
        [Column(TypeName = "decimal(20, 3)")]
        public double Cvt { get; set; } = 0;
        [Column(TypeName = "decimal(30, 3)")]
        public double CvtCredit { get; set; } = 0;
        [Column(TypeName = "decimal(10, 3)")]
        public double Abg { get; set; } = 0;

        [Column(TypeName = "decimal(10, 3)")]
        public double Rpt { get; set; } = 0;

        [Column(TypeName = "decimal(10, 3)")]
        public double RptDebts { get; set; } = 0;
        public string UserId { get; set; }

        [JsonIgnore]
        public User User {get; set;}

        public List<WalletHistory> WalletHistories {get; set;}
    }
}
