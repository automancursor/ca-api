using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class sendEmailCodeRequest
    {
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }
    }
}
