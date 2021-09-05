using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace cva_api.Model.RequestPayload
{
    public class AddProductOrderRequest
    {

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        [Required(ErrorMessage = "OrderDetail is required")]
        public string OrderDetail { get; set; }
        [Required(ErrorMessage = "OrderProducts is required")]
        public List<OrderProduct> OrderProducts { get; set; }

        [Required(ErrorMessage = "SellerId is required")]
        public string SellerId {get;set;}

        public string PaymentCredentials {get;set;}
    }
}
