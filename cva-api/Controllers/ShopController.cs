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

namespace cva_api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
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
        private readonly AWSHelper AWSHelper;
        private readonly JWTHelper _jwtHelper;


        public ShopController(IHttpClientFactory clientFactory, IProductOrderService productOrderService, IAreaService areaService, IConfigService configService, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IOrderService orderService, IUserService userService, IBackgroundJobClient backgroundJobs, IAreaRecordHelperService areaRecordHelperService)
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
            this.AWSHelper = new AWSHelper(configuration);
        }

        [HttpGet, Route("product/all")]
        public async Task<IActionResult> GetProducts()
        {   
            var result = await productOrderService.GetProducts();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Product>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Product>> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("rptProduct/all")]
        public async Task<IActionResult> GetRptProducts()
        {   
            var result = await productOrderService.GetRptProducts();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<RptProduct>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProduct>> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("product/category/{categoryId}")]
        public async Task<IActionResult> GetProductsByCategoryId(int categoryId)
        {   
            var result = await productOrderService.GetProductsByCategoryId(categoryId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Product>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Product>> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("rptProduct/category/{categoryId}")]
        public async Task<IActionResult> GetRptProductsByCategoryId(int categoryId)
        {   
            var result = await productOrderService.GetRptProductsByCategoryId(categoryId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<RptProduct>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProduct>> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("product/{productId}")]
        public async Task<IActionResult> GetProductsById(int productId)
        {   
            var result = await productOrderService.GetProduct(productId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<Product> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<Product> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("rptProduct/{productId}")]
        public async Task<IActionResult> GetRptProductsById(int productId)
        {   
            var result = await productOrderService.GetRptProduct(productId);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<RptProduct> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<RptProduct> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpDelete, Route("product/{productId}")]
        public async Task<IActionResult> DeleteProductsById(int productId)
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var product = await productOrderService.GetProduct(productId);
            if (product == null ||product.UserId!= userIdClaim?.Value)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<Product> { Status = "Not Found", Message = "Not Found", Data = product });
            }
            var result = await productOrderService.DeleteProduct(product);
            if(result ==0){
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpDelete, Route("rptProduct/{productId}")]
        public async Task<IActionResult> DeleteRptProductsById(int productId)
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var product = await productOrderService.GetRptProduct(productId);
            if (product == null ||product.UserId!= userIdClaim?.Value)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<RptProduct> { Status = "Not Found", Message = "Not Found", Data = product });
            }
            var result = await productOrderService.DeleteRptProduct(product);
            if(result ==0){
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("product")]
        public async Task<IActionResult> GetProductsByUser()
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var result = await productOrderService.GetProductsByUserId(userIdClaim.Value);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Product>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Product>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("rptProduct")]
        public async Task<IActionResult> GetRptProductsByUser()
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var result = await productOrderService.GetRptProductsByUserId(userIdClaim.Value);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<RptProduct>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<RptProduct>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpPut, Route("product")]
        public async Task<IActionResult> UpdateProduct([FromForm] UpdateProductRequest updateProductRequest)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var product = await productOrderService.GetProduct(updateProductRequest.ID);
            if(product == null){
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || product.UserId != user.Id)
            {
                return Unauthorized();
            }
            
            if (updateProductRequest.ProductImages != null)
            {
                var links = "";
                foreach (var file in updateProductRequest.ProductImages)
                {
                    var filePath = $"shop/products/{user.Id}/{updateProductRequest.CategoryId}/{updateProductRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                product.ProductImages = links;
    
            }
            product.Address = updateProductRequest.Address;
            product.Name = updateProductRequest.Name;
            product.Quantity = updateProductRequest.Quantity;
            product.ProductDescription = updateProductRequest.ProductDescription;
            product.ProductStatus = updateProductRequest.ProductStatus;
            if(updateProductRequest.Cvt != null){
                product.Cvt =  (double) updateProductRequest.Cvt ;
                product.CvtPrice = (double) updateProductRequest.Cvt * 3;
            }

            var result = await productOrderService.UpdateProducts(product);
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var updatedProduct = await productOrderService.GetProduct(updateProductRequest.ID);
            return StatusCode(StatusCodes.Status200OK, new Response<Product> { Status = "Success", Message = "Success", Data = updatedProduct });
        }

        [Authorize]
        [HttpPut, Route("rptProduct")]
        public async Task<IActionResult> UpdateRptProduct([FromForm] UpdateRptProductRequest updateProductRequest)
        {
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var product = await productOrderService.GetRptProduct(updateProductRequest.ID);
            if(product == null){
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || product.UserId != user.Id)
            {
                return Unauthorized();
            }
            
            if (updateProductRequest.ProductImages != null)
            {
                var links = "";
                foreach (var file in updateProductRequest.ProductImages)
                {
                    var filePath = $"shop/rptProducts/{user.Id}/{updateProductRequest.CategoryId}/{updateProductRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                product.ProductImages = links;
    
            }
            product.Address = updateProductRequest.Address;
            product.Name = updateProductRequest.Name;
            product.Quantity = updateProductRequest.Quantity;
            product.Currency = updateProductRequest.Currency;
            product.CostCurrency = updateProductRequest.CostCurrency;
            product.ProductDescription = updateProductRequest.ProductDescription;
            product.ProductStatus = updateProductRequest.ProductStatus;
            if(updateProductRequest.Price != null){
                product.Price =  (double) updateProductRequest.Price ;   
            }
            if(updateProductRequest.Cost != null){
                product.Cost =  (double) updateProductRequest.Cost ;   
            }

            var result = await productOrderService.UpdateRptProducts(product);
            if (result <= 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = "FAILED" });
            }
            var updatedProduct = await productOrderService.GetRptProduct(updateProductRequest.ID);
            return StatusCode(StatusCodes.Status200OK, new Response<RptProduct> { Status = "Success", Message = "Success", Data = updatedProduct });
        }

        [Authorize]
        [HttpPost, Route("product")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductRequest addProductRequest)
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || user.SellerVerified == false)
            {
                return Unauthorized();
            }
            var product = new Product(){
                UserId = user.Id,
                UserName = user.UserName,
                CompanyName = user.CompanyName,
                Name  = addProductRequest.Name,
                Cvt = addProductRequest.Cvt,
                CvtPrice = addProductRequest.Cvt * 3,
                CategoryId = addProductRequest.CategoryId,
                ProductDescription = addProductRequest.Name,
                Address = addProductRequest.Address,
                Quantity = addProductRequest.Quantity,
                ProductStatus = ProductStatusType.ACTIVE,
                CreatedDate = DateTime.Now
            };
            if (addProductRequest.ProductImages != null)
            {
                var links = "";
                foreach (var file in addProductRequest.ProductImages)
                {
                    var filePath = $"shop/products/{user.Id}/{addProductRequest.CategoryId}/{addProductRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                product.ProductImages = links;
            }
            var result = await productOrderService.AddProduct(product);
            if (result != "SUCCESS")
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<Product> { Status = "Success", Message = "Success", Data = product });
        }

        [Authorize]
        [HttpPost, Route("rptProduct")]
        public async Task<IActionResult> AddRptProduct([FromForm] AddRptProductRequest addProductRequest)
        {   
            string token = Request.Headers[HeaderNames.Authorization];
            var userIdClaim = _jwtHelper.GetUserData(token.Split(" ")[1], ClaimTypes.UserData);
            if (string.IsNullOrEmpty(userIdClaim?.Value))
            {
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(userIdClaim?.Value);
            if (user == null || user.SellerVerified == false)
            {
                return Unauthorized();
            }
            var product = new RptProduct(){
                UserId = user.Id,
                UserName = user.UserName,
                CompanyName = user.CompanyName,
                Name  = addProductRequest.Name,
                Price = addProductRequest.Price,
                Currency = addProductRequest.Currency,
                Cost = addProductRequest.Cost,
                CostCurrency = addProductRequest.CostCurrency,
                CategoryId = addProductRequest.CategoryId,
                ProductDescription = addProductRequest.Name,
                Address = addProductRequest.Address,
                Quantity = addProductRequest.Quantity,
                ProductStatus = ProductStatusType.ACTIVE,
                CreatedDate = DateTime.Now
            };
            if (addProductRequest.ProductImages != null)
            {
                var links = "";
                foreach (var file in addProductRequest.ProductImages)
                {
                    var filePath = $"shop/rptProducts/{user.Id}/{addProductRequest.CategoryId}/{addProductRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                product.ProductImages = links;
            }
            var result = await productOrderService.AddRptProduct(product);
            if (result != "SUCCESS")
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<RptProduct> { Status = "Success", Message = "Success", Data = product });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("category")]
        public async Task<IActionResult> AddCategory([FromForm] AddCategoryRequest addCategoryRequest)
        {   
            var category = new Category(){
                Name = addCategoryRequest.Name,
                Description = addCategoryRequest.Description
            };
            if (addCategoryRequest.CategoryImages != null)
            {
                var links = "";
                foreach (var file in addCategoryRequest.CategoryImages)
                {
                    var filePath = $"shop/categories/{addCategoryRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links += $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}&&";
                }
                category.CategoryImage = links;
            }
            var result = await productOrderService.AddCategory(category);
            if (result != "SUCCESS")
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<string> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<Category> { Status = "Success", Message = "Success", Data = category });
        }
        [HttpGet, Route("category")]
        public async Task<IActionResult> GetCategories()
        {   
            var result = await productOrderService.GetCategories();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Category>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Category>> { Status = "Success", Message = "Success", Data = result });
        }
    }
}
