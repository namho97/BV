using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Data;
using Camino.Data.Extensions;
using Camino.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens
{
    [ScopedDependency(ServiceType = typeof(INhanVienService))]
    public class NhanVienService : MasterFileService<NhanVien>, INhanVienService
    {
        private readonly IRepository<NhanVien> _repository;
        private readonly IUserAgentHelper _userAgentHelper;

        public NhanVienService(IUserAgentHelper userAgentHelper, IRepository<NhanVien> repository
            ) : base(repository)
        {
            _repository = repository;
            _userAgentHelper = userAgentHelper;
        }
        public async Task<GridDataSource> GetDataForGridAsync(NhanVienQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var countResult = 0;
            NhanVienGridVo[] queryResult = Array.Empty<NhanVienGridVo>();


            var query = BaseRepository.TableNoTracking
                .Where(p => p.User!.IsDefault != true && (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(p.User.GioiTinh)) &&
                (queryInfo.ChuaKichHoat != true || p.User.IsActive != true));

            var gridVo =
                query.Select(s => new NhanVienGridVo
                {
                    Id = s.Id,
                    HoTen = s.User!.HoTen,
                    SoChungMinhThu = s.User.SoChungMinhThu,
                    SoNha = s.User.SoNha,
                    TinhThanh = s.User.TinhThanh != null ? s.User.TinhThanh.Ten : "",
                    QuanHuyen = s.User.QuanHuyen != null ? s.User.QuanHuyen.Ten : "",
                    PhuongXa = s.User.PhuongXa != null ? s.User.PhuongXa.Ten : "",
                    KhomAp = s.User.KhomAp != null ? s.User.KhomAp.Ten : "",
                    NgaySinhHienThi = s.User.NgaySinhHienThi,
                    SoDienThoai = s.User.SoDienThoai,
                    KichHoat = s.User.IsActive,
                    Email = s.User.Email,
                    GioiTinh = s.User.GioiTinh
                })
            .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai).
            ApplyLike(queryInfo.HoTen, g => g.HoTen)
            .ApplyLike(queryInfo.Email, g => g.Email);

            countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();

            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }


        public bool CheckIsExistPhone(string sdt, long id = 0)
        {
            bool result;
            if (id == 0)
            {
                result = BaseRepository.TableNoTracking.Any(p => p.User.SoDienThoai.Equals(sdt));

            }
            else
            {
                result = BaseRepository.TableNoTracking.Any(p => p.User.SoDienThoai.Equals(sdt) && p.Id != id);
            }
            if (result)
                return false;
            return true;
        }
        public async Task<ICollection<LookupItemVo>> GetLookup(LookupQueryInfo lookupQueryInfo, bool excludeCurrentUser = false)
        {
            var query = _repository.TableNoTracking;
            if (excludeCurrentUser)
            {
                query = query.Where(o => o.Id != _userAgentHelper.GetCurrentUserId());
            }
            var lookup = await query.Select(s => new LookupItemVo
            {
                KeyId = s.Id,
                DisplayName = s.User.HoTen
            }).ToListAsync();
            return lookup;
        }
    }
}
