using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomPhongKhams
{
    [ScopedDependency(ServiceType = typeof(IToaThuocMauService))]
    public class ToaThuocMauService : MasterFileService<ToaThuocMau>, IToaThuocMauService
    {
        private IRepository<DuocPham> _duocPhamRepository;
        private IRepository<ToaThuocMauChiTiet> _toaThuocMauChiTietRepository;
        public ToaThuocMauService(IRepository<ToaThuocMau> repository, IRepository<DuocPham> duocPhamRepository,
            IRepository<ToaThuocMauChiTiet> toaThuocMauChiTietRepository) : base(repository)
        {
            _duocPhamRepository = duocPhamRepository;
            _toaThuocMauChiTietRepository = toaThuocMauChiTietRepository;
        }
        public async Task<GridDataSource> GetDataForGridAsync(ToaThuocMauQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => ((queryInfo.BacSiId == null || d.BacSiId == queryInfo.BacSiId) &&
                             (queryInfo.IcdId == null || d.IcdId == queryInfo.IcdId) &&
                            (queryInfo.Ten == null || d.Ten == queryInfo.Ten) &&
                            (queryInfo.HieuLuc == null || d.HieuLuc == queryInfo.HieuLuc)
                            ))
               .Select(p => new ToaThuocMauGridVo
               {
                   Id = p.Id,
                   Ten = p.Ten,
                   GhiChu = p.GhiChu,
                   HieuLuc = p.HieuLuc,
                   BacSiId = p.BacSiId,
                   BacSiDisplay = p.BacSi != null && p.BacSi.User != null ? p.BacSi.User.HoTen : "",
                   IcdId = p.IcdId,
                   IcdDisplay = p.Icd != null ? p.Icd.TenTiengViet : "",
               });


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<GridDataSource> GetToaMauChiTietDataForGridAsync(long toaThuocMauId)
        {

            var gridVo = _toaThuocMauChiTietRepository.TableNoTracking
                .Where(d => d.ToaThuocMauId == toaThuocMauId)
               .Select(p => new ToaThuocMauChiTietGridVo
               {
                   Id = p.Id,
                   DuocPhamId = p.DuocPhamId,
                   DuocPhamTen = p.DuocPham != null ? p.DuocPham.Ten : "",
                   HoatChat = p.DuocPham != null ? p.DuocPham.HoatChat : "",
                   HamLuong = p.DuocPham != null ? p.DuocPham.HamLuong : "",
                   DonViTinh = p.DuocPham != null && p.DuocPham.DonViTinh != null ? p.DuocPham.DonViTinh.Ten : "",
                   DuongDung = p.DuocPham != null && p.DuocPham.DuongDung != null ? p.DuocPham.DuongDung.Ten : "",

                   SoLuong = p.SoLuong,
                   SoNgayDung = p.SoNgayDung,
                   SoLuongSang = p.SoLuongSang,
                   SoLuongTrua = p.SoLuongTrua,
                   SoLuongChieu = p.SoLuongChieu,
                   SoLuongToi = p.SoLuongToi,
                   CachDung = p.DuocPham != null ? p.DuocPham.CachDung : "",
               });


            var countResult = await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(o => o.DuocPhamTen).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
        public async Task<List<LookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var lst = await BaseRepository.TableNoTracking
                .Where(o => o.HieuLuc == true)
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
        public bool KiemTraTrungMaAsync(long Id, string ten, List<string> mas = null)
        {
            if (string.IsNullOrEmpty(ten) || ten.Length < 7)
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (Id == 0 || x.Id != Id)
                               && x.Ten.Contains(ten));
            return kiemTra || (mas != null && mas.Contains(ten));
        }

    }
}
