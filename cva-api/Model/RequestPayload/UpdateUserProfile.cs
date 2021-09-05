using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace cva_api.Model.RequestPayload
{

    public class UpdateUserProfile
    {
        public string? userId { get; set; }

        public string Email { get; set; }
        public string UserName { get; set; }
        public string PhoneNumber { get; set; }
        public string CountryCode { get; set; }
        public string BankDetailCN { get; set; }
        public string OverSeaBankDetail { get; set; }
        public string AliPay { get; set; }
        public string Wechat { get; set; }
        public string BlockChainWalletAddress { get; set; }
        public string Address { get; set; }
        public string Abn { get; set; }
        public string CompanyName { get; set; }
        public string CompanyLink { get; set; }
        public string ShopName { get; set; }

        public string CompanyDescription { get; set; }
        public bool SellerVerified { get; set; }
    }
}
