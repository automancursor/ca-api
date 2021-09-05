using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class HistoryRecord{
        public string Type{ get; set;}
        public int BlockNum{ get; set;}
    }
    public class AreaRecord
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Type
        {
            get; set;
        }
        public int Live { get; set; }

        public int RoundNum { get; set; }

        public int BlockNum { get; set; }

        [Column(TypeName = "text")]
        public List<HistoryRecord> HistoryRecords { get; set; }
        public int AreaClaimId { get; set; }

        [Column(TypeName = "longtext")]
        public List<List<LightDto>> Lights { get; set; }

        public int OrderId { get; set; }
        public int RecordIndex { get; set; }

        [JsonIgnore]
        public Order Order { get; set; }

        public string UserId { get; set; }
        
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public AreaClaim AreaClaim { get; set; }
    }
}
