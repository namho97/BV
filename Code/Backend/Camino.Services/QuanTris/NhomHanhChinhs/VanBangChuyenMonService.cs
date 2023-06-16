using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    [ScopedDependency(ServiceType = typeof(IVanBangChuyenMonService))]
    public class VanBangChuyenMonService : MasterFileService<VanBangChuyenMon>, IVanBangChuyenMonService
    {
        public VanBangChuyenMonService(IRepository<VanBangChuyenMon> repository) : base(repository)
        {
        }
        public bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.ToLower().Trim() == ma.ToLower().Trim());
            return kiemTra || (mas != null && mas.Contains(ma));
        }
        public bool KiemTraTrungTenAsync(long Id, string ten, List<string> tens = null)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower().Trim() == ten.ToLower().Trim());
            return kiemTra || (tens != null && tens.Contains(ten));
        }
        public async Task<GridDataSource> GetDataForGridAsync(VanBangChuyenMonQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                //            (queryInfo.Ten == null || d.Ten == queryInfo.Ten) &&
                //             (queryInfo.TenVietTat == null || d.TenVietTat == queryInfo.TenVietTat)
                //            ))
               .Select(p => new VanBangChuyenMonGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   HieuLuc = p.HieuLuc,
                   TenVietTat = p.TenVietTat,
                   MoTa = p.MoTa
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten)
                .ApplyLike(queryInfo.TenVietTat, g => g.TenVietTat);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .Where(d => d.HieuLuc == true)
                .ApplyLike(queryInfo.Query, g => g.Ma, g => g.Ten)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
            }).ToList();
            return query;
        }
    }

}
