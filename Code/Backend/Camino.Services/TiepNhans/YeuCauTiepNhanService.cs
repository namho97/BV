using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Domain.TrangChus;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Services.TiepNhans
{
    [ScopedDependency(ServiceType = typeof(IYeuCauTiepNhanService))]
    public class YeuCauTiepNhanService : MasterFileService<YeuCauTiepNhan>, IYeuCauTiepNhanService
    {
        public YeuCauTiepNhanService(IRepository<YeuCauTiepNhan> repository) : base(repository)
        {
        }

        public async Task<GridDataSource> GetDataForGridAsync(YeuCauTiepNhanQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o => (o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaDen ||
                o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaThucHien ||
                o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien) &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.TrangThais == null || queryInfo.TrangThais.Count == 0 || queryInfo.TrangThais.Contains(o.TrangThai)) &&
                (queryInfo.NgayTiepNhanTu == null || queryInfo.NgayTiepNhanTu <= o.ThoiDiemTiepNhan) &&
                (queryInfo.NgayTiepNhanDen == null || queryInfo.NgayTiepNhanDen >= o.ThoiDiemTiepNhan))
               .Select(p => new YeuCauTiepNhanGridVo
               {
                   Id = p.Id,
                   SoThuTu = p.SoThuTu,
                   MaYeuCauTiepNhan = p.MaYeuCauTiepNhan,
                   MaNguoiBenh = p.NguoiBenh != null ? p.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.HoTen,
                   GioiTinh = p.GioiTinh,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   SoDienThoai = p.SoDienThoai,
                   TenTinhThanh = p.TinhThanh != null ? p.TinhThanh.Ten : "",
                   TenQuanHuyen = p.QuanHuyen != null ? p.QuanHuyen.Ten : "",
                   TenPhuongXa = p.PhuongXa != null ? p.PhuongXa.Ten : "",
                   TenKhomAp = p.KhomAp != null ? p.KhomAp.Ten : "",
                   SoNha = p.SoNha,
                   NguoiTiepNhan = p.NhanVienTiepNhan != null && p.NhanVienTiepNhan.User != null ? p.NhanVienTiepNhan.User.HoTen : "",
                   NgayTiepNhan = p.ThoiDiemTiepNhan,
                   LyDoTiepNhan = p.LyDoTiepNhan,
                   LoaiTrangThaiYeuCauTiepNhan = p.TrangThai

               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public async Task<GridDataSource> GetLichSuDataForGridAsync(YeuCauTiepNhanQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o => (o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien ||
                o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.HuyThucHien) &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.TrangThais == null || queryInfo.TrangThais.Count == 0 || queryInfo.TrangThais.Contains(o.TrangThai)) &&
                (queryInfo.NgayTiepNhanTu == null || queryInfo.NgayTiepNhanTu <= o.ThoiDiemTiepNhan) &&
                (queryInfo.NgayTiepNhanDen == null || queryInfo.NgayTiepNhanDen >= o.ThoiDiemTiepNhan) &&
                (queryInfo.NgayHoanThanhTu == null || queryInfo.NgayHoanThanhTu <= o.ThoiDiemHoanThanh) &&
                (queryInfo.NgayHoanThanhDen == null || queryInfo.NgayHoanThanhDen >= o.ThoiDiemHoanThanh))
               .Select(p => new YeuCauTiepNhanGridVo
               {
                   Id = p.Id,
                   SoThuTu = p.SoThuTu,
                   MaYeuCauTiepNhan = p.MaYeuCauTiepNhan,
                   MaNguoiBenh = p.NguoiBenh != null ? p.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.HoTen,
                   GioiTinh = p.GioiTinh,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   SoDienThoai = p.SoDienThoai,
                   TenTinhThanh = p.TinhThanh != null ? p.TinhThanh.Ten : "",
                   TenQuanHuyen = p.QuanHuyen != null ? p.QuanHuyen.Ten : "",
                   TenPhuongXa = p.PhuongXa != null ? p.PhuongXa.Ten : "",
                   TenKhomAp = p.KhomAp != null ? p.KhomAp.Ten : "",
                   SoNha = p.SoNha,
                   NguoiTiepNhan = p.NhanVienTiepNhan != null && p.NhanVienTiepNhan.User != null ? p.NhanVienTiepNhan.User.HoTen : "",
                   NgayTiepNhan = p.ThoiDiemTiepNhan,
                   LyDoTiepNhan = p.LyDoTiepNhan,
                   LoaiTrangThaiYeuCauTiepNhan = p.TrangThai,
                   NgayHoanThanh = p.ThoiDiemHoanThanh

               }).ApplyLike(queryInfo.SearchString, g => g.HoTen, g => g.SoDienThoai);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }


        public bool KiemTraTrungSoThuTu(int soThuTu, long id = 0)
        {
            bool result;
            var startDate = DateTime.Now.Date;
            var endDate = DateTime.Now;
            if (id == 0)
            {
                result = BaseRepository.TableNoTracking.Any(p => p.ThoiDiemTiepNhan >= startDate && p.ThoiDiemTiepNhan <= endDate && p.SoThuTu == soThuTu);

            }
            else
            {
                result = BaseRepository.TableNoTracking.Any(p => p.ThoiDiemTiepNhan >= startDate && p.ThoiDiemTiepNhan <= endDate && p.SoThuTu == soThuTu && p.Id != id);
            }
            return result;
        }



        public dynamic GetDataLichHenKham(TrangChuQueryInfo queryInfo)
        {
            var lichHenKhamGridVo = new LichHenKhamGridVo
            {
                SoLuongs = new List<int>(),
                NgayHenKhams = new List<string>()
            };
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham == true && o.NgayHenKham != null &&
                (queryInfo.TuNgay <= o.NgayHenKham) &&
                (queryInfo.DenNgay >= o.NgayHenKham))
               .Select(p => new
               {
                   Id = p.Id,
                   NgayHenKham = p.NgayHenKham
               }).OrderBy(o => o.NgayHenKham).ThenBy(o => o.Id).ToList();
            foreach (DateTime day in DateTimeHelper.EachDay(queryInfo.TuNgay, queryInfo.DenNgay))
            {
                lichHenKhamGridVo.SoLuongs.Add(gridVo.Count(o => ((DateTime)o.NgayHenKham).Date == day.Date));
                lichHenKhamGridVo.NgayHenKhams.Add(day.Date.ApplyFormatDate());

            }

            return lichHenKhamGridVo;

        }
        public async Task<GridDataSource> GetDataLichHenKhamTheoNgay(LichHenKhamTheoNgayQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham == true && o.NgayHenKham != null &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.NgayHenKham == o.NgayHenKham))
               .Select(p => new LichHenKhamChiTietGridVo
               {
                   Id = p.Id,
                   SoThuTu = p.SoThuTu,
                   MaYeuCauTiepNhan = p.MaYeuCauTiepNhan,
                   MaNguoiBenh = p.NguoiBenh != null ? p.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.HoTen,
                   GioiTinh = p.GioiTinh,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   SoDienThoai = p.SoDienThoai,
                   TenTinhThanh = p.TinhThanh != null ? p.TinhThanh.Ten : "",
                   TenQuanHuyen = p.QuanHuyen != null ? p.QuanHuyen.Ten : "",
                   TenPhuongXa = p.PhuongXa != null ? p.PhuongXa.Ten : "",
                   TenKhomAp = p.KhomAp != null ? p.KhomAp.Ten : "",
                   SoNha = p.SoNha,
                   NguoiTiepNhan = p.NhanVienTiepNhan != null && p.NhanVienTiepNhan.User != null ? p.NhanVienTiepNhan.User.HoTen : "",
                   NgayTiepNhan = p.ThoiDiemTiepNhan,
                   LyDoTiepNhan = p.LyDoTiepNhan,
                   NgayHenKham = p.NgayHenKham,
                   GioHenKham = p.GioHenKham,
                   HinhThucHen = p.HinhThucHen
               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public dynamic GetDataTinhTrangKham(TrangChuQueryInfo queryInfo)
        {
            var tinhTrangKhamGridVo = new TinhTrangKhamGridVo
            {
                SoLuongs = new List<int>(),
                TrangThais = new List<string>()
            };
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham != true &&
                (queryInfo.TuNgay <= o.ThoiDiemTiepNhan) &&
                (queryInfo.DenNgay >= o.ThoiDiemTiepNhan))
               .Select(p => new
               {
                   Id = p.Id,
                   TrangThai = p.TrangThai
               }).OrderBy(o => o.TrangThai).ThenBy(o => o.Id).ToList();
            tinhTrangKhamGridVo.TrangThais = gridVo.Select(o => o.TrangThai.GetDescription()).Distinct().OrderBy(o => o).ToList();
            foreach (string trangThai in tinhTrangKhamGridVo.TrangThais)
            {
                tinhTrangKhamGridVo.SoLuongs.Add(gridVo.Count(o => o.TrangThai.GetDescription() == trangThai));
            }

            return tinhTrangKhamGridVo;

        }
        public async Task<GridDataSource> GetDataTinhTrangKhamTheoNgay(TinhTrangKhamNgayQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var datas = Enum.GetValues(typeof(TrangThaiYeuCauTiepNhanEnum)).Cast<TrangThaiYeuCauTiepNhanEnum>();
            var trangThai = datas.Where(o => o.GetDescription() == queryInfo.TrangThai).Select(o => o).FirstOrDefault();
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham != true && o.TrangThai == trangThai &&
                (queryInfo.TuNgay <= o.ThoiDiemTiepNhan) &&
                (queryInfo.DenNgay >= o.ThoiDiemTiepNhan) &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)))
               .Select(p => new TinhTrangKhamChiTietGridVo
               {
                   Id = p.Id,
                   SoThuTu = p.SoThuTu,
                   MaYeuCauTiepNhan = p.MaYeuCauTiepNhan,
                   MaNguoiBenh = p.NguoiBenh != null ? p.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.HoTen,
                   GioiTinh = p.GioiTinh,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   SoDienThoai = p.SoDienThoai,
                   TenTinhThanh = p.TinhThanh != null ? p.TinhThanh.Ten : "",
                   TenQuanHuyen = p.QuanHuyen != null ? p.QuanHuyen.Ten : "",
                   TenPhuongXa = p.PhuongXa != null ? p.PhuongXa.Ten : "",
                   TenKhomAp = p.KhomAp != null ? p.KhomAp.Ten : "",
                   SoNha = p.SoNha,
                   NguoiTiepNhan = p.NhanVienTiepNhan != null && p.NhanVienTiepNhan.User != null ? p.NhanVienTiepNhan.User.HoTen : "",
                   NgayTiepNhan = p.ThoiDiemTiepNhan,
                   LyDoTiepNhan = p.LyDoTiepNhan,
               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai);


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public dynamic GetDataChiTietTiepNhan(TrangChuQueryInfo queryInfo)
        {
            var chiTietTiepNhanGridVo = new ChiTietTiepNhanGridVo();
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham != true &&
                (queryInfo.TuNgay <= o.ThoiDiemTiepNhan) &&
                (queryInfo.DenNgay >= o.ThoiDiemTiepNhan))
               .Select(p => new
               {
                   Id = p.Id,
                   NgaySinh = p.NgaySinh,
                   ThangSinh = p.ThangSinh,
                   NamSinh = p.NamSinh,
                   NhapVien = p.YeuCauKhamBenhs.Any(o => o.CachGiaiQuyet == Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.NhapVien)
               }).ToList();
            chiTietTiepNhanGridVo.TongTiepNhanSoLuong = gridVo.Count;
            chiTietTiepNhanGridVo.TreEmSoLuong = gridVo.Count(o => (o.NgaySinh == null || o.ThangSinh == null ? o.NamSinh >= DateTime.Now.AddYears(-6).Year : (DateTimeHelper.GetMonthsBetween(new DateTime(o.NamSinh, (int)o.ThangSinh, (int)o.NgaySinh), DateTime.Now.Date) <= 72)));
            chiTietTiepNhanGridVo.NhapVienSoLuong = gridVo.Count(o => o.NhapVien == true);
            return chiTietTiepNhanGridVo;

        }
    }
}
