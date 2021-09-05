using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class AddSellerVerification
    {
        public string Abn {get;set;}
        public string CompanyAddress {get;set;}    
        public string CompanyName {get;set;}    
        public string Mobile { get; set; } 
        public string Country { get; set; } 
        public string Email { get; set; } 
        public string CompanyLink { get; set; }
        public double RptRate { get; set; }    
        public List<IFormFile>? RegistrationAttachedFiles {get; set;}
        public List<IFormFile>? AvatarImage {get; set;}
        public string VerifyCode { get; set; }
    }
}
