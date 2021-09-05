using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class AddRptProductRequest
    {
        [Required(ErrorMessage = "Price is required")]
        public double Price { get; set; }
        [Required(ErrorMessage = "Cost is required")]
        public double Cost { get; set; }
        [Required(ErrorMessage = "CostCurrency is required")]
        public string CostCurrency {get;set;}
        [Required(ErrorMessage = "Currency is required")]
        public string Currency {get;set;}
        
        [Required(ErrorMessage = "Name is required")]
        public string Name {get;set;}
        public string Address { get; set; }

        [Required(ErrorMessage = "Quantity is required")]
        public int Quantity { get; set; }

        public string ProductDescription{get;set;}

        [Required(ErrorMessage = "CategoryId is required")]
        public int CategoryId {get;set;}
             
        public List<IFormFile>? ProductImages {get; set;}
    }
}
