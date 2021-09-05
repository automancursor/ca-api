using System;
using System.Collections.Generic;
using Newtonsoft.Json;


namespace cva_api.Model
{
   
    public class Category
    {
        public int ID { get; set; }
        
        [JsonIgnore]
        public List<Product> Products { get; set; }

        [JsonIgnore]
        public List<RptProduct> RptProducts { get; set; }
        public string? Name{get;set;}
        public string? Description{get;set;}
        public string? CategoryImage {get; set;}

    }
}
