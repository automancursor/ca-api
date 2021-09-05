using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class ResetPasswordRequest
    {
        [Required(ErrorMessage = "ResetToken is required")]
        public string ResetToken { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "NewPassword is required")]
        public string NewPassword { get; set; }
    }
}
