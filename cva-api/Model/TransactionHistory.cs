using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class TransactionHistory{
        public int ID { get; set; }
        public TransactionCoinType TransactionCoinType {get; set;}

        public double FromValue {get; set;}
        public double ToValue {get; set;}

        public int TransactionID { get; set; }
        public DateTime? CreatedDate { get; set; }

    }
}