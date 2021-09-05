using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace cva_api.Model.RequestPayload
{
    
    public class UpdateAreaRecord
    {
        [Required(ErrorMessage = "ID is required")]
        public int ID { get; set; }
        [Required(ErrorMessage = "Live is required")]
        public int Live { get; set; }

    }
}
