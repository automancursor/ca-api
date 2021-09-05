using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace cva_api.Module
{
    public class JWTHelper
    {
        private readonly IConfiguration _configuration;
        public JWTHelper(IConfiguration configuration)
        {

            _configuration = configuration;
        }

        public ClaimsPrincipal GetPrincipal(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);
                
                if (jwtToken == null)
                    return null;


                var symmetricKey = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]);

                var validationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]))
                };

                
                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);


                return principal;
            }
            catch (Exception)
            {
                //should write log
                return null;
            }
        }

        public bool ValidateToken(string token, string username, string userId)
        {


            var simplePrinciple = GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);

            if (username != usernameClaim?.Value || userId != userIdClaim?.Value)
            {
                return false;
            }


            // More validate to check whether username exists in system

            return true;
        }

        public Claim GetUserData(string token, string claimType)
        {
            
            try
            {
               
                var tokenHandler = new JwtSecurityTokenHandler();
                var jwtToken = tokenHandler.ReadJwtToken(token);

                if (jwtToken == null)
                    return null;


                var symmetricKey = Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]);

                var validationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]))
                };


                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

                var identity = principal.Identity as ClaimsIdentity;
                
                var userIdClaim = identity.FindFirst(claimType);
                return userIdClaim;
            }
            catch (Exception)
            {
                //should write log
                return null;
            }
        }

    }
}
