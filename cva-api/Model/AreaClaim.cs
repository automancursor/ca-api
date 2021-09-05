using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class AreaClaim
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string AreaType { get; set; }
        public double Cva { get; set; }
        public double Cvt { get; set; }
        public double Abg { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; } = true;
        public int Round { get; set; }

        public int LastRewardedBlockNum { get; set; } = 0;
        public double AccumulatedBonus { get; set; }
        public double AccumulatedBonusCredit { get; set; }
        public double TargetBonus { get; set; }
        public List<AreaRecord> AreaRecords { get; set; }
    }
}
