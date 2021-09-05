using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.Service;
using cva_api.Module;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.Net.Http.Headers;
using cva_api.Model.RequestPayload;
using Newtonsoft.Json;
using System.Transactions;
using cva_api.ViewModel;
using Hangfire;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Net.Http.Headers;

namespace cva_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;
        IOrderService orderService;
        IProductOrderService productOrderService;
        private readonly IHttpClientFactory _clientFactory;
        IUserService userService;
        IAreaService areaService;
        IConfigService configService;
        IAreaRecordHelperService areaRecordHelperService;
        IBackgroundJobClient backgroundJobs;
        private readonly JWTHelper _jwtHelper;


        public OrderController(IHttpClientFactory clientFactory, IProductOrderService productOrderService, IAreaService areaService, IConfigService configService, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IOrderService orderService, IUserService userService, IBackgroundJobClient backgroundJobs, IAreaRecordHelperService areaRecordHelperService)
        {
            this.userManager = userManager;
            this.areaService = areaService;
            this.areaRecordHelperService = areaRecordHelperService;
            this.roleManager = roleManager;
            _configuration = configuration;
            this.orderService = orderService;
            _clientFactory = clientFactory;
            this.productOrderService = productOrderService;
            this.userService = userService;
            this.backgroundJobs = backgroundJobs;
            _jwtHelper = new JWTHelper(configuration);
            this.configService = configService;
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("all")]
        public async Task<IActionResult> GetOrders()
        {
            var result = await orderService.GetOrders();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<OrderView>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<OrderView>> { Status = "Success", Message = "Success", Data = result });
        }


        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("admin_order/{id}")]
        public async Task<IActionResult> AdminAddOrder(string id, [FromBody] AddOrderRequest addOrderRequest)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
            {
                try
                {
                    var user = await userService.GetUser(id);
                    var areaClaim = await areaService.GetAreaClaimById(addOrderRequest.AreaClaimId);
                    if (user == null)
                    {
                        return Unauthorized();
                    }

                    if (areaClaim == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Invalid AreaClaimId", Data = null });
                    }
                    if (addOrderRequest.PaymentType == "Rpt")
                    {
                        if ((user.Wallet.Rpt - user.Wallet.RptDebts) < areaClaim.Cva * 3)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Insufficient Available Rpt Balance(Rpt - RptDebts)", Data = null });
                        }
                    }
                    else
                    {
                        if (user.Wallet.Cva < areaClaim.Cva)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Insufficient Cva Balance", Data = null });
                        }
                    }

                    var REORDER_CONTROL = await this.configService.GetConfigStringValue("REORDER_CONTROL");
                    if (REORDER_CONTROL == "off")
                    {
                        var records = await this.areaService.GetAreaRecordsByUserIdAndAreaClaimId(user.Id, addOrderRequest.AreaClaimId);
                        if (records != null && records.Count > 0)
                        {
                            throw new Exception("无法重复购买该区，请联系管理员");
                        }
                    }
                    var order = new Order
                    {
                        CreatedDate = DateTime.Now,
                        Cva = areaClaim.Cva,
                        Cvt = areaClaim.Cvt,
                        Abg = areaClaim.Abg,
                        CvtCredit = areaClaim.Cvt * (areaClaim.Round - 1),
                        Msg = $"买入{areaClaim.Name}区域"
                    };
                    order.User = user;
                    var result = await orderService.AddOrder(order);
                    if (result == null)
                    {
                        return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = null });
                    }
                    var lights = new List<List<LightDto>>();
                    var light = new List<LightDto>();
                    light.Add(new LightDto
                    {
                        Type = "YELLOW"
                    });
                    lights.Add(light);
                    var areaRecord = new AreaRecord
                    {
                        Live = areaClaim.Round,
                        AreaClaimId = areaClaim.ID,
                        Lights = lights,
                        OrderId = order.ID,
                        Order = order,
                        UserId = user.Id,
                        User = user,
                        AreaClaim = areaClaim,
                        RoundNum = 1,
                        HistoryRecords = new List<HistoryRecord>(),
                    };
                    if (user.IsNewMember == false)
                    {
                        areaRecord.Type = "b";
                    }
                    else
                    {
                        areaRecord.Type = "a";
                    }

                    await areaService.AddAreaRecord(areaRecord);
                    user.IsNewMember = false;
                    // user = await this.areaRecordHelperService.ProcessOrder(user, areaClaim.ID, order.ID);
                    var userResult = await userManager.UpdateAsync(user);
                    if (!userResult.Succeeded)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(userResult.Errors) });
                    }

                    backgroundJobs.Enqueue(() => this.areaRecordHelperService.ProcessOrder(user.Id, areaClaim.ID, order.ID, addOrderRequest.PaymentType));
                    backgroundJobs.Enqueue(() => this.areaRecordHelperService.ValidateOrder(order.ID, user.Id, areaClaim.ID, areaRecord.ID));
                    if (areaClaim.ID >= 8)
                    {
                        for (int i = 1; i < areaClaim.ID; i++)
                        {
                            var rewardAreaClaim = await areaService.GetAreaClaimById(i);
                            var rewardOrder = new Order
                            {
                                CreatedDate = DateTime.Now,
                                Cva = 0,
                                Cvt = 0,
                                Abg = 0,
                                CvtCredit = 0,
                                Msg = $"{areaClaim.Name}买入，系统奖励{rewardAreaClaim.Name}区域"
                            };
                            rewardOrder.User = user;
                            var rewardResult = await orderService.AddOrder(rewardOrder);
                            if (rewardResult == null)
                            {
                                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = null });
                            }
                            var rewardLights = new List<List<LightDto>>();
                            var rewardLight = new List<LightDto>();
                            rewardLight.Add(new LightDto
                            {
                                Type = "YELLOW"
                            });
                            rewardLights.Add(rewardLight);
                            var rewardAreaRecord = new AreaRecord
                            {
                                Live = areaClaim.Round,
                                AreaClaimId = rewardAreaClaim.ID,
                                Lights = rewardLights,
                                OrderId = rewardOrder.ID,
                                Order = rewardOrder,
                                UserId = user.Id,
                                User = user,
                                AreaClaim = rewardAreaClaim,
                                RoundNum = 1,
                                HistoryRecords = new List<HistoryRecord>(),
                                Type = "b"
                            };
                            await areaService.AddAreaRecord(rewardAreaRecord);
                            backgroundJobs.Enqueue(() => this.areaRecordHelperService.ValidateOrder(rewardOrder.ID, user.Id, rewardAreaClaim.ID, rewardAreaRecord.ID));
                        }
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<Order> { Status = "Success", Message = "Success", Data = result });

                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(e) });
                }
            }
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("bbw_record/{areaClaimId:int}")]
        public async Task<IActionResult> AdminAddBBWRecord(int areaClaimId)
        {
            var areaClaim = await this.areaService.GetAreaClaimById(areaClaimId);
            if (areaClaim == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Invalid AreaClaimId", Data = null });
            }
            if (areaClaim.AccumulatedBonusCredit < areaClaim.TargetBonus)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Insufficient AccumulatedBonusCredit Balance", Data = null });
            }

            var result = await this.areaService.UpdateAreaClaims(new UpdateAreaClaimPayload
            {
                ID = areaClaim.ID,
                AccumulatedBonusCredit = areaClaim.AccumulatedBonusCredit - areaClaim.TargetBonus
            });
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Update AccumulatedBonusCredit Failed", Data = null });
            }
            backgroundJobs.Schedule(() => this.areaRecordHelperService.AddBBWRecord(areaClaim.ID), TimeSpan.FromMilliseconds(1));
            return StatusCode(StatusCodes.Status200OK, new Response<string> { Status = "Success", Message = "Success", Data = "ADD BBW RECORD" });
        }
        [Authorize]
        [HttpGet, Route("product_order")]
        public async Task<IActionResult> GetProductOrder()
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
            var result = await this.productOrderService.GetProductOrdersByUserId(user.Id);
            return StatusCode(StatusCodes.Status200OK, new Response<List<ProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpGet, Route("rptProduct_order")]
        public async Task<IActionResult> GetRptProductOrder()
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
            var result = await this.productOrderService.GetRptProductOrdersByUserId(user.Id);
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpGet, Route("product_order/seller")]
        public async Task<IActionResult> GetProductOrderBySeller()
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
            var result = await this.productOrderService.GetProductOrdersBySellerId(user.Id);
            return StatusCode(StatusCodes.Status200OK, new Response<List<ProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpGet, Route("rptProduct_order/seller")]
        public async Task<IActionResult> GetRptProductOrderBySeller()
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
            var result = await this.productOrderService.GetRptProductOrdersBySellerId(user.Id);
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize]
        [HttpGet, Route("product_order/{id}")]
        public async Task<IActionResult> GetProductOrderById(int id)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userService.GetUser(userIdClaim.Value);
            var result = await this.productOrderService.GetProductOrdersById(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<ProductOrder> { Status = "Not Found", Message = "Not Found", Data = result });
            };
            if (user == null || (user.Id != result.UserId && user.Id != result.SellerId))
            {
                return Unauthorized();
            }

            return StatusCode(StatusCodes.Status200OK, new Response<ProductOrder> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("rptProduct_order/{id}")]
        public async Task<IActionResult> GetRptProductOrderById(int id)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userService.GetUser(userIdClaim.Value);
            var result = await this.productOrderService.GetRptProductOrdersById(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<RptProductOrder> { Status = "Not Found", Message = "Not Found", Data = result });
            };
            if (user == null || (user.Id != result.UserId && user.Id != result.SellerId))
            {
                return Unauthorized();
            }

            return StatusCode(StatusCodes.Status200OK, new Response<RptProductOrder> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("admin_product_order")]
        public async Task<IActionResult> GetAllProductOrder()
        {
            var result = await this.productOrderService.GetProductOrders();
            return StatusCode(StatusCodes.Status200OK, new Response<List<ProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("admin_rptProduct_order")]
        public async Task<IActionResult> GetAllRptProductOrder()
        {
            var result = await this.productOrderService.GetRptProductOrders();
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProductOrder>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("product_order")]
        public async Task<IActionResult> UpdateProductOrder([FromBody] ProductOrder productOrder)
        {
            var result = await this.productOrderService.UpdateProductOrder(productOrder);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Failed", Message = "Not Found", Data = "Not Found" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<string> { Status = "Success", Message = "Success", Data = "UPDATE SUCCESS" });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("rptProduct_order")]
        public async Task<IActionResult> UpdateRptProductOrder([FromBody] RptProductOrder RptProductOrder)
        {
            var result = await this.productOrderService.UpdateRptProductOrder(RptProductOrder);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Failed", Message = "Not Found", Data = "Not Found" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<string> { Status = "Success", Message = "Success", Data = "UPDATE SUCCESS" });
        }

        [Authorize]
        [HttpPost, Route("product_order/approve/{id}")]
        public async Task<IActionResult> ApproveProductOrder(int id)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var productOrder = await productOrderService.GetProductOrder(id);
            if (productOrder == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || productOrder.UserId != user.Id)
            {
                return Unauthorized();
            }
            productOrder.ProductOrderStatus = ProductOrderStatusType.SUCCESS;
            var result = await this.productOrderService.UpdateProductOrder(productOrder);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Failed", Message = "Not Found", Data = "Not Found" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<string> { Status = "Success", Message = "Success", Data = "UPDATE SUCCESS" });
        }

        [Authorize]
        [HttpPost, Route("rptProduct_order/approve/{id}")]
        public async Task<IActionResult> ApproveRptProductOrder(int id)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var productOrder = await productOrderService.GetRptProductOrder(id);
            if (productOrder == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || productOrder.UserId != user.Id)
            {
                return Unauthorized();
            }
            productOrder.RptProductOrderStatus = RptProductOrderStatusType.SUCCESS;
            var result = await this.productOrderService.UpdateRptProductOrder(productOrder);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Failed", Message = "Not Found", Data = "Not Found" });
            }
            var rptResult = await this.productOrderService.RewardRptProductOrder(productOrder);
            if (rptResult == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Failed", Message = "RPT reward error", Data = "RPT reward error" });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<string> { Status = "Success", Message = "Success", Data = "UPDATE SUCCESS" });
        }

        [Authorize]
        [HttpPost, Route("product_order")]
        public async Task<IActionResult> AddProductOrder([FromBody] AddProductOrderRequest addProductOrderRequest)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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
                    var seller = await userService.GetUser(addProductOrderRequest.SellerId);
                    if (seller == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Seller Not Found" });
                    }
                    double Cvt = 0;
                    var orderProducts = new List<OrderProduct>();
                    foreach (var orderProduct in addProductOrderRequest.OrderProducts)
                    {
                        var product = await this.productOrderService.GetProduct(orderProduct.ProductId);
                        if (product == null)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product NotFound" });
                        }
                        if (product.Quantity < orderProduct.Quantity)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product {product.Name} Out of Stock" });
                        }
                        if (product.UserId != addProductOrderRequest.SellerId)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"SellerId incorrect" });
                        }
                        product.Quantity -= orderProduct.Quantity;
                        if (product.Quantity == 0)
                        {
                            product.ProductStatus = ProductStatusType.OUT_OF_STOCK;
                        }
                        var updateProduct = await this.productOrderService.UpdateProducts(product);
                        if (updateProduct == 0)
                        {
                            throw new Exception("update product quantity error");
                        }
                        Cvt += product.CvtPrice * orderProduct.Quantity;
                        orderProducts.Add(new OrderProduct
                        {
                            ProductId = orderProduct.ProductId,
                            Quantity = orderProduct.Quantity,
                            CvtPrice = product.CvtPrice,
                            ProductImages = product.ProductImages,
                            Name = product.Name
                        });
                    };

                    var productOrder = new ProductOrder
                    {
                        UserId = user.Id,
                        SellerId = addProductOrderRequest.SellerId,
                        SellerName = seller.UserName,
                        UserName = user.UserName,
                        Cvt = Cvt,
                        OrderDetail = addProductOrderRequest.OrderDetail,
                        Address = addProductOrderRequest.Address,
                        OrderProducts = orderProducts,
                        ProductOrderStatus = ProductOrderStatusType.PENDING,
                        CreatedDate = DateTime.Now,
                    };
                    var result = await this.productOrderService.AddProductOrder(productOrder);
                    if (result != "SUCCESS")
                    {
                        throw new Exception(result);
                    }
                    var Email = new Email(_clientFactory);
                    Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}购买商品订单成功；订单ID:{productOrder.ID}</h4>", $"新商品订单ID:{productOrder.ID}");
                    if (user.Email != null)
                    {
                        Email.sendMail(user.Email, $"<h4>商品购买成功；订单ID:{productOrder.ID}</h4>", $"您的商品订单ID:{productOrder.ID}购买成功，正在等待卖家发货");
                    }
                    if (seller.Email != null)
                    {
                        Email.sendMail(seller.Email, $"<h4>用户{user.UserName}购买商品订单成功；订单ID:{productOrder.ID}</h4>", $"新商品订单ID:{productOrder.ID}，请尽快发货");
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<ProductOrder> { Status = "Success", Message = "Success", Data = productOrder });

                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(e) });
                }
            }
        }

        [Authorize]
        [HttpPost, Route("rptProduct_order")]
        public async Task<IActionResult> AddRptProductOrder([FromBody] AddProductOrderRequest addProductOrderRequest)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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
                    var seller = await userService.GetUser(addProductOrderRequest.SellerId);
                    if (seller == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Seller Not Found" });
                    }
                    double Cva = 0;
                    var orderProducts = new List<RptOrderProduct>();
                    foreach (var orderProduct in addProductOrderRequest.OrderProducts)
                    {
                        var product = await this.productOrderService.GetRptProduct(orderProduct.ProductId);
                        if (product == null)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product NotFound" });
                        }
                        if (product.Currency != "Cva")
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product {product.Name} price is not Cva" });
                        }
                        if (product.Quantity < orderProduct.Quantity)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product {product.Name} Out of Stock" });
                        }
                        if (product.UserId != addProductOrderRequest.SellerId)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"SellerId incorrect" });
                        }
                        product.Quantity -= orderProduct.Quantity;
                        if (product.Quantity == 0)
                        {
                            product.ProductStatus = ProductStatusType.OUT_OF_STOCK;
                        }
                        var updateProduct = await this.productOrderService.UpdateRptProducts(product);
                        if (updateProduct == 0)
                        {
                            throw new Exception("update product quantity error");
                        }
                        Cva += product.Price * orderProduct.Quantity;
                        orderProducts.Add(new RptOrderProduct
                        {
                            ProductId = orderProduct.ProductId,
                            Quantity = orderProduct.Quantity,
                            Price = product.Price,
                            Cost = product.Cost,
                            Currency = product.Currency,
                            CostCurrency = product.CostCurrency,
                            ProductImages = product.ProductImages,
                            Name = product.Name
                        });
                    };

                    var productOrder = new RptProductOrder
                    {
                        UserId = user.Id,
                        SellerId = addProductOrderRequest.SellerId,
                        SellerName = seller.UserName,
                        UserName = user.UserName,
                        Price = Cva,
                        OrderDetail = addProductOrderRequest.OrderDetail,
                        Address = addProductOrderRequest.Address,
                        RptOrderProducts = orderProducts,
                        Currency = "Cva",
                        RptProductOrderStatus = RptProductOrderStatusType.PENDING,
                        CreatedDate = DateTime.Now,
                    };
                    var result = await this.productOrderService.AddRptProductOrder(productOrder);
                    if (result != "SUCCESS")
                    {
                        throw new Exception(result);
                    }
                    var Email = new Email(_clientFactory);
                    Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}购买积分商品订单成功；订单ID:{productOrder.ID}</h4>", $"新积分商品订单ID:{productOrder.ID}");
                    if (user.Email != null)
                    {
                        Email.sendMail(user.Email, $"<h4>积分商品购买成功；订单ID:{productOrder.ID}</h4>", $"您的积分商品订单ID:{productOrder.ID}购买成功，正在等待卖家发货");
                    }
                    if (seller.Email != null)
                    {
                        Email.sendMail(seller.Email, $"<h4>用户{user.UserName}购买积分商品订单成功；订单ID:{productOrder.ID}</h4>", $"新积分商品订单ID:{productOrder.ID}，请尽快发货");
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<RptProductOrder> { Status = "Success", Message = "Success", Data = productOrder });

                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(e) });
                }
            }
        }

        [Authorize]
        [HttpPost, Route("rptProduct_order/paypal")]
        public async Task<IActionResult> AddRptProductOrderByPayPal([FromBody] AddProductOrderRequest addProductOrderRequest)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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
                    var seller = await userService.GetUser(addProductOrderRequest.SellerId);
                    if (seller == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Seller Not Found" });
                    }
                    double Price = 0;
                    var orderProducts = new List<RptOrderProduct>();
                    foreach (var orderProduct in addProductOrderRequest.OrderProducts)
                    {
                        var product = await this.productOrderService.GetRptProduct(orderProduct.ProductId);
                        if (product == null)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product NotFound" });
                        }
                        if (product.Currency != "AUD")
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product {product.Name} price is not AUD" });
                        }
                        if (product.Quantity < orderProduct.Quantity)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"Product {product.Name} Out of Stock" });
                        }
                        if (product.UserId != addProductOrderRequest.SellerId)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Error", Message = $"SellerId incorrect" });
                        }
                        product.Quantity -= orderProduct.Quantity;
                        if (product.Quantity == 0)
                        {
                            product.ProductStatus = ProductStatusType.OUT_OF_STOCK;
                        }
                        var updateProduct = await this.productOrderService.UpdateRptProducts(product);
                        if (updateProduct == 0)
                        {
                            throw new Exception("update product quantity error");
                        }
                        Price += product.Price * orderProduct.Quantity;
                        orderProducts.Add(new RptOrderProduct
                        {
                            ProductId = orderProduct.ProductId,
                            Quantity = orderProduct.Quantity,
                            Price = product.Price,
                            Cost = product.Cost,
                            Currency = product.Currency,
                            CostCurrency = product.CostCurrency,
                            ProductImages = product.ProductImages,
                            Name = product.Name
                        });
                    };

                    var PaymentLink = $"https://www.paypal.com/v2/checkout/orders/{addProductOrderRequest.PaymentCredentials}";
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
                    if (double.Parse(payment.Amount.Value) != Price || payment.Amount.CurrencyCode != "AUD")
                    {
                        throw new Exception("Payment Amount Mismatch");
                    }
                    // if (int.Parse(json.PurchaseUnits[0].ReferenceId) != transaction.ID)
                    // {
                    //     throw new Exception("Transaction ID Mismatch");
                    // }

                    var productOrder = new RptProductOrder
                    {
                        UserId = user.Id,
                        SellerId = addProductOrderRequest.SellerId,
                        SellerName = seller.UserName,
                        UserName = user.UserName,
                        Price = Price,
                        OrderDetail = addProductOrderRequest.OrderDetail,
                        Address = addProductOrderRequest.Address,
                        RptOrderProducts = orderProducts,
                        Currency = "AUD",
                        PaymentToken = addProductOrderRequest.PaymentCredentials,
                        RptProductOrderStatus = RptProductOrderStatusType.PENDING,
                        PaymentMethod = "PayPal",
                        CreatedDate = DateTime.Now,
                    };
                    var result = await this.productOrderService.AddRptProductOrder(productOrder);
                    if (result != "SUCCESS")
                    {
                        throw new Exception(result);
                    }
                    var Email = new Email(_clientFactory);
                    Email.sendMail("cvadreams@gmail.com", $"<h4>用户{user.UserName}购买积分商品订单成功；订单ID:{productOrder.ID}</h4>", $"新积分商品订单ID:{productOrder.ID}");
                    if (user.Email != null)
                    {
                        Email.sendMail(user.Email, $"<h4>积分商品购买成功；订单ID:{productOrder.ID}</h4>", $"您的积分商品订单ID:{productOrder.ID}购买成功，正在等待卖家发货");
                    }
                    if (seller.Email != null)
                    {
                        Email.sendMail(seller.Email, $"<h4>用户{user.UserName}购买积分商品订单成功；订单ID:{productOrder.ID}</h4>", $"新积分商品订单ID:{productOrder.ID}，请尽快发货");
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<RptProductOrder> { Status = "Success", Message = "Success", Data = productOrder });

                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(e) });
                }
            }
        }

        [Authorize]
        [HttpPost, Route("")]
        public async Task<IActionResult> AddOrder([FromBody] AddOrderRequest addOrderRequest)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
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
                    var areaClaim = await areaService.GetAreaClaimById(addOrderRequest.AreaClaimId);
                    if (user == null)
                    {
                        return Unauthorized();
                    }
                    if (areaClaim == null)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Invalid AreaClaimId", Data = null });
                    }
                    if (user.PayPasswordHash != addOrderRequest.PayPassword)
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Invalid PayPassword", Data = null });
                    }
                    if (addOrderRequest.PaymentType == "Rpt")
                    {
                        if ((user.Wallet.Rpt - user.Wallet.RptDebts) < areaClaim.Cva * 3)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Insufficient Available Rpt Balance(Rpt - RptDebts)", Data = null });
                        }
                    }
                    else
                    {
                        if (user.Wallet.Cva < areaClaim.Cva)
                        {
                            return StatusCode(StatusCodes.Status400BadRequest, new Response<string> { Status = "Fail", Message = "Insufficient Cva Balance", Data = null });
                        }
                    }
                    var REORDER_CONTROL = await this.configService.GetConfigStringValue("REORDER_CONTROL");
                    if (REORDER_CONTROL == "off")
                    {
                        var records = await this.areaService.GetAreaRecordsByUserIdAndAreaClaimId(user.Id, addOrderRequest.AreaClaimId);
                        if (records != null && records.Count > 0)
                        {
                            throw new Exception("无法重复购买该区，请联系管理员");
                        }
                    }
                    var order = new Order
                    {
                        CreatedDate = DateTime.Now,
                        Cva = areaClaim.Cva,
                        Cvt = areaClaim.Cvt,
                        Abg = areaClaim.Abg,
                        CvtCredit = areaClaim.Cvt * (areaClaim.Round - 1),
                        Msg = $"买入{areaClaim.Name}区域"
                    };
                    order.User = user;
                    var result = await orderService.AddOrder(order);
                    if (result == null)
                    {
                        return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = null });
                    }
                    var lights = new List<List<LightDto>>();
                    var light = new List<LightDto>();
                    light.Add(new LightDto
                    {
                        Type = "YELLOW"
                    });
                    lights.Add(light);
                    var areaRecord = new AreaRecord
                    {
                        Live = areaClaim.Round,
                        AreaClaimId = areaClaim.ID,
                        Lights = lights,
                        OrderId = order.ID,
                        Order = order,
                        UserId = user.Id,
                        User = user,
                        AreaClaim = areaClaim,
                        RoundNum = 1,
                        HistoryRecords = new List<HistoryRecord>(),
                    };
                    if (user.IsNewMember == false)
                    {
                        areaRecord.Type = "b";
                    }
                    else
                    {
                        areaRecord.Type = "a";
                    }
                    await areaService.AddAreaRecord(areaRecord);
                    user.IsNewMember = false;

                    var userResult = await userManager.UpdateAsync(user);
                    if (!userResult.Succeeded)
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(userResult.Errors) });
                    }

                    backgroundJobs.Enqueue(() => this.areaRecordHelperService.ProcessOrder(user.Id, areaClaim.ID, order.ID, addOrderRequest.PaymentType));
                    backgroundJobs.Enqueue(() => this.areaRecordHelperService.ValidateOrder(order.ID, user.Id, areaClaim.ID, areaRecord.ID));
                    if (areaClaim.ID >= 8)
                    {
                        for (int i = 1; i < areaClaim.ID; i++)
                        {
                            var rewardAreaClaim = await areaService.GetAreaClaimById(i);
                            var rewardOrder = new Order
                            {
                                CreatedDate = DateTime.Now,
                                Cva = 0,
                                Cvt = 0,
                                Abg = 0,
                                CvtCredit = 0,
                                Msg = $"{areaClaim.Name}买入，系统奖励{rewardAreaClaim.Name}区域"
                            };
                            rewardOrder.User = user;
                            var rewardResult = await orderService.AddOrder(rewardOrder);
                            if (rewardResult == null)
                            {
                                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = null });
                            }
                            var rewardLights = new List<List<LightDto>>();
                            var rewardLight = new List<LightDto>();
                            rewardLight.Add(new LightDto
                            {
                                Type = "YELLOW"
                            });
                            rewardLights.Add(rewardLight);
                            var rewardAreaRecord = new AreaRecord
                            {
                                Live = areaClaim.Round,
                                AreaClaimId = rewardAreaClaim.ID,
                                Lights = rewardLights,
                                OrderId = rewardOrder.ID,
                                Order = rewardOrder,
                                UserId = user.Id,
                                User = user,
                                AreaClaim = rewardAreaClaim,
                                RoundNum = 1,
                                HistoryRecords = new List<HistoryRecord>(),
                                Type = "b"
                            };
                            await areaService.AddAreaRecord(rewardAreaRecord);
                            backgroundJobs.Enqueue(() => this.areaRecordHelperService.ValidateOrder(rewardOrder.ID, user.Id, rewardAreaClaim.ID, rewardAreaRecord.ID));
                        }
                    }
                    scope.Complete();
                    return StatusCode(StatusCodes.Status200OK, new Response<Order> { Status = "Success", Message = "Success", Data = result });

                }
                catch (Exception e)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new Response<string> { Status = "Error", Message = JsonConvert.SerializeObject(e) });
                }
            }
        }

        [Authorize]
        [HttpGet, Route("")]
        public async Task<IActionResult> GetOrdersByUserId()
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var result = await orderService.GetOrdersByUserId(userIdClaim.Value);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Order>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Order>> { Status = "Success", Message = "Success", Data = result });
        }


        [Authorize]
        [HttpDelete, Route("{id}")]
        public async Task<IActionResult> DeleteOrderById(int id)
        {
            var result = await orderService.DeleteOrderById(id);
            if (result == null || result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<int?> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int?> { Status = "Success", Message = "Success", Data = result });
        }
    }
}
