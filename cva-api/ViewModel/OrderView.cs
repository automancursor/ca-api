using System;
using cva_api.Model;
namespace cva_api.ViewModel
{
    public class OrderView
    {
        public int ID { get; set; }
        public string UserId { get; set; }
        public string Username {get; set;}
        public int UserIndex {get; set;}
        public double Cva { get; set; }
        public double Cvt { get; set; }
        public double CvtCredit { get; set; }
        public double Abg { get; set; }
        public string Msg { get; set; }
        public AreaRecord AreaRecord {get; set;}
        public DateTime CreatedDate { get; set; }
    }
}
