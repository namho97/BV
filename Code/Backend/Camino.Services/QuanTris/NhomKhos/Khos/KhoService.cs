using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomKhos.Khos
{
    [ScopedDependency(ServiceType = typeof(IKhoService))]
    public class KhoService : MasterFileService<Kho>, IKhoService
    {
        public KhoService(IRepository<Kho> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(KhoQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
               .Where(d => ((queryInfo.LoaiKho == null || d.LoaiKho == queryInfo.LoaiKho) &&
                           (queryInfo.LoaiDuocPham == null || d.LoaiDuocPham == queryInfo.LoaiDuocPham) &&
                           (queryInfo.LoaiVatTu == null || d.LoaiVatTu == queryInfo.LoaiVatTu)
                           ))
               .Select(p => new KhoGridVo
               {
                   Id = p.Id,
                   TenKho = p.Ten,
                   LoaiKho = p.LoaiKho.GetDescription(),
                   KhoaPhong = p.KhoaPhong != null ? p.KhoaPhong.Ten : "",
                   PhongBenhVien = p.PhongBenhVien != null ? p.PhongBenhVien.Ten : "",
                   IsDefault = p.IsDefault,
                   KhoChua = p.LoaiDuocPham == true ? "Dược phẩm" : p.LoaiVatTu == true ? "Vật tư" : "",
               }).ApplyLike(queryInfo.Ten ,g => g.TenKho);
              


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .ApplyLike(queryInfo.Query,g => g.Ten)
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
