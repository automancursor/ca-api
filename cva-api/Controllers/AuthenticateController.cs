using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using cva_api.Model;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using cva_api.Service;
using Newtonsoft.Json;
using cva_api.Model.RequestPayload;
using Microsoft.AspNetCore.Authorization;
using cva_api.Module;
using Microsoft.Extensions.Caching.Memory;
using System.Net.Http;

namespace cva_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        IUserService userService;
        ITwilioService twilioService;
        private readonly IMemoryCache _cache;
        VerifyCode verifyCode;
        private readonly IHttpClientFactory _clientFactory;

        public AuthenticateController(IHttpClientFactory clientFactory,UserManager<User> userManager,  IMemoryCache cache, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IUserService userService, ITwilioService twilioService)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _cache = cache;
            _configuration = configuration;
            this.userService = userService;
            this.twilioService = twilioService;
            this.verifyCode = new VerifyCode(cache);
            _clientFactory = clientFactory;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);

            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.UserData, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(15),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    userId = user.Id
                });
            }
            return Unauthorized();
        }

        [HttpPost, Route("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest changePasswordRequest)
        {
            var user = await userManager.FindByNameAsync(changePasswordRequest.UserName);
            if (user != null)
            {
                var result = await userManager.ChangePasswordAsync(user, changePasswordRequest.OldPassword, changePasswordRequest.NewPassword);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
                }

                return Ok(new Response<string> { Status = "Success", Message = "Password changed successfully!" });

            }
            return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Error", Message = "User Not Found" });

        }
        [HttpPost, Route("resetPayPassword")]
        public async Task<IActionResult> ResetPayPassword([FromBody] ResetPayPassword resetPayPassword)
        {
            var user = await userManager.FindByNameAsync(resetPayPassword.UserName);
            if (user != null)
            {
                if (this.verifyCode.isValid(user.Id, resetPayPassword.VerifyCode) == false)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Invalid Verify Code" });
                }
                user.PayPasswordHash = resetPayPassword.NewPassword;
                var result = await this.userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
                }

                return Ok(new Response<string> { Status = "Success", Message = "Password changed successfully!" });

            }
            return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Error", Message = "User Not Found" });

        }

        [HttpPost, Route("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetPasswordRequest)
        {
            var user = await userManager.FindByNameAsync(resetPasswordRequest.UserName);
            if (user != null)
            {
                var result = await userManager.ResetPasswordAsync(user, resetPasswordRequest.ResetToken, resetPasswordRequest.NewPassword);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
                }

                return Ok(new Response<string> { Status = "Success", Message = "Password changed successfully!" });

            }
            return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Error", Message = "User Not Found" });

        }
        [HttpPost, Route("resetPasswordToken")]
        public async Task<IActionResult> ResetPasswordToken([FromBody] GenerateResetTokenPayload generateResetTokenPayload)
        {
            var user = await userManager.FindByNameAsync(generateResetTokenPayload.UserName);
            if (user != null)
            {
                var token = await userManager.GeneratePasswordResetTokenAsync(user);
                if (token == null)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = "Error" });
                }

                var link = $"https://h5.cvac.net.au/changePassword?token={token}";
                if (generateResetTokenPayload.ResetMethod == ResetMethod.Email)
                {
                    // if (user.EmailConfirmed == false)
                    // {
                    //     return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = "用户邮箱未验证" });
                    // }
                    var Email = new Email(_clientFactory);
                    Email.sendMail(user.Email, $"<div><h4>请使用以下链接进行重置密码</h4><a href=\"{link}\" >{link}</a></div>", $"重置密码");

                }
                else
                {
                    // if (user.PhoneNumberConfirmed == false)
                    // {
                    //     return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = "用户手机未验证" });

                    // }
                    await twilioService.SendMessage("请使用以下链接进行重置密码:" + link, user.PhoneNumber);

                }
                return Ok(new Response<string> { Status = "Success", Message = "Success", Data = token });
            }
            return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Error", Message = "User Not Found" });

        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        [Route("admin_login_user/{id}")]
        public async Task<IActionResult> AdminLogin(string id)
        {
            var user = await userManager.FindByIdAsync(id);
            if (user != null)
            {
                var userRoles = await userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.UserData, user.Id),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddDays(15),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo,
                    userId = user.Id
                });

            }
            return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Error", Message = "User Not Found" });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        [Route("admin_add_user")]
        public async Task<IActionResult> Register([FromBody] AdminAddUserRequest model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = "User already exists!" });
            var referrer = await userManager.FindByNameAsync(model.ReferrerName);
            if (referrer == null)
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = "Referrer not exists!" });

            Random r = new Random();
            var x = r.Next(0, 100000000);
            string referCode = x.ToString("00000000");

            User user = new User()
            {
                Email = model.Email,
                PhoneNumber = model.Mobile,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                ReferrerId = referrer.Id,
                ReferCode = referCode,
                PayPasswordHash = model.PayPassword,
                IsNewMember = true,
                CreatedDate = DateTime.Now
            };


            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
            }
            await userService.UpdateUserIndex(user);
            if (!await roleManager.RoleExistsAsync(UserRole.User))
                await roleManager.CreateAsync(new IdentityRole(UserRole.User));
            if (await roleManager.RoleExistsAsync(UserRole.User))
            {
                await userManager.AddToRoleAsync(user, UserRole.User);
            }
            var wallet = await userService.AddWalletByUserId(user.Id);
            if (model.Cva != null)
            {
                wallet.Cva = (double)model.Cva;
                await userService.UpdateWallet(wallet);
            }

            return Ok(new Response<User> { Status = "Success", Message = "User created successfully!", Data = user });
        }


        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = "User already exists!" });

            var referrer = await userService.GetReferrerByCode(model.ReferCode);

            Random r = new Random();
            var x = r.Next(0, 100000000);
            string referCode = x.ToString("00000000");

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                ReferrerId = referrer?.Id,
                ReferCode = referCode,
                PayPasswordHash = model.PayPassword,
                IsNewMember = true,
                CreatedDate = DateTime.Now
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
            }
            await userService.UpdateUserIndex(user);
            if (!await roleManager.RoleExistsAsync(UserRole.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRole.Admin));
            if (!await roleManager.RoleExistsAsync(UserRole.User))
                await roleManager.CreateAsync(new IdentityRole(UserRole.User));
            if (!await roleManager.RoleExistsAsync(UserRole.Subscribed))
                await roleManager.CreateAsync(new IdentityRole(UserRole.Subscribed));

            if (await roleManager.RoleExistsAsync(UserRole.User))
            {
                await userManager.AddToRoleAsync(user, UserRole.User);
            }

            await userService.AddWalletByUserId(user.Id);

            return Ok(new Response<User> { Status = "Success", Message = "User created successfully!", Data = user });
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            if (model.ReferCode != _configuration["AdminCreateKey"])
            {
                return Unauthorized();
            }

            var userExists = await userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = "User already exists!" });

            Random r = new Random();
            var x = r.Next(0, 100000000);
            string referCode = x.ToString("00000000");

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                ReferCode = referCode,
                PayPasswordHash = model.PayPassword,
                IsNewMember = true,
                CreatedDate = DateTime.Now
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
            }
            await userService.UpdateUserIndex(user);

            if (!await roleManager.RoleExistsAsync(UserRole.Admin))
                await roleManager.CreateAsync(new IdentityRole(UserRole.Admin));
            if (!await roleManager.RoleExistsAsync(UserRole.User))
                await roleManager.CreateAsync(new IdentityRole(UserRole.User));
            if (!await roleManager.RoleExistsAsync(UserRole.Subscribed))
                await roleManager.CreateAsync(new IdentityRole(UserRole.Subscribed));

            if (await roleManager.RoleExistsAsync(UserRole.User))
            {
                await userManager.AddToRoleAsync(user, UserRole.Admin);
            }

            await userService.AddWalletByUserId(user.Id);

            return Ok(new Response<string> { Status = "Success", Message = "User created successfully!" });
        }
    }
}
