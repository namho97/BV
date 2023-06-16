using Camino.Core.DependencyInjection.Attributes;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace Camino.Api.Auth
{
    [SingletonDependency(ServiceType = typeof(IJwtTokenValidator))]
    public class JwtTokenValidator : IJwtTokenValidator
    {
        private readonly IJwtTokenHandler _jwtTokenHandler;

        public JwtTokenValidator(IJwtTokenHandler jwtTokenHandler)
        {
            _jwtTokenHandler = jwtTokenHandler;
        }

        public ClaimsPrincipal? GetPrincipalFromToken(string token, string signingKey, bool checkExpired = false)
        {
            return _jwtTokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey)),
                ValidateLifetime = checkExpired
            });
        }
    }
}
