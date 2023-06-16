using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhonhNhanViens;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongNhanViens
{
    [ScopedDependency(ServiceType = typeof(IKhoaPhongNhanVienService))]
    public class KhoaPhongNhanVienService : MasterFileService<KhoaPhongNhanVien>, IKhoaPhongNhanVienService
    {
        public KhoaPhongNhanVienService(IRepository<KhoaPhongNhanVien> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(KhoaPhongNhanVienQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
               .Where(d => (queryInfo.LaPhongLamViecChinh == null || d.LaPhongLamViecChinh == queryInfo.LaPhongLamViecChinh))
               .Select(p => new KhoaPhongNhanVienGridVo
               {
                   Id = p.Id,
                   TenNhanVien = p.NhanVien != null && p.NhanVien.User != null ? p.NhanVien.User.HoTen : "",
                   TenKhoaPhong = p.KhoaPhong != null ? p.KhoaPhong.Ten : "",
                   TenPhongKham = p.KhoaPhongPhongKham != null ? p.KhoaPhongPhongKham.Ten : "",
                   LaPhongLamViecChinh = p.LaPhongLamViecChinh
               }).ApplyLike(queryInfo.TenNhanVien, g => g.TenNhanVien)
               .ApplyLike(queryInfo.TenKhoaPhong, g => g.TenKhoaPhong)
               .ApplyLike(queryInfo.TenPhongKham, g => g.TenPhongKham);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                 .Select(p => new KhoaPhongNhanVienGridVo
                 {
                     Id = p.Id,
                     TenNhanVien = p.NhanVien != null && p.NhanVien.User != null ? p.NhanVien.User.HoTen : "",
                     TenKhoaPhong = p.KhoaPhong != null ? p.KhoaPhong.Ten : "",
                     TenPhongKham = p.KhoaPhongPhongKham != null ? p.KhoaPhongPhongKham.Ten : "",
                     LaPhongLamViecChinh = p.LaPhongLamViecChinh
                 })
                .ApplyLike(queryInfo.Query, g => g.TenNhanVien, g => g.TenKhoaPhong, g => g.TenPhongKham)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new LookupItemVo()
            {
                DisplayName = item.TenKhoaPhong +"-" + item.TenPhongKham + "-" + item.TenNhanVien,
                KeyId = item.Id,
            }).ToList();
            return query;
        }
    }
}
