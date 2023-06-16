using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IKhoaPhongPhongKhamService))]
    public class KhoaPhongPhongKhamService : MasterFileService<KhoaPhongPhongKham>, IKhoaPhongPhongKhamService
    {
        public KhoaPhongPhongKhamService(IRepository<KhoaPhongPhongKham> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(KhoaPhongPhongKhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
               .Where(d => (queryInfo.HieuLuc == null || d.HieuLuc == queryInfo.HieuLuc))
               .Select(p => new KhoaPhongPhongKhamGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   TenKhoaPhong = p.Ten,
                   TenPhongKham = p.KhoaPhong != null ?p.KhoaPhong.Ten:"",
                   HieuLuc = p.HieuLuc
               }).ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.TenKhoaPhong, g => g.TenKhoaPhong)
               .ApplyLike(queryInfo.TenPhongKham, g => g.TenPhongKham);


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
        public bool KiemTraTrungTenAsync(long Id, string ten)
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
