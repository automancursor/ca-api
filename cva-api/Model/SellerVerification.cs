using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class SellerVerificationData{
        public string links{get;set;}
        public string value{get;set;}
    }
    public enum SellerVerificationStatus { IN_PROGRESS, SUCCESS, REJECTED }
    public class SellerVerification
    {
        public int ID { get; set; }
        
        public string? UserId { get; set; }
        public string? UserName { get; set; }

        [JsonIgnore]
        public User User {get; set;}
        public string CompanyAddress {get;set;}
        public string CompanyLink {get;set;}
        public string AvatarImage {get;set;}
        public string ShopName {get;set;}
        public string CompanyName { get; set; }
        public string ABN { get; set; }
        public string Country { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public double? RptRate { get; set; }

        [Column(TypeName = "text")]
        public SellerVerificationData Registration { get; set; }
        public SellerVerificationStatus SellerVerificationStatus {get;set;}
        public DateTime? CreatedDate { get; set; }

    }
}
