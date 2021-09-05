using System.Collections.Generic;
using System.Threading.Tasks;
using cva_api.Model;
using cva_api.Model.RequestPayload;
using cva_api.Module;
using cva_api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace cva_api.Controllers
{
    [Route("[controller]")]
    [ApiController]

     
    public class AreaRecordController : ControllerBase
    {

        private readonly IConfiguration _configuration;
       
        IAreaService areaService;
        private readonly JWTHelper _jwtHelper;

        public AreaRecordController(IAreaService areaService, IConfiguration configuration)
        {      
            this.areaService = areaService;    
            _configuration = configuration;
            _jwtHelper = new JWTHelper(configuration);
        }
        
        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("records")]
        public async Task<IActionResult> GetAreaRecords()
        {
            var result = await areaService.GetAreaRecords();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<AreaRecord>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<AreaRecord>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("records")]
        public async Task<IActionResult> UpdateAreaClaims([FromBody] UpdateAreaRecord updateAreaRecord)
        {
            var result = await areaService.UpdateAreaRecord(updateAreaRecord);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpGet, Route("histories")]
        public async Task<IActionResult> GetAreaHistories()
        {
            var result = await areaService.GetAreaHistories();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<AreaHistory>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<AreaHistory>> { Status = "Success", Message = "Success", Data = result });
        }

        [HttpGet, Route("claims")]
        public async Task<IActionResult> GetAreaClaims()
        {
            var result = await areaService.GetAreaClaims();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<AreaClaim>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<AreaClaim>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("claims")]
        public async Task<IActionResult> UpdateAreaClaims([FromBody] UpdateAreaClaimPayload areaClaim)
        {
            var result = await areaService.UpdateAreaClaims(areaClaim);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("records/{id}")]
        public async Task<IActionResult> GetAreaRecordsByUserId(string id)
        {
            var result = await areaService.GetAreaRecordsByUserId(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<AreaRecord>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<AreaRecord>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize]
        [HttpGet, Route("histories/{id:int}")]
        public async Task<IActionResult> GetAreaHistoriesByOrderId(int id)
        {
            var result = await areaService.GetAreaHistoriesByOrderId(id);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<AreaHistory>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<AreaHistory>> { Status = "Success", Message = "Success", Data = result });
        }


    }
}