using AutoMapper;
using Camino.Api.Auth;
using Camino.Api.Models.Error;
using Camino.Core.Caching;
using Camino.Core.Configuration;
using Camino.Core.DependencyInjection;
using Camino.Core.Infrastructure.Mapper;
using Camino.Data;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using NLog.Web;
using System.Reflection;
using System.Text;

namespace Camino.Api.Infrastructure.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureApplicationServices(this IServiceCollection services, WebApplicationBuilder builder)
        {
            var jwtConfig = services.ConfigureStartupConfig<JwtConfig>(builder.Configuration.GetSection("Jwt"));

            services.ConfigureStartupConfig<ResourcePathConfig>(builder.Configuration.GetSection("ResourcePath"));
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            //services.AddHttpContextAccessor();
            services.AddDbContext<CaminoObjectContext>(c => c.UseMySQL(builder.Configuration.GetConnectionString("MainConnection"),
                mySQLOptions =>
                {
                    //mySQLOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
                    mySQLOptions.CommandTimeout(80);
                }));

            //AddHangfire

            services.ConfigureAuth(jwtConfig);
            services.ConfigureAutoMapper();



            services.ConfigureStartupConfig<SmsConfig>(builder.Configuration.GetSection("Sms"));
            services.ConfigureStartupConfig<EmailConfig>(builder.Configuration.GetSection("Email"));

            services.AddDependencyInjection(nameof(Camino));
            services.AddMemoryCache();
            services.AddSingleton<IStaticCacheManager, MemoryCacheManager>();
            var mvcBuilder = services.AddControllers(o =>
            {
                o.SuppressAsyncSuffixInActionNames = false;
            });

            mvcBuilder.AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                    options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                    options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    //convert unicode
                    //options.SerializerSettings.Converters.Add(new ForWebApiTrimmingConverter());
                });

            services.AddFluentValidationAutoValidation(config =>
            {
                config.DisableDataAnnotationsValidation = true;
                config.ImplicitlyValidateChildProperties = true;
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Camino API", Version = "v1" });
                //c.AddSecurityDefinition("Bearer",
                //    new OpenApiSecurityScheme
                //    {
                //        In = ParameterLocation.Header,
                //        Description = "Please enter into field the word 'Bearer' following by space and JWT",
                //        Name = "Authorization",
                //        Type = SecuritySchemeType.ApiKey
                //    });
                //c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>> {{ "Bearer", Enumerable.Empty<string>() },});
                // Set the comments path for the Swagger JSON and UI.

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                            }
                        },
                        new string[]{}
                    }
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            // NLog: Setup NLog for Dependency injection
            builder.Logging.ClearProviders();
            builder.Host.UseNLog();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = (context) => throw new ValidationApiException(context.ModelState);
            });
            //services.AddWkhtmltopdf("Resource\\wkhtmltopdf");

        }

        public static void ConfigureAuth(this IServiceCollection services, JwtConfig jwtConfig)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtConfig.SecretKey));

            // Configure JwtIssuerOptions
            services.Configure<JwtIssuerOptions>(options =>
            {
                options.InternalIssuer = jwtConfig.InternalIssuer;
                options.PortalIssuer = jwtConfig.PortalIssuer;
                options.Audience = jwtConfig.Audience;
                options.SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            });
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuers = new[] { jwtConfig.InternalIssuer, jwtConfig.PortalIssuer },

                ValidateAudience = true,
                ValidAudience = jwtConfig.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                RequireExpirationTime = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configureOptions =>
            {
                configureOptions.ClaimsIssuer = jwtConfig.InternalIssuer;
                configureOptions.TokenValidationParameters = tokenValidationParameters;
                configureOptions.SaveToken = true;
                configureOptions.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });
        }

        public static void ConfigureAutoMapper(this IServiceCollection services)
        {
            var typeMappingProfiles = Assembly.GetExecutingAssembly().GetTypes()
                .Where(type => type.BaseType == typeof(Profile));
            var mappingConfig = new MapperConfiguration(mc =>
            {
                foreach (var t in typeMappingProfiles)
                {
                    mc.AddProfile(t);
                }
            });

            //register
            AutoMapperConfiguration.Init(mappingConfig);

            //IMapper mapper = mappingConfig.CreateMapper();
            //services.AddSingleton(mapper);
            //AutoMapperExtension.Mapper = mapper;
        }

        public static TConfig ConfigureStartupConfig<TConfig>(this IServiceCollection services, IConfiguration configuration) where TConfig : class, new()
        {
            if (services == null)
                throw new ArgumentNullException(nameof(services));

            if (configuration == null)
                throw new ArgumentNullException(nameof(configuration));

            //create instance of config
            var config = new TConfig();

            //bind it to the appropriate section of configuration
            configuration.Bind(config);

            //and register it as a service
            services.AddSingleton(config);

            return config;
        }
    }
}
