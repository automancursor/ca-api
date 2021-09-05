using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class EmailVerifyRequest
    {
        [Required(ErrorMessage = "VerifyCode is required")]
        public string VerifyCode { get; set; }
    }
}
