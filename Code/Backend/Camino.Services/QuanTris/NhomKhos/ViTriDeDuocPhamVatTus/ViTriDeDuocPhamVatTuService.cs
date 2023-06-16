using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus
{
    [ScopedDependency(ServiceType = typeof(IViTriDeDuocPhamVatTuService))]
    public class ViTriDeDuocPhamVatTuService : MasterFileService<ViTriDeDuocPhamVatTu>, IViTriDeDuocPhamVatTuService
    {
        public ViTriDeDuocPhamVatTuService(IRepository<ViTriDeDuocPhamVatTu> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(ViTriDeDuocPhamVatTuQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
               .Select(p => new ViTriDeDuocPhamVatTuGridVo
               {
                   Id = p.Id,
                   HieuLuc = p.HieuLuc,
                   Kho = p.Kho != null ? p.Kho.Ten:"",
                   Ten = p.Ten,
                   MoTa = p.MoTa
               }).ApplyLike(queryInfo.Ten, g => g.Ten)
               .ApplyLike(queryInfo.Kho, g => g.Kho);



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
        public bool KiemTraTrungTenAsync(long Id, string ten, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower() == ten.ToLower());
            return kiemTra;
        }
    }
}
