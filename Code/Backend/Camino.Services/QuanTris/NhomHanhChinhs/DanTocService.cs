using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomHanhChinhs
{
    [ScopedDependency(ServiceType = typeof(IDanTocService))]
    public class DanTocService : MasterFileService<DanToc>, IDanTocService
    {
        public DanTocService(IRepository<DanToc> repository) : base(repository)
        {
        }
        public bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma) || ma.Length < 7)
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.ToLower().Trim() == ma.ToLower().Trim());
            return kiemTra || (mas != null && mas.Contains(ma));
        }
        public async Task<GridDataSource> GetDataForGridAsync(DanTocQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                //            (queryInfo.Ten == null || d.Ten == queryInfo.Ten)
                //            ))
               .Select(p => new DanTocGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   GhiChu = p.GhiChu,
                   HieuLuc = p.HieuLuc,
                   QuocGiaId = p.QuocGiaId
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
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
