using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string Username { get; set; }

        
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "PayPassword is required")]
        public string PayPassword { get; set; }

        [Required(ErrorMessage = "ReferCode is required")]
        public string ReferCode { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Mobile { get; set; }

    }
}
