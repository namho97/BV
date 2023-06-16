using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Services.Helpers
{
    public interface IUserAgentHelper
    {
        LanguageType GetUserLanguage();
        UserType GetCurrentUserType();
        long GetCurrentUserId();
        List<long> GetListCurrentUserRoleId();
    }
}
