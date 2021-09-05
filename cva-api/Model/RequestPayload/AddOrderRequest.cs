using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class AddOrderRequest
    {
        [Required(ErrorMessage = "AreaClaimId is required")]
        public int AreaClaimId { get; set; }

        [Required(ErrorMessage = "PayPassword is required")]
        public string PayPassword { get; set; }

        public string PaymentType { get; set; }
    }
}
