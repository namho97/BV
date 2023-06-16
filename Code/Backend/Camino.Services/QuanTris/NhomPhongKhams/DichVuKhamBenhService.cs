using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IDichVuKhamBenhService))]
    public class DichVuKhamBenhService : MasterFileService<DichVuKhamBenh>, IDichVuKhamBenhService
    {
        IRepository<DichVuKhamBenhGia> _dichVuKhamBenhGiaRepository;
        public DichVuKhamBenhService(IRepository<DichVuKhamBenh> repository, IRepository<DichVuKhamBenhGia> dichVuKhamBenhGiaRepository) : base(repository)
        {
            _dichVuKhamBenhGiaRepository = dichVuKhamBenhGiaRepository;
        }
        public DichVuKhamBenh? GetDichVuKhamBenhMacDinh()
        {
            return BaseRepository.Table.Include(p => p.DichVuKhamBenhGias).FirstOrDefault(o => o.MacDinh == true && o.HieuLuc == true);
        }
        public bool KiemTraTrungMaAsync(long dichVuKhamId, string maDichVuKham, List<string> maDichVuKhamTemps = null)
        {
            if (string.IsNullOrEmpty(maDichVuKham))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (dichVuKhamId == 0 || x.Id != dichVuKhamId)
                               && x.Ma.ToLower() == (maDichVuKham.ToLower()));
            return kiemTra || (maDichVuKhamTemps != null && maDichVuKhamTemps.Contains(maDichVuKham));
        }
        public async Task<GridDataSource> GetDataForGridAsync(DichVuKhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => (
                             (queryInfo.HieuLucId == null || (d.HieuLuc == (queryInfo.HieuLucId == 1 ? true : false)))
                            ))
               .Select(p => new DichVuKhamGridVo
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

        public async Task<GridDataSource> GetDataChildForGridAsync(DichVuKhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            long dichVuKhamId = 0;
            if (!string.IsNullOrEmpty(queryInfo.SearchString))
            {
                dichVuKhamId = long.Parse(queryInfo.SearchString);  
            }

            var gridVo = _dichVuKhamBenhGiaRepository.TableNoTracking
                .Where(d => (dichVuKhamId == 0 || d.DichVuKhamBenhId == dichVuKhamId))
               .Select(p => new DichVuKhamGiaGridVo
               {
                   Id = p.Id,
                   TuNgay =  p.TuNgay.ApplyFormatDate(),
                   DenNgay = p.DenNgay != null ? p.DenNgay.GetValueOrDefault().ApplyFormatDate() : "",
                   Gia = p.Gia.ApplyNumber()
               });

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<DichVuKhamLookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking.Include(o => o.DichVuKhamBenhGias)
                 .Where(o => o.HieuLuc == true && o.MacDinh == true)
                 .ApplyLike(queryInfo.Query, g => g.Ten)
                 .Take(queryInfo.Take)
                 .ToListAsync();

            var query = lst.Select(item => new DichVuKhamLookupItemVo()
            {
                DisplayName = item.Ten,
                KeyId = item.Id,
                Gia = item.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ? 
                          item.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia
                          : 0,
                DichVuKhamGiaId = item.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ?
                          item.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Id
                          : null,
            }).ToList();
            return query;
        }
    }
}
