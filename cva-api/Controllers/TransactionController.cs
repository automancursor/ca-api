using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using DbTransactions = System.Transactions;
using cva_api.Model;
using cva_api.Model.RequestPayload;
using cva_api.Module;
using cva_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Identity;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace cva_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        IUserService userService;
        ITransactionService transactionService;
        private readonly JWTHelper _jwtHelper;
        private readonly IMemoryCache _cache;
        private readonly IHttpClientFactory _clientFactory;
        IConfigService configService;
        VerifyCode verifyCode;
        private readonly UserManager<User> userManager;
        private readonly AWSHelper AWSHelper;

        public TransactionController(IHttpClientFactory clientFactory, UserManager<User> userManager, IConfigService configService, IConfiguration configuration, IUserService userService, ITransactionService transactionService, IMemoryCache cache)
        {
            this.userManager = userManager;
            this.configService = configService;
            _cache = cache;
            _clientFactory = clientFactory;
            _configuration = configuration;
            this.userService = userService;
            this.transactionService = transactionService;
            _jwtHelper = new JWTHelper(configuration);
            this.verifyCode = new VerifyCode(cache);
            this.AWSHelper = new AWSHelper(configuration);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("all")]
        public async Task<IActionResult> GetTransactions([FromQuery] GetTransactionsRequest getTransactionsRequest)
        {
            var result = await transactionService.GetTransactions(getTransactionsRequest.TransactionType);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<cva_api.ViewModel.TransactionView>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<cva_api.ViewModel.TransactionView>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("")]
        public async Task<IActionResult> GetTransaction()
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userService.GetUser(userIdClaim.Value);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await transactionService.GetTransactionsByUserId(user.Id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Transaction>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Transaction>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpPost, Route("recharge/paypal")]
        public async Task<IActionResult> RechargeByPayPal([FromBody] RechargeByPayment rechargeByPayment)
        {
            using (DbTransactions.TransactionScope scope = new DbTransactions.TransactionScope(DbTransactions.TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    string token = Request.Headers[HeaderNames.Authorization];
                    var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
                    if (string.IsNullOrEmpty(userIdClaim?.Value))
                    {
                        return Unauthorized();
                    }
                    var user = await userService.GetUser(userIdClaim.Value);
                    if (user == null)
                    {
                        return Unauthorized();
                    }
                    var transaction = await this.transactionService.GetTransactionById(rechargeByPayment.TransactionId);
                    if (transaction == null)
                    {
                        return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "Not Found" });
                    }
                    if (transaction.TransactionStatus == TransactionStatus.SUCCESS)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Approved Already" });
                    }
                    var PaymentLink = $"https://www.paypal.com/v2/checkout/orders/{rechargeByPayment.PaymentCredentials}";
                    var request = new HttpRequestMessage(HttpMethod.Get,
                            PaymentLink);
                    var byteArray = Encoding.ASCII.GetBytes($"{_configuration["PayPal:ClientId"]}:{_configuration["PayPal:Secret"]}");
                    // request.Headers.Add("Content-Type", "application/json");
                    request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
                    var client = _clientFactory.CreateClient();

                    var VerifyResponse = await client.SendAsync(request);

                    if (!VerifyResponse.IsSuccessStatusCode)
                    {
                        throw new Exception(VerifyResponse.RequestMessage.ToString());
                    }
                    var content = await VerifyResponse.Content.ReadAsStringAsync();
                    var json = JsonConvert.DeserializeObject<PaypalOrderResponse>(content, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                    if (json.Status != "COMPLETED")
                    {
                        throw new Exception("Payment INCOMPLETED");
                    }
                    var payment = json.PurchaseUnits[0].Payments.Captures[0];
                    if (double.Parse(payment.Amount.Value) != transaction.Amount || payment.Amount.CurrencyCode != "AUD")
                    {
                        throw new Exception("Payment Amount Mismatch");
                    }
                    if (int.Parse(json.PurchaseUnits[0].ReferenceId) != transaction.ID)
                    {
                        throw new Exception("Transaction ID Mismatch");
                    }

                    double surcharge = 0;
                    if (transaction.TransactionType == TransactionType.RECHARGE)
                    {
                        var value = await configService.GetConfigdoubleValue("RECHARGE_SURCHARGE");
                        if (value != null)
                        {
                            surcharge = (double)value;
                        }
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Not a RECHARGE transaction" });
                    }
                    var response = await this.transactionService.PrcoessTransaction(transaction, (double)surcharge);
                    if (response.Status != "SUCCESS")
                    {
                        throw new Exception(response.Message);
                    }
                    transaction.PaymentLink = PaymentLink;
                    await this.transactionService.UpdateTransaction(transaction);
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                catch (Exception e)
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<Exception> { Status = "ERROR", Message = "ERROR", Data = e });
                }
            }
        }

        [Authorize]
        [HttpPost, Route("")]
        public async Task<IActionResult> AddTransaction([FromForm] AddTransactionRequest addTransactionRequest)
        {

            using (DbTransactions.TransactionScope scope = new DbTransactions.TransactionScope(DbTransactions.TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    string token = Request.Headers[HeaderNames.Authorization];
                    var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
                    if (string.IsNullOrEmpty(userIdClaim?.Value))
                    {
                        return Unauthorized();
                    }
                    var user = await userService.GetUser(userIdClaim.Value);
                    var toUser = await this.userManager.FindByNameAsync(addTransactionRequest.ToUserName ?? "");
                    if (user == null)
                    {
                        return Unauthorized();
                    }
                    if (user.PayPasswordHash != addTransactionRequest.PayPassword)
                    {
                        return Unauthorized();
                    }
                    if (addTransactionRequest.TransactionType == TransactionType.TRANSEFER || addTransactionRequest.TransactionType == TransactionType.WITHDRAW || addTransactionRequest.TransactionType == TransactionType.RPTCONVERSION)
                    {
                        if (this.verifyCode.isValid(userIdClaim.Value, addTransactionRequest.VerifyCode) == false)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Invalid Verify Code" });
                        }
                    }
                    var transaction = new Transaction
                    {
                        User = user,
                        TransactionCoinType = addTransactionRequest.TransactionCoinType,
                        TransactionStatus = TransactionStatus.IN_PROGRESS,
                        TransactionType = addTransactionRequest.TransactionType,
                        TransactionMethod = addTransactionRequest.TransactionMethod,
                        Amount = addTransactionRequest.Amount,
                        CreatedDate = DateTime.Now,
                        ToId = toUser?.Id
                    };
                    var surcharge = await configService.GetConfigdoubleValue("TRANSACTION_SURCHARGE");
                    if (surcharge == null)
                    {
                        surcharge = 0;
                    }
                    if (addTransactionRequest.AttachedFiles != null)
                    {
                        var links = "";
                        foreach (var file in addTransactionRequest.AttachedFiles)
                        {
                            var filePath = $"transaction/{user.Id}/{file.FileName}";
                            await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                            links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                        }
                        transaction.AttachedFilesLink = links;

                    }
                    var result = await transactionService.AddTransaction(transaction);
                    if (result == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<Transaction> { Status = "BadRequest", Message = "BadRequest", Data = result });
                    }
                    if (addTransactionRequest.TransactionType == TransactionType.TRANSEFER)
                    {
                        var response = await this.transactionService.PrcoessTransaction(transaction, (double)surcharge);
                        if (response.Status != "SUCCESS")
                        {
                            throw new Exception(response.Message);
                        }
                        scope.Complete();
                        return StatusCode(StatusCodes.Status400BadRequest, response);
                    }
                    else if (addTransactionRequest.TransactionType == TransactionType.RPTCONVERSION)
                    {
                        var response = await this.transactionService.PrcoessRptConversion(transaction);
                        if (response.Status != "SUCCESS")
                        {
                            throw new Exception(response.Message);
                        }
                        scope.Complete();
                        return StatusCode(StatusCodes.Status400BadRequest, response);
                    }
                    else
                    {
                        var Email = new Email(_clientFactory);
                        Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}发起{addTransactionRequest.TransactionType.ToString()}订单ID:{transaction.ID}</h4>", $"新{addTransactionRequest.TransactionType.ToString()}订单ID:{transaction.ID}");
                    }

                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<Transaction> { Status = "Success", Message = "Success", Data = result });


                }
                catch (Exception e)
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<Exception> { Status = "ERROR", Message = "ERROR", Data = e });
                }

            }
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("rptDebts")]
        public async Task<IActionResult> UpdateRptDebts([FromBody] UpdateRptDebtsRequest updateRptDebtsRequest)
        {

            var target = await userService.GetUser(updateRptDebtsRequest.UserId);
            if (target == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<dynamic> { Status = "BadRequest", Message = "User not found", Data = target });
            }
            target.Wallet.RptDebts = (double)updateRptDebtsRequest.Amount;
            var result = await userService.UpdateWallet(target.Wallet);
            if (result != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
            }
            return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("admin_transefer")]
        public async Task<IActionResult> AdminTransaction([FromBody] AdminTransactionRequest addTransactionRequest)
        {

            using (DbTransactions.TransactionScope scope = new DbTransactions.TransactionScope(DbTransactions.TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var transaction = new Transaction
                    {
                        UserId = addTransactionRequest.FromId,
                        TransactionCoinType = addTransactionRequest.TransactionCoinType,
                        TransactionStatus = TransactionStatus.IN_PROGRESS,
                        TransactionType = TransactionType.TRANSEFER,
                        TransactionMethod = addTransactionRequest.TransactionMethod,
                        Amount = addTransactionRequest.Amount,
                        CreatedDate = DateTime.Now,
                        ToId = addTransactionRequest.ToId
                    };
                    var surcharge = await configService.GetConfigdoubleValue("TRANSACTION_SURCHARGE");
                    if (surcharge == null)
                    {
                        surcharge = 0;
                    }
                    var result = await transactionService.AddTransaction(transaction);
                    if (result == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<Transaction> { Status = "BadRequest", Message = "BadRequest", Data = result });
                    }

                    var response = await this.transactionService.PrcoessTransaction(transaction, (double)surcharge);
                    if (response.Status != "SUCCESS")
                    {
                        throw new Exception(response.Message);
                    }
                    if (transaction.TransactionCoinType == TransactionCoinType.Rpt)
                    {
                        var target = await userService.GetUser(transaction.ToId);
                        target.Wallet.RptDebts += (double)transaction.Amount;
                        await userService.UpdateWallet(target.Wallet);
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, response);

                }
                catch (Exception e)
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<Exception> { Status = "ERROR", Message = "ERROR", Data = e });
                }

            }
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("")]
        public async Task<IActionResult> UpdateTransaction([FromBody] Transaction transaction)
        {
            var result = await transactionService.UpdateTransaction(transaction);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("approve/{id:int}")]
        public async Task<IActionResult> ApproveTransaction(int id)
        {
            using (DbTransactions.TransactionScope scope = new DbTransactions.TransactionScope(DbTransactions.TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var transaction = await transactionService.GetTransactionById(id);
                    if (transaction == null)
                    {
                        return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "Not Found" });
                    }
                    if (transaction.TransactionStatus == TransactionStatus.SUCCESS)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "BadRequest", Message = "BadRequest", Data = "Approved Already" });
                    }
                    double surcharge = 0;
                    if (transaction.TransactionType == TransactionType.WITHDRAW)
                    {
                        var value = await configService.GetConfigdoubleValue("WITHDRAW_SURCHARGE");
                        if (value != null)
                        {
                            surcharge = (double)value;
                        }
                    }
                    if (transaction.TransactionType == TransactionType.RECHARGE)
                    {
                        var value = await configService.GetConfigdoubleValue("RECHARGE_SURCHARGE");
                        if (value != null)
                        {
                            surcharge = (double)value;
                        }
                    }
                    var response = await this.transactionService.PrcoessTransaction(transaction, (double)surcharge);
                    if (response.Status != "SUCCESS")
                    {
                        throw new Exception(response.Message);
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, response);
                }
                catch (Exception e)
                {

                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<Exception> { Status = "ERROR", Message = "ERROR", Data = e });
                }
            }
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete, Route("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var result = await transactionService.DeleteTransactionById(id);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<int> { Status = "BadRequest", Message = "BadRequest", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }


    }
}
