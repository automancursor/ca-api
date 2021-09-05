using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class ResetPayPassword
    {
        [Required(ErrorMessage = "VerifyCode is required")]
        public string VerifyCode { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "NewPassword is required")]
        public string NewPassword { get; set; }
    }
}
