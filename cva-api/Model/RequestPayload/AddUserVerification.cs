using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace cva_api.Model.RequestPayload
{
    public class AddUserVerification
    {
        public string Passport {get;set;}
        public string IdCard {get;set;}    
        public string UserMessage {get;set;}    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }    
        public List<IFormFile>? IdCardAttachedFiles {get; set;}
        public List<IFormFile>? PassportAttachedFiles {get; set;}
        public string VerifyCode { get; set; }
    }
}
