using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace cva_api.Model.RequestPayload
{
    
    public class UpdateWallet
    {
        [Required(ErrorMessage = "userId is required")]
        public string userId { get; set; }
        
        public double? Cva { get; set; }
        public double? Cvt { get; set; }
        public double? CvtCredit { get; set; }
        public double? Abg { get; set; }

    }
}
