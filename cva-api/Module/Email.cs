using System;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Text;
using Newtonsoft.Json;

namespace cva_api.Module
{
    public class EmailPayload{
        public string toAddress{get;set;}
        public string context{get;set;}
        public string subject{get;set;}
    }
    public class Email
    {
        // SmtpClient smtpClient = new SmtpClient("smtp.gmail.com")
        // {
        //     Port = 587,
        //     Credentials = new NetworkCredential("cvadreams", "Hell0Camps1#"),
        //     EnableSsl = true,
        //     UseDefaultCredentials = false
        // };

        private readonly IHttpClientFactory _clientFactory;
        public Email(IHttpClientFactory clientFactory){
            _clientFactory = clientFactory;
        }

        public void sendMail(string toAddress, string context,string subject)
        {
            // var mailMessage = new MailMessage
            // {
            //     From = new MailAddress("cvadreams@gmail.com"),
            //     Subject = subject,
            //     Body = context,
            //     IsBodyHtml = true,
            // };
            // mailMessage.To.Add(toAddress);
            // smtpClient.Send(mailMessage);
            var data = new EmailPayload(){
                toAddress = toAddress,
                context = context,
                subject= subject,
            };
            var content = new System.Net.Http.StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
            var request = new HttpRequestMessage(HttpMethod.Post,
                            "http://email-service:5000/users/email");
            request.Content = content;
            var client = _clientFactory.CreateClient();
            client.Send(request);                
        }

       
    }
}
