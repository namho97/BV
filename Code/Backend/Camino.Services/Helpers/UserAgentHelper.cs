using Camino.Core;
using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.AspNetCore.Http;

namespace Camino.Services.Helpers
{
    [ScopedDependency(ServiceType = typeof(IUserAgentHelper))]
    public class UserAgentHelper : IUserAgentHelper
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserAgentHelper(IHttpContextAccessor httpContextAccessor
            )
        {
            _httpContextAccessor = httpContextAccessor;
        }
        public LanguageType GetUserLanguage()
        {
            var languageHeader = _httpContextAccessor.HttpContext?.Request.Headers["Language"];
            if (languageHeader.HasValue && !string.IsNullOrEmpty(languageHeader.ToString()) && int.TryParse(languageHeader.ToString(), out var ngonngu))
            {
                return (LanguageType)ngonngu;
            }
            return LanguageType.VietNam;
        }
        public UserType GetCurrentUserType()
        {
            var userTypeHeader = _httpContextAccessor.HttpContext?.Request.Headers["UserType"];
            if (userTypeHeader.HasValue && !string.IsNullOrEmpty(userTypeHeader.ToString()) && int.TryParse(userTypeHeader.ToString(), out var userType))
            {
                return (UserType)userType;
            }
            return UserType.BacSiGiaDinh;
        }
        public long GetCurrentUserId()
        {
            var userIdClaim = _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(o => o.Type == CaminoConstants.JwtClaimTypes.Id);
            if (userIdClaim != null && !string.IsNullOrEmpty(userIdClaim.Value))
            {

                return long.Parse(userIdClaim.Value);
            }
            return CaminoConstants.DefaultSystemUserId;
        }

        public List<long> GetListCurrentUserRoleId()
        {
            var userRoleClaim = _httpContextAccessor.HttpContext?.User.Claims.FirstOrDefault(o => o.Type == CaminoConstants.JwtClaimTypes.Role);

            var result = new List<long>();

            if (userRoleClaim != null && !string.IsNullOrEmpty(userRoleClaim.Value))
            {
                if (userRoleClaim.Value.Contains(","))
                {
                    var lstIdString = userRoleClaim.Value.Split(",");
                    foreach (var idString in lstIdString)
                    {
                        result.Add(long.Parse(idString));
                    }
                }
                else
                {
                    result.Add(long.Parse(userRoleClaim.Value));
                }
            }

            return result;
        }

    }
}
