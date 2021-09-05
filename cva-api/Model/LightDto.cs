using System.Collections.Generic;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace cva_api.Model
{
    public class LightDto
    {
        public int SourceAreaId { get; set; }
        public string Type { get; set;}
    }


    public enum LightType {
            
           RED,
           GREEN
    }
        
}
