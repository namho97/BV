using Camino.Api.Models.Error;
using Camino.Services.Localization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net;

namespace Camino.Api.CustomMiddleware
{
    public class CustomExceptionMiddleware
    {
        private const string JsonContentType = "application/json";
        private readonly RequestDelegate _next;
        private readonly ILogger<CustomExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public CustomExceptionMiddleware(RequestDelegate next, ILogger<CustomExceptionMiddleware> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _next = next;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext httpContext, ILocalizationService localizationService)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                await HandleExceptionAsync(httpContext, ex, _env, localizationService);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception, IWebHostEnvironment env, ILocalizationService localizationService)
        {
            context.Response.ContentType = JsonContentType;
            if (exception is ApiException ex)
            {
                // handle explicit 'known' API errors
                //context.Exception = null;
                context.Response.StatusCode = ex.StatusCode;
                string jsonString = JsonConvert.SerializeObject(new ApiError(ex));
                return context.Response.WriteAsync(jsonString);
            }
            else if (exception is UnauthorizedAccessException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                string jsonString = JsonConvert.SerializeObject(new ApiError(localizationService.GetResource("ApiError.Unauthorized")));
                return context.Response.WriteAsync(jsonString);
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                var apiError = TranslateException(exception, localizationService);
                if (env.IsDevelopment())
                {
                    string jsonString = JsonConvert.SerializeObject(apiError ?? new ApiError(exception.GetBaseException().Message, exception.StackTrace));
                    return context.Response.WriteAsync(jsonString);
                }
                else
                {
                    string jsonString = JsonConvert.SerializeObject(apiError ?? new ApiError(localizationService.GetResource("ApiError.UnknownError")));
                    return context.Response.WriteAsync(jsonString);
                }
            }
        }

        private static ApiError? TranslateException(Exception exception, ILocalizationService localizationService)
        {
            if (exception is DbUpdateConcurrencyException)
            {
                return new ApiError(localizationService.GetResource("ApiError.ConcurrencyError"));
            }
            if (exception is DbUpdateException)
            {
                if (exception.InnerException != null && exception.InnerException.Message.Contains("The DELETE statement conflicted with the REFERENCE constraint"))
                {
                    return new ApiError(localizationService.GetResource("ApiError.DeleteConflictedError"));
                }
            }
            if (!string.IsNullOrEmpty(exception.Message) && exception.Message.Contains("Value cannot be null.") && exception.Message.Contains("Parameter name: entity"))
            {
                return new ApiError(localizationService.GetResource("ApiError.EntityNull"));
            }
            return null;
        }
    }
}
