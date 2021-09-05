using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class AddCategoryRequest
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        public string Description { get; set; }
         
        public List<IFormFile>? CategoryImages {get; set;}
    }
}
