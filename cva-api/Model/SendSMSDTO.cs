using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class SendSMSDTO
    {
        [Required(ErrorMessage = "Mobile is required")]
        public string Mobile { get; set; }
    }
}
