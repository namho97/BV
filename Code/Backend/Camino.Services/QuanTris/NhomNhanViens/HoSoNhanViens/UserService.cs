using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Data;
using Camino.Services.Helpers;
using Camino.Services.Localization;
using Microsoft.EntityFrameworkCore;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    [ScopedDependency(ServiceType = typeof(IUserService))]
    public class UserService : MasterFileService<User>, IUserService
    {
        private readonly ILocalizationService _localizationService;
        private readonly IEncryptionService _encryptionService;
        readonly IUserAgentHelper _userAgentHelper;
        IRepository<NhanVien> _nhanVienRepository;
        public UserService(IRepository<User> repository, ILocalizationService localizationService, IEncryptionService encryptionService,
            IUserAgentHelper userAgentHelper, IRepository<NhanVien> nhanVienRepository) : base(repository)
        {
            _localizationService = localizationService;
            _encryptionService = encryptionService;
            _userAgentHelper = userAgentHelper;
            _nhanVienRepository = nhanVienRepository;
        }

        public async Task<User> GetCurrentUser()
        {
            return await BaseRepository.Table.FirstOrDefaultAsync(o => o.Id == _userAgentHelper.GetCurrentUserId());
        }

        public async Task<User> GetUserByPhoneNumberOrEmail(string phoneNumberOrEmail, RegionType region)
        {
            var user = await BaseRepository.Table.Include(o => o.NhanVien).ThenInclude(o => o.NhanVienRoles).FirstOrDefaultAsync(o => o.IsActive == true && (o.SoDienThoai == phoneNumberOrEmail || o.Email == phoneNumberOrEmail) && (o.Region == RegionType.All || o.Region == region));

            return user;
        }
        public async Task<User> GetUserByPassCode(string phoneNumberOrEmail, string passCode, RegionType region)
        {
            var user = await BaseRepository.Table.Include(o => o.NhanVien).FirstOrDefaultAsync(o => o.IsActive == true && (o.SoDienThoai == phoneNumberOrEmail || o.Email == phoneNumberOrEmail) && o.PassCode == passCode && (o.Region == RegionType.All || o.Region == region));

            return user;
        }

        public async Task<User> GetUserByPhoneNumberOrEmailAndPassword(string phoneNumberOrEmail, string password, RegionType region)
        {
            var user = await BaseRepository.Table.FirstOrDefaultAsync(o => o.IsActive == true && (o.SoDienThoai == phoneNumberOrEmail || o.Email == phoneNumberOrEmail) && (o.Region == RegionType.All || o.Region == region));

            if (user != null && (string.IsNullOrEmpty(user.Password) || _encryptionService.VerifyHashedPassword(user.Password, password)))
            {
                //BaseRepository.Context.Entry(user).Reference(b => b.NhanVien).Query().Include(o=>o.NhanVienRoles).ThenInclude(o=>o.Role).Load();
                //BaseRepository.Context.Entry(user).Collection(b => b.Quays).Load();
                return user;
            }
            return null;
        }

        public async Task<User> GetUserByPhoneAndPassCode(string phone, string passCode)
        {
            var user = await BaseRepository.Table.FirstOrDefaultAsync(o => o.SoDienThoai == phone);

            if (user != null && passCode == "1111")
            {
                return user;
            }
            return null;
        }
        public async Task<ICollection<User>> GetUserAfter(long after, int limit, string searchString)
        {
            return await BaseRepository.TableNoTracking.OrderByDescending(o => o.Id).Where(o => after == 0 || o.Id < after)
                .Take(limit).ToArrayAsync();
        }

        public async Task<bool> CheckIsExistPhone(string sdt, RegionType region, long id = 0)
        {
            bool result;
            if (id == 0)
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.SoDienThoai.Equals(sdt) && p.Region == region);

            }
            else
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.SoDienThoai.Equals(sdt) && p.Id != id && p.Region == region);
            }
            if (result)
                return false;
            return true;
        }

        public async Task<bool> CheckIsExistEmail(string email, RegionType region, long id = 0)
        {
            bool result;
            if (id == 0)
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Email.Equals(email) && p.Email != "" && p.Email != null && p.Region == region);

            }
            else
            {
                result = await BaseRepository.TableNoTracking.AnyAsync(p => p.Email.Equals(email) && p.Id != id && p.Email != "" && p.Email != null && p.Region == region);
            }
            if (result)
                return false;
            return true;
        }

        public List<int> GetUserTypesByUserId(long userId)
        {
            return null;
        }

        public async Task<User?> GetUserByPhoneNumberAndEmail(string phoneNumber, string email, RegionType region)
        {
            var entity =
                await BaseRepository.TableNoTracking.FirstOrDefaultAsync(p =>
                    p.SoDienThoai == phoneNumber && p.Email == email && p.Region == region);
            return entity;
        }

        public async Task<long[]> GetRoles(long userId, RegionType region, UserType userType)
        {
            switch (region)
            {
                case RegionType.Internal:
                    return await _nhanVienRepository.TableNoTracking.Include(o => o.NhanVienRoles)
                        .Where(o => o.Id == userId)
                        .SelectMany(o => o.NhanVienRoles.Where(p => p.Role != null && (p.Role.UserType == UserType.TatCa || p.Role.UserType == userType)).Select(nvr => nvr.RoleId)).ToArrayAsync();

            }

            return new long[0];
        }
        public async Task<List<LookupItemTextVo>> GetLookupAsync()
        {
            return await _nhanVienRepository.TableNoTracking.Select(o => new LookupItemTextVo()
            {
                KeyId = o.Id.ToString(),
                DisplayName = o.User.HoTen
            }).ToListAsync();
        }


        public async Task<User> ValidateUser(string username, string password)
        {
            var user = await BaseRepository.Table.FirstOrDefaultAsync(o => o.SoDienThoai == username);
            if (user != null && !string.IsNullOrEmpty(user.Password) && _encryptionService.VerifyHashedPassword(user.Password, password))
            {
                return user;
            }
            return null;
        }


        public async Task<User> ValidatePassword(string password)
        {
            var user = await BaseRepository.Table.Include(o => o.NhanVien).FirstOrDefaultAsync(o => o.Id == _userAgentHelper.GetCurrentUserId());
            if (user != null && !string.IsNullOrEmpty(user.Password) && _encryptionService.VerifyHashedPassword(user.Password, password))
            {
                return user;
            }
            return null;
        }

        public async Task<bool> ValidateStatus(int id)
        {
            return await BaseRepository.TableNoTracking.AnyAsync(o => o.Id == id && o.IsActive);
        }
    }
}
