using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace cva_api.Model
{
   
    public class User : IdentityUser
    {
        
        public string PayPasswordHash { get; set; }
        public Wallet Wallet { get; set; }
        public string ReferCode { get; set; }
        public string ReferrerId { get; set; }
        [JsonIgnore]
        public User Referrer { get; set; }
        [JsonIgnore]
        public List<User> Referees { get; set; }
        public List<AreaRecord> AreaRecords { get; set; }
        public List<Order> Orders { get; set; }

        public List<RptProductOrder> RptProductOrders { get; set; }
        public List<RptProductOrder> SellRptProductOrders { get; set; }
        public List<ProductOrder> ProductOrders { get; set; }
        public List<ProductOrder> SellProductOrders { get; set; }
        [JsonIgnore]
        public List<Product> Products { get; set; }
        [JsonIgnore]
        public List<RptProduct> RptProducts { get; set; }
        public List<Transaction> Transactions { get; set; }
        [Column(TypeName = "text")]
        public UserVerificationData Passport {get;set;}
        [Column(TypeName = "text")]
        public UserVerificationData IdCard {get;set;}
        public string Address {get;set;}
        public string CountryCode {get;set;}
        public string BankDetailCN {get;set;}
        public string OverSeaBankDetail {get;set;}
        public string AliPay {get;set;}       
        public string Wechat {get;set;} 
        public string Abn {get;set;} 
        public string CompanyName {get;set;} 
        public string BlockChainWalletAddress {get;set;}

        [JsonIgnore]
        public List<UserVerification> UserVerifications {get;set;}

        [JsonIgnore]
        public List<SellerVerification> SellerVerifications {get;set;}
        public bool IsNewMember { get; set; } = false;
        public bool SellerVerified { get; set; } = false;
        public double RptRate { get; set; }
        public string CompanyLink { get; set; }

        public string CompanyDescription { get; set; }
        public string ShopName { get; set; }
        public string shopAvatarImage { get; set; }
        public DateTime CreatedDate { get; set; }   
        public int UserIndex {get; set;} 
    }
}