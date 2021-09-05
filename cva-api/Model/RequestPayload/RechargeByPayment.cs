
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class RechargeByPayment
    {
        [Required(ErrorMessage = "PaymentCredentials is required")]
        public string PaymentCredentials {get;set;}
        [Required(ErrorMessage = "TransactionId is required")]
        public int TransactionId {get;set;}

    }
}
