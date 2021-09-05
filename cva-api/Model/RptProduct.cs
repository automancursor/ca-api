using System;
using Newtonsoft.Json;


namespace cva_api.Model
{
    public enum RptProductStatusType { ACTIVE,INACTIVE,OUT_OF_STOCK }
    public class RptProduct
    {
        public int ID { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public string? CompanyName {get;set;}
        public User User { get; set; }

        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public string? Currency {get;set;}
        public double Price { get; set; }
        public double Cost { get; set; }
        public string? CostCurrency {get; set;}
        public int Quantity { get; set; }
        public string? ProductDescription {get; set;}
        public string? Name {get; set;}
        public string? Address {get; set;}
        public string? ProductImages {get; set;}
        public DateTime? CreatedDate { get; set; }
        public ProductStatusType ProductStatus{get;set;}

    }
}
