using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using cva_api.Model;
using cva_api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;
using cva_api.Service;
using Twilio;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Hangfire;
using Hangfire.Redis;
using Hangfire.Dashboard;

namespace cva_api
{

    public class validEnumConverter : StringEnumConverter
    {
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (!Enum.IsDefined(objectType, reader.Value))
            {
                throw new ArgumentException("Invalid enum value");
            }

            return base.ReadJson(reader, objectType, existingValue, serializer);
        }
    }
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpClient();
            services.AddHangfire(configuration => configuration
                    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                    .UseSimpleAssemblyNameTypeSerializer()
                    .UseRecommendedSerializerSettings()
                    .UseRedisStorage(
                        Configuration["Redis:Default"],
                        new RedisStorageOptions { Prefix = "{cva-api}:" })
            );
            // Add the processing server as IHostedService
            services.AddHangfireServer(
                option =>
                {
                    option.ServerName = "CVA_REWARD";
                    option.WorkerCount = 1;
                    option.Queues = new[] { "reward" };
                }
            );

            services.AddControllers().AddNewtonsoftJson(
                options =>
                {
                    options.SerializerSettings.Converters.Add(new validEnumConverter());
                }
            );
            services.AddCors();
            services.AddMemoryCache();



            var accountSid = Configuration["Twilio:AccountSID"];
            var authToken = Configuration["Twilio:AuthToken"];
            TwilioClient.Init(accountSid, authToken);

            string mySqlConnectionStr = Configuration.GetConnectionString("Default");
            services.AddDbContext<SqlContext>(options =>
            {
                options.UseMySql(mySqlConnectionStr);
                options.EnableSensitiveDataLogging();

            }, ServiceLifetime.Scoped
                );



            // For Identity  
            services.AddIdentity<User, IdentityRole>(options =>
            {

            })
                .AddEntityFrameworkStores<SqlContext>()
                .AddDefaultTokenProviders();



            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IConfigService, ConfigService>();
            services.AddScoped<ITwilioService, TwilioService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IAreaService, AreaService>();
            services.AddScoped<IAreaRecordHelperService, AreaRecordHelperService>();
            services.AddScoped<IProductOrderService, ProductOrderService>();

            // Adding Authentication  
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })

            // Adding Jwt Bearer  
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
                };
            });



        }
        public class DashboardNoAuthorizationFilter : IDashboardAuthorizationFilter
        {
            public bool Authorize(DashboardContext dashboardContext)
            {
                return true;
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHangfireDashboard("/hangfire", new DashboardOptions
            {
                Authorization = new[] { new DashboardNoAuthorizationFilter() }
            });

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHangfireDashboard();
            });
        }
    }
}