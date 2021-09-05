using System;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace cva_api.Model
{
    public class UserVerificationData{
        public string links{get;set;}
        public string value{get;set;}
    }
    public enum UserVerificationStatus { IN_PROGRESS, SUCCESS, REJECTED }
    public class UserVerification
    {
        public int ID { get; set; }
        
        public string? UserId { get; set; }
        public string? UserName { get; set; }

        [JsonIgnore]
        public User User {get; set;}
        public UserVerificationStatus UserVerificationStatus { get;set;}
        public string UserMessage {get;set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
         public string Address { get; set; }
        public string AdminMessage {get;set;}
        
        [Column(TypeName = "text")]
        public UserVerificationData Passport {get;set;}

        public string PassportNumber {get;set;}
        [Column(TypeName = "text")]
        public UserVerificationData IdCard {get;set;}  
        public string IdCardNumber {get;set;}  
        public DateTime? CreatedDate { get; set; }

    }
}
