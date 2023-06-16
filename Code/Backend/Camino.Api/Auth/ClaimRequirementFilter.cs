using Camino.Core;
using Camino.Core.Domain;
using Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Camino.Api.Auth
{
    public class ClaimRequirementFilter : IAuthorizationFilter
    {
        readonly DocumentType[] _documentTypes;
        readonly SecurityOperation _securityOperation;
        readonly IRoleService _roleService;

        public ClaimRequirementFilter(IRoleService roleService, DocumentType[] documentTypes, SecurityOperation securityOperation)
        {
            _documentTypes = documentTypes;
            _securityOperation = securityOperation;
            _roleService = roleService;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var rolClaim = context.HttpContext.User.Claims.FirstOrDefault(o => o.Type == CaminoConstants.JwtClaimTypes.Role);

            if (rolClaim == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            var roleIds = rolClaim.Value.Split(CaminoConstants.JwtRoleSeparator).Select(long.Parse).ToArray();
            if (!_roleService.VerifyAccess(roleIds, _documentTypes, _securityOperation))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
