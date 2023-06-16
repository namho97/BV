using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomDuocPhams
{
    [ScopedDependency(ServiceType = typeof(IDuocPhamService))]
    public class DuocPhamService : MasterFileService<DuocPham>, IDuocPhamService
    {
        public DuocPhamService(IRepository<DuocPham> repository) : base(repository)
        {
        }

        public async Task<GridDataSource> GetDataForGridAsync(DuocPhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(d => ((queryInfo.Ma == null || d.Ma == queryInfo.Ma) &&
                            (queryInfo.Ten == null || d.Ten == queryInfo.Ten) &&
                             (queryInfo.DonViTinhId == null || d.DonViTinhId == queryInfo.DonViTinhId) &&
                             (queryInfo.DuongDungId == null || d.DuongDungId == queryInfo.DuongDungId) &&
                             (queryInfo.QuyCachDongGoi == null || d.QuyCach == queryInfo.QuyCachDongGoi) &&
                             (queryInfo.HoatChat == null || d.HoatChat == queryInfo.HoatChat) &&
                             (queryInfo.HamLuong == null || d.HamLuong == queryInfo.HamLuong) &&
                             (queryInfo.NuocSanXuatId == null || d.NuocSanXuatId == queryInfo.NuocSanXuatId) &&
                             (queryInfo.NhaSanXuatId == null || d.NhaSanXuatId == queryInfo.NhaSanXuatId)
                            ))
               .Select(p => new DuocPhamGridVo
               {
                   Id = p.Id,
                   Ma = p.Ma,
                   Ten = p.Ten,
                   HoatChat = p.HoatChat,
                   HamLuong = p.HamLuong,
                   DonViTinh = p.DonViTinhId != null ? p.DonViTinh.Ten : "",
                   DuongDung = p.DuongDungId != null ? p.DuongDung.Ten : "",
                   NhaSanXuat = p.NhaSanXuatId != null ? p.NhaSanXuat.Ten : "",
                   NuocSanXuat = p.NuocSanXuatId != null ? p.NuocSanXuat.Ten : "",
                   QuyCachDongGoi = p.QuyCach
               }).ApplyLike(queryInfo.SearchString, g => g.Ten);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }

        public async Task<List<DuocPhamLookupItemVo>> GetLookup(LookupQueryInfo queryInfo)
        {
            var data = BaseRepository.TableNoTracking
                .Where(o => o.HieuLuc == true)
                .Select(o => new DuocPhamLookupItemVo
                {
                    KeyId = o.Id,
                    DisplayName = o.Ten,
                    HoatChat = o.HoatChat,
                    HamLuong = o.HamLuong,
                    DonViTinh = o.DonViTinh != null ? o.DonViTinh.Ten : "",
                    DuongDung = o.DuongDung != null ? o.DuongDung.Ten : "",
                    CachDung = o.CachDung,
                    Gia = o.DuocPhamGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ? o.DuocPhamGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia : 0

                }).ApplyLike(queryInfo.Query, o => o.DisplayName)
            .OrderBy(o => o.DisplayName)
            .Skip(0).Take(50).ToList();
            if (queryInfo.Id > 0 && !data.Any(o => o.KeyId == queryInfo.Id) && string.IsNullOrEmpty(queryInfo.Query))
            {
                var item = BaseRepository.TableNoTracking.FirstOrDefault(o => o.Id == queryInfo.Id);
                if (item != null)
                {
                    data.Insert(0, new DuocPhamLookupItemVo
                    {
                        KeyId = item.Id,
                        DisplayName = item.Ten,
                        HoatChat = item.HoatChat,
                        HamLuong = item.HamLuong,
                        DonViTinh = item.DonViTinh != null ? item.DonViTinh.Ten : "",
                        DuongDung = item.DuongDung != null ? item.DuongDung.Ten : ""
                    });
                }
            }
            return data;
        }
        public bool KiemTraTrungMaDuocPhamBenhVienAsync(long duocPhamBenhVienId, string maDuocPham, List<string> maDuocPhamTemps = null)
        {
            if (string.IsNullOrEmpty(maDuocPham))
            {
                return false;
            }

            var kiemTra = BaseRepository.TableNoTracking
                .Any(x => (duocPhamBenhVienId == 0 || x.Id != duocPhamBenhVienId)
                               && x.Ma.ToLower() == maDuocPham.ToLower());
            return kiemTra || (maDuocPhamTemps != null && maDuocPhamTemps.Contains(maDuocPham));
        }
        public List<ThongTinDuocPham> GetThongTinDuocPham(List<long> dpIds)
        {
            var info = BaseRepository.TableNoTracking.Include(o => o.DuocPhamGias).Where(d => dpIds.Contains(d.Id)).
                Select(d => new ThongTinDuocPham
                {
                    HamLuong = d.HamLuong,
                    DonViTinh = d.DonViTinhId != null ? d.DonViTinh.Ten : "",
                    DuongDung = d.DuongDungId != null ? d.DuongDung.Ten : "",
                    HoatChat = d.HoatChat,
                    Id = d.Id,
                    Gia = d.DuocPhamGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ? d.DuocPhamGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia : 0
                }).ToList();
            return info;
        }
    }
}
