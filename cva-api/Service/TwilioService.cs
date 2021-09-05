using System;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;


namespace cva_api.Service
{
    public class TwilioService : ITwilioService
    {
        public TwilioService()
        {
        }

        public async Task<MessageResource> SendMessage(string message, string mobile)
        {

            var task = await MessageResource.CreateAsync(
             body: message,
             from: new Twilio.Types.PhoneNumber("+15075700888"),
             to: new Twilio.Types.PhoneNumber(mobile)
            );

            return task;   
        }
    }
}
