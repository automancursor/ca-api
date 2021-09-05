using System;
using cva_api.Model;
namespace cva_api.ViewModel
{
    public class UserProfile
    {
        public string Id { get; set; }
        public Wallet Wallet { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string ReferCode { get; set; }

        public UserProfile Referrer {get; set;}
        public string PhoneNumber { get; set; }
        public bool EmailConfirmed { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public UserVerificationData Passport {get;set;}
        public UserVerificationData IdCard {get;set;}
        public string CountryCode {get;set;}
        public string BankDetailCN {get;set;}
        public string OverSeaBankDetail {get;set;}
        public string AliPay {get;set;}       
        public string Wechat {get;set;} 
        public string BlockChainWalletAddress {get;set;}
        public string Address{get;set;}
        public string Abn{get;set;}
        public double RptRate{get;set;}
        public string CompanyName{get;set;}
        public string ShopName{get;set;}
        public string CompanyLink{get;set;}
        public string CompanyDescription{get;set;}

        public string shopAvatarImage{get;set;}
        public Boolean SellerVerified{get;set;}

        public DateTime CreatedDate {get; set;}

        public int UserIndex {get; set;}
    }
}
