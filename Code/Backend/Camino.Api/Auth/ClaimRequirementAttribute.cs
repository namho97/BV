using Camino.Core.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Auth
{
    public class ClaimRequirementAttribute : TypeFilterAttribute
    {
        public ClaimRequirementAttribute(SecurityOperation securityOperation, params DocumentType[] documentTypes) : base(typeof(ClaimRequirementFilter))
        {
            Arguments = new object[] { documentTypes, securityOperation };
        }
    }
}
