using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus;
using Camino.Data;
using Camino.Data.Extensions;
using Camino.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Services.QuanTris.NhomCauHinhs
{
    [ScopedDependency(ServiceType = typeof(INoiDungMauService))]
    public partial class NoiDungMauService : MasterFileService<NoiDungMau>, INoiDungMauService
    {
        private readonly IUserAgentHelper _userAgentHelper;
        public NoiDungMauService(IRepository<NoiDungMau> repository, IUserAgentHelper userAgentHelper) : base(repository)
        {
            _userAgentHelper = userAgentHelper;
        }

        public async Task<GridDataSource> GetDataForGridAsync(NoiDungMauQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o => queryInfo.Loai == null || o.Loai == queryInfo.Loai)
               .Select(p => new NoiDungMauGridVo
               {
                   Id = p.Id,
                   Loai = p.Loai,
                   NoiDung = p.NoiDung

               }).ApplyLike(queryInfo.NoiDung, g => g.NoiDung);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };
        }
        public async Task<List<LookupItemVo>> GetLookup(NoiDungMauLookupQueryInfo model)
        {
            var data = await BaseRepository.TableNoTracking
                .Where(s => s.Loai == model.Loai).Select(s => new LookupItemVo
                {
                    KeyId = s.Id,
                    DisplayName = s.NoiDung
                }).ApplyLike(model.Query, s => s.DisplayName)
                .OrderBy(o => o.DisplayName).Skip(0).Take(50).ToListAsync();
            return data;
        }

        public NoiDungMau GetNoiDungMau(LoaiNoiDungMauEnum loai, string noiDung)
        {
            if (string.IsNullOrEmpty(noiDung))
                return null;
            noiDung = noiDung.Trim().ToLowerInvariant();
            return BaseRepository.Table.FirstOrDefault(o => o.Loai == loai && o.NoiDung == noiDung);
        }
    }
}
