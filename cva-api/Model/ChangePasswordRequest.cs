using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "OldPassword is required")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "NewPassword is required")]
        public string NewPassword { get; set; }
    }
}
