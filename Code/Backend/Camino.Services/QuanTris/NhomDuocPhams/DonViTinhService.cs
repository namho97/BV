using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    [ScopedDependency(ServiceType = typeof(IDonViTinhService))]
    public class DonViTinhService : MasterFileService<DonViTinh>, IDonViTinhService
    {
        public DonViTinhService(IRepository<DonViTinh> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(DonViTinhQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                //.Where(d => ((queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                //            (queryInfo.Ten == null || d.Ten == queryInfo.Ten)
                //            ))
               .Select(p => new DonViTinhGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   GhiChu = p.GhiChu,
                   HieuLuc = p.HieuLuc
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
        public bool KiemTraTrungMaAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.ToLower() == ma.ToLower());
            return kiemTra ;
        }
    }
}
