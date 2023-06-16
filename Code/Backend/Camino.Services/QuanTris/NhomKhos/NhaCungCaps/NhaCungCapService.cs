using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomKhos.NhaCungCaps
{
    [ScopedDependency(ServiceType = typeof(INhaCungCapService))]
    public class NhaCungCapService : MasterFileService<NhaCungCap>, INhaCungCapService
    {
        public NhaCungCapService(IRepository<NhaCungCap> repository) : base(repository)
        {
        }
        public async Task<GridDataSource> GetDataForGridAsync(NhaCungCapQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
             .Select(source => new NhaCungCapGridVo
             {
                 Id = source.Id,
                 Ten = source.Ten,
                 DiaChi = source.DiaChi,
                 MaSoThue = source.MaSoThue,
                 TaiKhoanNganHang = source.TaiKhoanNganHang,
                 NguoiDaiDien = source.NguoiDaiDien,
                 NguoiLienHe = source.NguoiLienHe,
                 SoDienThoaiLienHe = source.SoDienThoaiLienHe,
                 EmailLienHe = source.EmailLienHe
             }).ApplyLike(queryInfo.Ten, g => g.Ten)
                .ApplyLike(queryInfo.DiaChi, g => g.DiaChi)
                 .ApplyLike(queryInfo.MaSoThue, g => g.MaSoThue)
                  .ApplyLike(queryInfo.TaiKhoanNganHang, g => g.TaiKhoanNganHang)
                   .ApplyLike(queryInfo.NguoiDaiDien, g => g.NguoiDaiDien)
                    .ApplyLike(queryInfo.NguoiLienHe, g => g.NguoiLienHe)
                     .ApplyLike(queryInfo.SoDienThoaiLienHe, g => g.SoDienThoaiLienHe)
                      .ApplyLike(queryInfo.EmailLienHe, g => g.EmailLienHe);


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
        public bool KiemTraTrungMaSoThueAsync(long Id, string ma, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ma))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ma.ToLower().Trim() == ma.ToLower().Trim());
            return kiemTra || mas != null && mas.Contains(ma);
        }
        public bool KiemTraTrungTenAsync(long Id, string ten, List<string> tens = null)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.ToLower().Trim() == ten.ToLower().Trim());
            return kiemTra || tens != null && tens.Contains(ten);
        }
    }
}
