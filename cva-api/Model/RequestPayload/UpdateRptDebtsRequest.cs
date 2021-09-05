using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class UpdateRptDebtsRequest
    {
        [Required(ErrorMessage = "UserId is required")]
        public string UserId { get; set; }

        [Required(ErrorMessage = "Amount is required")]
        public double Amount { get; set; }
    }
}
