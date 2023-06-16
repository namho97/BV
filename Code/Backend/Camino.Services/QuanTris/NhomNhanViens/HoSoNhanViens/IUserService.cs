using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public interface IUserService : IMasterFileService<User>
    {
        Task<User> GetUserByPhoneNumberOrEmail(string phoneNumberOrEmail, RegionType region);
        Task<User> GetUserByPassCode(string phoneNumberOrEmail, string passCode, RegionType region);
        Task<User> GetUserByPhoneNumberOrEmailAndPassword(string phoneNumberOrEmail, string password, RegionType region);
        Task<User> GetUserByPhoneAndPassCode(string phone, string passCode);
        Task<ICollection<User>> GetUserAfter(long after, int limit, string searchString);
        Task<User> GetCurrentUser();
        Task<bool> CheckIsExistEmail(string email, RegionType region, long id = 0);
        Task<bool> CheckIsExistPhone(string sdt, RegionType region, long id = 0);
        List<int> GetUserTypesByUserId(long userId);
        Task<User?> GetUserByPhoneNumberAndEmail(string phoneNumber, string email, RegionType region);
        Task<long[]> GetRoles(long userId, RegionType region, UserType userType);
        Task<List<LookupItemTextVo>> GetLookupAsync();
        Task<User> ValidateUser(string username, string password);
        Task<User> ValidatePassword(string password);
        Task<bool> ValidateStatus(int id);
    }
}
