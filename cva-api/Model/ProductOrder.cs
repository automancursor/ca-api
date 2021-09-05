using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public enum ProductOrderStatusType { SUCCESS,PENDING,CANCELED }

    public class OrderProduct{
        public int ProductId {get;set;}
        public int Quantity {get;set;}
        public double? CvtPrice {get;set;}
        public string? ProductImages{get;set;} 
        public string? Name{get;set;} 
    }
    public class ProductOrder
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
        public double Cvt { get; set; }

        [Column(TypeName = "text")]
        public List<OrderProduct>? OrderProducts {get; set;}
        public string? OrderDetail {get; set;}
        public string? Address {get; set;}
        public DateTime? CreatedDate { get; set; }
        public ProductOrderStatusType ProductOrderStatus{get;set;}

    }
}
