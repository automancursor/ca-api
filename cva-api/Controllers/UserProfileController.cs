using System;
using System.Threading.Tasks;
using cva_api.Service;
using Microsoft.AspNetCore.Mvc;
using cva_api.ViewModel;
using cva_api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;
using cva_api.Module;
using cva_api.Model.RequestPayload;
using System.Net.Http;

namespace cva_api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> userManager;
        IUserService userService;
        ITwilioService twilioService;
        private readonly IMemoryCache _cache;
        private JWTHelper _jwtHelper;
        private readonly IHttpClientFactory _clientFactory;
        private readonly AWSHelper AWSHelper;
        VerifyCode verifyCode;

        public UserProfileController(IHttpClientFactory clientFactory, UserManager<User> userManager, IConfiguration configuration, IUserService userService, ITwilioService twilioService, IMemoryCache cache)
        {
            _configuration = configuration;
            this.userService = userService;
            this.twilioService = twilioService;
            this.userManager = userManager;
            _cache = cache;
            this.verifyCode = new VerifyCode(cache);
            _jwtHelper = new JWTHelper(configuration);
            _clientFactory = clientFactory;
            this.AWSHelper = new AWSHelper(configuration);
        }



        [Authorize]
        [HttpGet, Route("{id}")]
        public async Task<IActionResult> GetProfile(string id)
        {

            string token = Request.Headers[HeaderNames.Authorization];
            //var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token.Split(" ")[1]);
            var result = await userService.GetUserProfile(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<UserProfile> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            var jwtHelper = new JWTHelper(_configuration);

            var isValid = jwtHelper.ValidateToken(token.Split(" ")[1], result.Username, result.Id);

            if (isValid == false)
            {
                return Unauthorized();
            }


            return StatusCode(StatusCodes.Status200OK, new Response<UserProfile> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPut, Route("")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserProfile updateUserProfile)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            updateUserProfile.userId = user.Id;
            var target = await userManager.FindByNameAsync(updateUserProfile.UserName);
            if(target!=null && target.Id != user.Id){
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "Duplicate UserName", Data = "Duplicate UserName" });
            }
            var result = await userService.UpdateUserProfile(updateUserProfile);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("admin_get/{id}")]
        public async Task<IActionResult> GetUserProfile(string id)
        {
            var result = await userService.GetUserProfile(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<UserProfile> { Status = "Not Found", Message = "Not Found", Data = result });
            } 
            return StatusCode(StatusCodes.Status200OK, new Response<UserProfile> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("admin_update")]
        public async Task<IActionResult> AdminUpdateUser([FromBody] UpdateUserProfile updateUserProfile)
        {

            var result = await userService.UpdateUserProfile(updateUserProfile);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("user_verification/all")]
        public async Task<IActionResult> GetUserVerifications()
        {

            var result = await userService.GetUserVerifications();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<List<UserVerification>> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<UserVerification>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("seller_verification/all")]
        public async Task<IActionResult> GetSellerVerifications()
        {

            var result = await userService.GetSellerVerifications();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<List<SellerVerification>> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<SellerVerification>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpGet, Route("user_verification")]
        public async Task<IActionResult> GetUserVerificationsByUser()
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await userService.GetUserVerificationsByUserId(user.Id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<List<UserVerification>> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<UserVerification>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("seller_verification")]
        public async Task<IActionResult> GetSellerVerificationsByUser()
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await userService.GetSellerVerificationsByUserId(user.Id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<List<SellerVerification>> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<SellerVerification>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPost, Route("user_verification")]
        public async Task<IActionResult> AddUserVerification([FromForm] AddUserVerification addUserVerification)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            if (this.verifyCode.isValid(userIdClaim.Value, addUserVerification.VerifyCode) == false)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Invalid Verify Code" });
            }
            var userVerification = new UserVerification()
            {
                UserId = user.Id,
                UserName = user.UserName,
                User = user,
                CreatedDate = DateTime.Now,
                FirstName = addUserVerification.FirstName,
                LastName = addUserVerification.LastName,
                Address = addUserVerification.Address,
                UserMessage = addUserVerification.UserMessage,
                UserVerificationStatus = UserVerificationStatus.IN_PROGRESS,
            };
            if (addUserVerification.IdCardAttachedFiles != null)
            {
                var links = "";
                foreach (var file in addUserVerification.IdCardAttachedFiles)
                {
                    var filePath = $"userVerification/{user.Id}/IdCard/{addUserVerification.IdCard}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                userVerification.IdCard = new UserVerificationData()
                {
                    value = addUserVerification.IdCard,
                    links = links
                };
                userVerification.IdCardNumber = addUserVerification.IdCard;
    
            }
            if (addUserVerification.Passport != null)
            {
                var links = "";
                foreach (var file in addUserVerification.PassportAttachedFiles)
                {
                    var filePath = $"userVerification/{user.Id}/Passport/{addUserVerification.Passport}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                userVerification.Passport = new UserVerificationData()
                {
                    value = addUserVerification.Passport,
                    links = links
                };
                userVerification.PassportNumber = addUserVerification.Passport;
    
            }

            var result = await userService.AddUserVerification(userVerification);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<UserVerification> { Status = "BadRequest", Message = "Passport of Idcard Already Exist", Data = result });
            }
            var Email = new Email(_clientFactory);
            Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}发起实名验证请求, 请求ID 为${result.IdCard},请尽快查看</h4>", $"用户{user.UserName}实名验证");
            return StatusCode(StatusCodes.Status200OK, new Response<UserVerification> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPost, Route("seller_verification")]
        public async Task<IActionResult> AddSellerVerification([FromForm] AddSellerVerification addSellerVerification)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            if (this.verifyCode.isValid(userIdClaim.Value, addSellerVerification.VerifyCode) == false)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Invalid Verify Code" });
            }
            var sellerVerification = new SellerVerification()
            {
                UserId = user.Id,
                UserName = user.UserName,
                User = user,
                CreatedDate = DateTime.Now,
                ABN = addSellerVerification.Abn,
                Email = addSellerVerification.Email,
                Mobile = addSellerVerification.Mobile,
                Country = addSellerVerification.Country,
                CompanyName = addSellerVerification.CompanyName,
                CompanyAddress = addSellerVerification.CompanyAddress,
                CompanyLink = addSellerVerification.CompanyLink,
                RptRate = addSellerVerification.RptRate,
                SellerVerificationStatus = SellerVerificationStatus.IN_PROGRESS,
            };
            if (addSellerVerification.RegistrationAttachedFiles != null)
            {
                var links = "";
                foreach (var file in addSellerVerification.RegistrationAttachedFiles)
                {
                    var filePath = $"sellerVerification/{user.Id}/RegistrationAttachedFiles/{addSellerVerification.Abn}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                sellerVerification.Registration = new SellerVerificationData()
                {
                    value = addSellerVerification.Abn,
                    links = links
                };     
            }
            if (addSellerVerification.AvatarImage != null)
            {
                var imageUrl = "";
                foreach (var file in addSellerVerification.AvatarImage)
                {
                    var filePath = $"sellerVerification/{user.Id}/AvatarImage/{addSellerVerification.Abn}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    imageUrl = $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}";
                }
                sellerVerification.AvatarImage = imageUrl;     
            }
            var result = await userService.AddSellerVerification(sellerVerification);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<SellerVerification> { Status = "BadRequest", Message = "ABN Already Exist", Data = result });
            }
            var Email = new Email(_clientFactory);
            Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}发起成为商城供应商验证请求, 请求ID 为${result.ID},请尽快查看</h4>", $"用户{user.UserName}成为商城供应商验证");
            return StatusCode(StatusCodes.Status200OK, new Response<SellerVerification> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("user_verification/approve/{userVerificationId}")]
        public async Task<IActionResult> ApproveUserVerification(int userVerificationId)
        {

            var userVerification = await userService.GetUserVerificationById(userVerificationId);
            if (userVerification == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<UserVerification> { Status = "BadRequest", Message = "BadRequest", Data = userVerification });
            }
            var result = await userService.ApproveUserVerification(userVerification);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("seller_verification/approve/{sellerVerificationId}")]
        public async Task<IActionResult> ApproveSellerVerification(int sellerVerificationId)
        {

            var sellerVerification = await userService.GetSellerVerificationById(sellerVerificationId);
            if (sellerVerification == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<SellerVerification> { Status = "BadRequest", Message = "BadRequest", Data = sellerVerification });
            }
            var result = await userService.ApproveSellerVerification(sellerVerification);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("user_verification/update")]
        public async Task<IActionResult> UpdateUserVerification(UserVerification UserVerification)
        {
            var result = await userService.UpdateUserVerification(UserVerification);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("seller_verification/update")]
        public async Task<IActionResult> AdminUpdateSellerVerification(SellerVerification SellerVerification)
        {
            var result = await userService.UpdateSellerVerification(SellerVerification);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPut, Route("seller_verification")]
        public async Task<IActionResult> UpdateSellerVerification(SellerVerification SellerVerification)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);

            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var v = await userService.GetSellerVerificationById(SellerVerification.ID);
            if(v.UserId != userIdClaim.Value){
                return Unauthorized();
            }
            var result = await userService.UpdateSellerVerification(SellerVerification);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete, Route("user_verification/{id}")]
        public async Task<IActionResult> DeleteUserVerification(int id)
        {
            var result = await userService.DeleteUserVerification(id);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete, Route("seller_verification/{id}")]
        public async Task<IActionResult> DeleteSellerVerification(int id)
        {
            var result = await userService.DeleteSellerVerification(id);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPost, Route("sms_code")]
        public async Task<IActionResult> SendSMS([FromBody] SendSMSDTO sendSMSDTO)
        {
            string token = Request.Headers[HeaderNames.Authorization];

            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);

            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }


            Random r = new Random();
            var x = r.Next(0, 1000000);
            string verifyCode = x.ToString("000000");
            await twilioService.SendMessage("验证码为：" + verifyCode, sendSMSDTO.Mobile);

            var json = new
            {
                VerifyCode = verifyCode,
                Mobile = sendSMSDTO.Mobile
            };

            _cache.Set<string>($"MobileVerify_{userIdClaim?.Value}", JsonConvert.SerializeObject(json), DateTime.Now.AddMinutes(3));

            return Ok();
        }

        [Authorize]
        [HttpPost, Route("email_code")]
        public async Task<IActionResult> SendEmail([FromBody] sendEmailCodeRequest sendEmailCode)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);

            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }


            Random r = new Random();
            var x = r.Next(0, 1000000);
            string verifyCode = x.ToString("000000");
            var Email = new Email(_clientFactory);
            Email.sendMail(sendEmailCode.Email, $"<h1>验证码为:{verifyCode}</h1>", "验证码");

            var json = new
            {
                VerifyCode = verifyCode,
                Email = sendEmailCode.Email
            };

            _cache.Set<string>($"EmailVerify_{userIdClaim?.Value}", JsonConvert.SerializeObject(json), DateTime.Now.AddMinutes(3));

            return Ok();
        }

        [Authorize]
        [HttpPost, Route("emailVerify")]
        public async Task<IActionResult> VerifyEmail([FromBody] EmailVerifyRequest emailVerifyRequest)
        {
            string token = Request.Headers[HeaderNames.Authorization];

            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }

            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }

            string cache = _cache.Get<string>($"EmailVerify_{userIdClaim?.Value}");

            if (string.IsNullOrEmpty(cache))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "400", Message = "Invalid Code" });
            }
            JObject json_object = JObject.Parse(cache);
            string code = (string)json_object["VerifyCode"];

            if (code != emailVerifyRequest.VerifyCode)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "400", Message = "Invalid Code" });
            }

            user.Email = (string)json_object["Email"];
            user.EmailConfirmed = true;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
            }
            return Ok();
        }



        [Authorize]
        [HttpPost, Route("mobileVerify")]
        public async Task<IActionResult> VerifyMobile([FromBody] VerifyMobileDto verifyMobileDto)
        {
            string token = Request.Headers[HeaderNames.Authorization];

            var simplePrinciple = _jwtHelper.GetPrincipal(token.Split(" ")[1]);
            var identity = simplePrinciple.Identity as ClaimsIdentity;
            var userIdClaim = identity.FindFirst(ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }

            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null)
            {
                return Unauthorized();
            }

            string cache = _cache.Get<string>($"MobileVerify_{userIdClaim?.Value}");
            if (string.IsNullOrEmpty(cache))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "400", Message = "Invalid Code" });
            }
            JObject json_object = JObject.Parse(cache);
            string code = (string)json_object["VerifyCode"];

            if (code != verifyMobileDto.VerifyCode)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "400", Message = "Invalid Code" });
            }

            user.PhoneNumber = (string)json_object["Mobile"];
            user.PhoneNumberConfirmed = true;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(result.Errors) });
            }


            return Ok();
        }



        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("")]
        public async Task<IActionResult> GetUsers()
        {

            var result = await userService.GetUsers();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<UserProfile>> { Status = "Not Found", Message = "Not Found", Data = null });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<UserProfile>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("wallets")]
        public async Task<IActionResult> GetWallets()
        {

            var result = await userService.GetWallets();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Wallet>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Wallet>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("wallets")]
        public async Task<IActionResult> UpdateWallets(UpdateWallet payload)
        {
            var user = await userService.GetUser(payload.userId);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "User Not Found", Data = "User Not Found" });
            }
            if (payload.Cva != null)
            {
                user.Wallet.Cva = (double)payload.Cva;
            }
            if (payload.Abg != null)
            {
                user.Wallet.Abg = (double)payload.Abg;
            }
            if (payload.Cvt != null)
            {
                user.Wallet.Cvt = (double)payload.Cvt;
            }
            if (payload.CvtCredit != null)
            {
                user.Wallet.CvtCredit = (double)payload.CvtCredit;
            }
            var result = await userService.UpdateWallet(user.Wallet);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Not Found", Message = "Failed", Data = "Failed" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<Wallet> { Status = "Success", Message = "Success", Data = user.Wallet });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("referees/{userId}")]
        public async Task<IActionResult> GetReferees(string userId)
        {

            var result = await userService.GetReferees(userId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<UserProfile>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<UserProfile>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("walletStatistics")]
        public async Task<IActionResult> GetWalletStatistics()
        {

            var result = await userService.GetStatistic();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<StatisticView> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<StatisticView> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("walletHistories/{updateType}")]
        public async Task<IActionResult> GetWalletHistories(string updateType)
        {

            var result = await userService.GetWalletHistories(updateType);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<WalletHistory>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<WalletHistory>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("walletHistories/{updateType}/{walletId}")]
        public async Task<IActionResult> GetWalletHistoriesByWalletId(string updateType, string walletId)
        {
            var result = await userService.GetWalletHistoriesByWalletId(updateType, walletId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<WalletHistory>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<WalletHistory>> { Status = "Success", Message = "Success", Data = result });
        }
    }


}
