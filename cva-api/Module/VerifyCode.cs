using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;

namespace cva_api.Module
{
    public class VerifyCode
    {
        private readonly IMemoryCache _cache;
        public VerifyCode(IMemoryCache cache)
        {
            _cache = cache;
        }

        public bool isValid(string userId, string VerifyCode)
        {
            string cache = _cache.Get<string>($"EmailVerify_{userId}");

            if (string.IsNullOrEmpty(cache))
            {
                cache = _cache.Get<string>($"MobileVerify_{userId}");
                if (string.IsNullOrEmpty(cache))
                {
                    return false;
                }
            }

            JObject json_object = JObject.Parse(cache);
            string code = (string)json_object["VerifyCode"];

            if (code != VerifyCode)
            {
                return false;
            }

            return true;
        }

    }
}
