using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class UpdateRptProductRequest
    {
        [Required(ErrorMessage = "ID is required")]
        public int ID { get; set; }
        public double? Price { get; set; } 
        public double? Cost { get; set; } 
        public string Currency {get;set;}
        public string CostCurrency {get;set;}  
        public string Name {get;set;}
        public string Address { get; set; }
        public int Quantity { get; set; }
        public string ProductDescription{get;set;}
        public int CategoryId {get;set;}  
        public ProductStatusType ProductStatus {get;set;}   
        public List<IFormFile>? ProductImages {get; set;}
    }
}
