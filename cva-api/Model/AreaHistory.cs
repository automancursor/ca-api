using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace cva_api.Model
{
    public class AreaHistory
    {

        public int ID {get; set;}
        public string Msg{get; set;}
        [Column(TypeName = "decimal(20, 3)")]
        public double BeforeValue{get; set;}
        [Column(TypeName = "decimal(20, 3)")]
        public double AfterValue{get; set;}
        [Column(TypeName = "decimal(20, 3)")]
        public double ChangedValue{get; set;}

        public string UpdateType{get; set;}

        public int SourceAreaRecordId {get; set;}

        public int ToAreaRecordId {get; set;}

        public int OrderId {get; set;}

        public DateTime CreatedDate { get; set; }

    }
}