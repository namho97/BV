using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IDichVuKyThuatService))]
    public class DichVuKyThuatService : MasterFileService<DichVuKyThuat>, IDichVuKyThuatService
    {
        public DichVuKyThuatService(IRepository<DichVuKyThuat> repository) : base(repository)
        {
        }
        public DichVuKyThuat? GetDichVuKyThuatMacDinh()
        {
            return BaseRepository.Table.Include(p => p.DichVuKyThuatGias).FirstOrDefault(o => o.MacDinh == true && o.HieuLuc == true);
        }
        public DichVuKyThuat? GetDichVuKyThuatByTen(string ten)
        {
            return BaseRepository.Table.Include(p => p.DichVuKyThuatGias).FirstOrDefault(o => o.Ten == ten && o.HieuLuc == true);
        }

        public async Task<List<DichVuKyThuatLookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking.Include(o => o.DichVuKyThuatGias)
                .Where(o => o.HieuLuc == true)
                .ApplyLike(queryInfo.Query, g => g.Ten)
                .Take(queryInfo.Take)
                .ToListAsync();

            var query = lst.Select(item => new DichVuKyThuatLookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
                Gia = item.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ? item.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia : 0,
                DichVuKyThuatGiaId = item.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ? item.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Id : null
            }).ToList();
            return query;
        }
        public bool KiemTraTrungMaAsync(long dichVuKyThuatId, string maDichVuKyThuat, List<string> maDichVuKyThuatTemps = null)
        {
            if (string.IsNullOrEmpty(maDichVuKyThuat))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (dichVuKyThuatId == 0 || x.Id != dichVuKyThuatId)
                               && x.Ma.ToLower() == (maDichVuKyThuat.ToLower()));
            return kiemTra || (maDichVuKyThuatTemps != null && maDichVuKyThuatTemps.Contains(maDichVuKyThuat));
        }
        public async Task<GridDataSource> GetDataForGridAsync(DichVuKyThuatQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => (
                             (queryInfo.HieuLucId == null || ( d.HieuLuc== (queryInfo.HieuLucId == 1? true :false))) 
                            ))
               .Select(p => new DichVuKyThuatGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   MoTa = p.MoTa,
                   HieuLuc = p.HieuLuc,
                   MacDinh = p.MacDinh,
               }).ApplyLike(queryInfo.SearchString, g => g.Ten)
               .ApplyLike(queryInfo.Ma, g => g.Ma)
               .ApplyLike(queryInfo.Ten, g => g.Ten);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
    }
}
