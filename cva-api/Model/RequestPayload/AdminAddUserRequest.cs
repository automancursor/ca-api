using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class AdminAddUserRequest
    {
        [Required(ErrorMessage = "ReferrerName is required")]
        public string ReferrerName { get; set; }

        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }

        [Required(ErrorMessage = "PayPassword is required")]
        public string PayPassword { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public string? Mobile { get; set; }
        public string? Email { get; set; }
        public double? Cva { get; set; }
    }
}
