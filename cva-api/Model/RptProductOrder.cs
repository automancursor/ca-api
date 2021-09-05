using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public enum RptProductOrderStatusType { SUCCESS,PENDING,CANCELED }

    public class RptOrderProduct{
        public int ProductId {get;set;}
        public int Quantity {get;set;}
        public double? Price {get;set;}
        public string? Currency {get;set;}
        public double? Cost {get;set;}
        public string? CostCurrency {get;set;}
        public string? ProductImages{get;set;}
        public string? Name{get;set;}
    }
    public class RptProductOrder
    {
        public int ID { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public string? SellerId { get; set; }
        public string? SellerName { get; set; }

        [JsonIgnore]
        public User Seller { get; set; }
        public double Price { get; set; }
        public string Currency { get; set; }
        public string PaymentMethod { get; set; }
        public string PaymentToken { get; set; }

        [Column(TypeName = "text")]
        public List<RptOrderProduct>? RptOrderProducts {get; set;}
        public string? OrderDetail {get; set;}
        public string? Address {get; set;}
        public DateTime? CreatedDate { get; set; }
        public RptProductOrderStatusType RptProductOrderStatus{get;set;}

    }
}
