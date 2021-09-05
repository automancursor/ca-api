using System;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public enum ResetMethod { PhoneNumber, Email  }
    public class GenerateResetTokenPayload
    {
       
        [Required(ErrorMessage = "UserName is required")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "ResetMethod is required")]
        public ResetMethod ResetMethod { get;set;  }
    }
}
