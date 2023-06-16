using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.HuongDanSuDungs;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.HuongDanSuDungs
{
    [ScopedDependency(ServiceType = typeof(IHuongDanSuDungService))]
    public class HuongDanSuDungService : MasterFileService<HuongDanSuDung>, IHuongDanSuDungService
    {
        public HuongDanSuDungService(IRepository<HuongDanSuDung> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(HuongDanSuDungQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => ((queryInfo.Ten == null || d.Ten == queryInfo.Ten)))
               .Select(p => new HuongDanSuDungGridVo
               {
                   Id = p.Id,
                   Ten = p.Ten,
                   SoThuTu=p.SoThuTu
               }).ApplyLike(queryInfo.SearchString, g => g.Ten);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .ApplyLike(queryInfo.Query, g => g.Ten)
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
