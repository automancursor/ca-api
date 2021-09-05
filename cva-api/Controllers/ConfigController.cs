


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
    public class ConfigController : ControllerBase
    {
        IConfigService configService;
        private readonly AWSHelper AWSHelper;
        private readonly IConfiguration _configuration;

        public ConfigController(IConfigService configService, IConfiguration configuration)
        {
            this.configService = configService;
            _configuration = configuration;
            this.AWSHelper = new AWSHelper(configuration);
        }

    
        [HttpGet, Route("")]
        public async Task<IActionResult> GetConfigs()
        {
            var result = await configService.GetConfigs();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<Config>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<Config>> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("")]
        public async Task<IActionResult> UpdateConfig([FromBody] Config config)
        {
            var result = await configService.UpdateConfig(config);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        
        [HttpGet, Route("media")]
        public async Task<IActionResult> GetMediaConfigs()
        {
            var result = await configService.GetMediaConfigs();
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<List<MediaConfig>> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<List<MediaConfig>> { Status = "Success", Message = "Success", Data = result });
        }
        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("")]
        public async Task<IActionResult> AddConfig([FromBody] Config config)
        {
            var result = await configService.AddConfig(config);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<Config> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<Config> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut, Route("media")]
        public async Task<IActionResult> UpdateConfigImage([FromForm] UpdateConfigRequest updateConfigRequest)
        {
            var links = "";
            if (updateConfigRequest.Images != null)
            {
                foreach (var file in updateConfigRequest.Images)
                {
                    var filePath = $"mediaConfig/{updateConfigRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links = $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}";
                }
            }

            var config = new MediaConfig
            {
                Name = updateConfigRequest.Name,
                Description = updateConfigRequest.Description
            };
            if (links != "")
            {
                config.Value = links;
            }
            var result = await configService.UpdateMediaConfig(config);
            if (result == 0)
            {
                return StatusCode(StatusCodes.Status404NotFound, new Response<int> { Status = "Not Found", Message = "Not Found", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<int> { Status = "Success", Message = "Success", Data = result });
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost, Route("media")]
        public async Task<IActionResult> AddConfigImage([FromForm] UpdateConfigRequest updateConfigRequest)
        {
            var links = "";
            if (updateConfigRequest.Images != null)
            {
                foreach (var file in updateConfigRequest.Images)
                {
                    var filePath = $"mediaConfig/{updateConfigRequest.Name}/{file.FileName}";
                    await this.AWSHelper.UploadObjectFromFileAsync(filePath, file);
                    links = $"https://cva-api.s3-ap-southeast-2.amazonaws.com/{filePath}";
                }
            }
            var config = new MediaConfig
            {
                Name = updateConfigRequest.Name,
                Value = links,
                Description = updateConfigRequest.Description
            };
            var result = await configService.AddMediaConfig(config);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response<MediaConfig> { Status = "Bad Request", Message = "Bad Request", Data = result });
            }
            return StatusCode(StatusCodes.Status200OK, new Response<MediaConfig> { Status = "Success", Message = "Success", Data = result });
        }


    }
}