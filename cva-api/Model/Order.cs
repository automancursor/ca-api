using System;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class Order
    {
        public int ID { get; set; }
        public string UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public double Cva { get; set; }
        public double Cvt { get; set; }
        public double CvtCredit { get; set; }
        public double Abg { get; set; }
        public string Msg { get; set; }
        public AreaRecord AreaRecord {get; set;}
        public DateTime CreatedDate { get; set; }

    }
}
