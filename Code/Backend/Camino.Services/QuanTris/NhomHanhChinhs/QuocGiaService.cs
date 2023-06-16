using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    [ScopedDependency(ServiceType = typeof(IQuocGiaService))]
    public class QuocGiaService : MasterFileService<QuocGia>, IQuocGiaService
    {
        public QuocGiaService(IRepository<QuocGia> repository) : base(repository)
        {
        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .Where(o => o.HieuLuc == true)
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
        public async Task<GridDataSource> GetDataForGridAsync(QuocGiaQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.Ma == null || d.Ma.ToLower().Trim() == queryInfo.Ma.ToLower().Trim()) &&
                //            (queryInfo.Ten == null || d.Ten.ToLower().Trim() == queryInfo.Ten.ToLower().Trim()) &&
                //             (queryInfo.TenVietTat == null || d.TenVietTat.ToLower().Trim() == queryInfo.TenVietTat.ToLower().Trim())
                //            ))
               .Select(p => new QuocGiaGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   TenVietTat = p.TenVietTat,
                   ThuDo = p.ThuDo,
                   QuocTich = p.QuocTich,
                   Ten = p.Ten,
                   HieuLuc = p.HieuLuc
               })
               .ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten)
                .ApplyLike(queryInfo.TenVietTat, g => g.TenVietTat);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma) || ma.Length < 7)
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.Contains(ma));
            return kiemTra || (mas != null && mas.Contains(ma));
        }
    }
}
