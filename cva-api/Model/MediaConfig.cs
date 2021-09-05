using System.ComponentModel.DataAnnotations;

namespace cva_api.Model
{
    public class MediaConfig{
        [Key]
        [Required(ErrorMessage = "Name is required")]
        public string Name {get; set;}
        public string Value {get; set;}
        public string Description {get; set;}
    }
}