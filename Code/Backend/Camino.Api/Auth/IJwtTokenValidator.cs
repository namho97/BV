using System.Security.Claims;

namespace Camino.Api.Auth
{
    public interface IJwtTokenValidator
    {
        ClaimsPrincipal? GetPrincipalFromToken(string token, string signingKey, bool checkExpired = false);
    }
}
