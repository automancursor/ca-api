using System;
using System.Threading.Tasks;
using Twilio.Rest.Api.V2010.Account;

namespace cva_api.Service
{
    public interface ITwilioService
    {
        Task<MessageResource> SendMessage(string message, string mobile);
    }
}
