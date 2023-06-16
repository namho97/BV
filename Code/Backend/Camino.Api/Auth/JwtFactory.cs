using Camino.Core;
using Camino.Core.DependencyInjection.Attributes;
using Microsoft.Extensions.Options;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Camino.Api.Auth
{
    [SingletonDependency(ServiceType = typeof(IJwtFactory))]
    public class JwtFactory : IJwtFactory
    {
        private readonly IJwtTokenHandler _jwtTokenHandler;
        private readonly JwtIssuerOptions _jwtOptions;

        public JwtFactory(IJwtTokenHandler jwtTokenHandler, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _jwtTokenHandler = jwtTokenHandler;
            _jwtOptions = jwtOptions.Value;
        }

        public AccessToken GenerateInternalToken(long id, params long[] roleId)
        {
            var claims = new[]
            {
                new Claim(CaminoConstants.JwtClaimTypes.Id, id.ToString()),
                new Claim(CaminoConstants.JwtClaimTypes.Role, string.Join(CaminoConstants.JwtRoleSeparator, roleId))
            };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                _jwtOptions.InternalIssuer,
                _jwtOptions.Audience,
                claims,
                _jwtOptions.NotBefore,
                _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials);

            return new AccessToken(id, _jwtTokenHandler.WriteToken(jwt), (int)_jwtOptions.ValidFor.TotalSeconds);
        }
        public AccessToken GeneratePortalToken(long id)
        {
            var claims = new[]
            {
                new Claim(CaminoConstants.JwtClaimTypes.Id, id.ToString())
            };

            // Create the JWT security token and encode it.
            var jwt = new JwtSecurityToken(
                _jwtOptions.PortalIssuer,
                _jwtOptions.Audience,
                claims,
                _jwtOptions.NotBefore,
                _jwtOptions.Expiration,
                _jwtOptions.SigningCredentials);

            return new AccessToken(id, _jwtTokenHandler.WriteToken(jwt), (int)_jwtOptions.ValidFor.TotalSeconds);
        }
    }
}
