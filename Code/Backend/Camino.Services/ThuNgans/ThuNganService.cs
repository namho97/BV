using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.ThuNgans;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Domain.TrangChus;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.ThuNgans
{
    [ScopedDependency(ServiceType = typeof(IThuNganService))]
    public class ThuNganService : MasterFileService<PhieuThu>, IThuNganService
    {
        private IRepository<YeuCauTiepNhan> _yeuCauTiepNhanRepository;
        private IRepository<YeuCauKhamBenh> _yeuCauKhamBenhRepository;
        private IRepository<YeuCauDichVuKyThuat> _yeuCauDichVuKyThuatRepository;
        private IRepository<YeuCauKhamBenhDonThuocChiTiet> _yeuCauKhamBenhDonThuocChiTietRepository;
        public ThuNganService(IRepository<PhieuThu> repository, IRepository<YeuCauTiepNhan> yeuCauTiepNhanRepository,
            IRepository<YeuCauKhamBenh> yeuCauKhamBenhRepository, IRepository<YeuCauDichVuKyThuat> yeuCauDichVuKyThuatRepository,
            IRepository<YeuCauKhamBenhDonThuocChiTiet> yeuCauKhamBenhDonThuocChiTietRepository) : base(repository)
        {
            _yeuCauTiepNhanRepository = yeuCauTiepNhanRepository;
            _yeuCauKhamBenhRepository = yeuCauKhamBenhRepository;
            _yeuCauDichVuKyThuatRepository = yeuCauDichVuKyThuatRepository;
            _yeuCauKhamBenhDonThuocChiTietRepository = yeuCauKhamBenhDonThuocChiTietRepository;
        }

        public async Task<GridDataSource> GetNguoiBenhChuaThuDataForGrid(NguoiBenhChuaThuQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = _yeuCauTiepNhanRepository.TableNoTracking
                .Where(o => !(o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.HuyThucHien ||
                o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien) &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.NgayTiepNhanTu == null || queryInfo.NgayTiepNhanTu <= o.ThoiDiemTiepNhan) &&
                (queryInfo.NgayTiepNhanDen == null || queryInfo.NgayTiepNhanDen >= o.ThoiDiemTiepNhan))
               .Select(p => new NguoiBenhChuaThuGridVo
               {
                   Id = p.Id,
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
                   SoTien = p.YeuCauKhamBenhs.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham && o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan).Sum(o => o.Gia ?? 0) +
                   p.YeuCauDichVuKyThuats.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKyThuatEnum.HuyThucHien && o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan).Sum(o => o.Gia ?? 0) +
                   p.YeuCauKhamBenhs.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham).SelectMany(o => o.YeuCauKhamBenhDonThuocs.Where(p => p.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.HuyXuatThuoc).SelectMany(x => x.YeuCauKhamBenhDonThuocChiTiets.Where(l => l.KhongMua != true))).Where(o => o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan).Sum(o => (o.Gia ?? 0) * o.SoLuong)

               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public async Task<GridDataSource> GetNguoiBenhDaThuDataForGrid(NguoiBenhDaThuQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = _yeuCauTiepNhanRepository.TableNoTracking
                .Where(o =>
                o.TrangThai == YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien &&
                (queryInfo.GioiTinhs == null || queryInfo.GioiTinhs.Count == 0 || queryInfo.GioiTinhs.Contains(o.GioiTinh)) &&
                (queryInfo.NgayTiepNhanTu == null || queryInfo.NgayTiepNhanTu <= o.ThoiDiemTiepNhan) &&
                (queryInfo.NgayTiepNhanDen == null || queryInfo.NgayTiepNhanDen >= o.ThoiDiemTiepNhan))
               .Select(p => new NguoiBenhDaThuGridVo
               {
                   Id = p.Id,
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
                   SoTien = p.PhieuThus.Sum(o => (o.TienMat ?? 0) + (o.ChuyenKhoan ?? 0) + (o.POS ?? 0))

               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai);



            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public ThongTinVienPhiVo GetThongTinVienPhi(long yeuCauTiepNhanId)
        {
            var thongTinVienPhiVo = new ThongTinVienPhiVo();
            var yeuCauTiepNhan = _yeuCauTiepNhanRepository.TableNoTracking
                .Include(o => o.YeuCauKhamBenhs).ThenInclude(o => o.YeuCauKhamBenhDonThuocs).ThenInclude(o => o.YeuCauKhamBenhDonThuocChiTiets)
                .Include(o => o.YeuCauDichVuKyThuats)
                .FirstOrDefault(o => o.Id == yeuCauTiepNhanId);
            if (yeuCauTiepNhan != null)
            {
                thongTinVienPhiVo.TongCong = (yeuCauTiepNhan.YeuCauKhamBenhs.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham).Sum(o => o.Gia) ?? 0) +
                    (yeuCauTiepNhan.YeuCauDichVuKyThuats.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKyThuatEnum.HuyThucHien).Sum(o => o.Gia) ?? 0) +
                    (yeuCauTiepNhan.YeuCauKhamBenhs.Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham).SelectMany(o => o.YeuCauKhamBenhDonThuocs.Where(p => p.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.HuyXuatThuoc)).SelectMany(p => p.YeuCauKhamBenhDonThuocChiTiets).Sum(x => (x.Gia ?? 0) * x.SoLuong));
                thongTinVienPhiVo.TongDaThu = BaseRepository.TableNoTracking.Where(o => o.YeuCauTiepNhanId == yeuCauTiepNhanId && o.DaHuy != true).Sum(o => (o.TienMat ?? 0) + (o.ChuyenKhoan ?? 0) + (o.POS ?? 0));
            }
            return thongTinVienPhiVo;
        }

        public async Task<GridDataSource> GetDichVuChuaThuDataForGrid(long yeuCauTiepNhanId)
        {
            var yeuCauKhamBenhGridVo = _yeuCauKhamBenhRepository.TableNoTracking
                .Where(o => o.YeuCauTiepNhanId == yeuCauTiepNhanId && o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan && o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham)
               .Select(p => new DichVuChuaThuGridVo
               {
                   Id = p.Id,
                   LoaiNhomDichVu = ThuNganEnum.LoaiNhomDichVuEnum.YeuCauKhamBenh,
                   Nhom = "DỊCH VỤ",
                   Ten = p.TenDichVu,
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   KhongMua = false

               });
            var yeuCauDichVuKyThuatGridVo = _yeuCauDichVuKyThuatRepository.TableNoTracking
                .Where(o => o.YeuCauTiepNhanId == yeuCauTiepNhanId && o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan && o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKyThuatEnum.HuyThucHien)
               .Select(p => new DichVuChuaThuGridVo
               {
                   Id = p.Id,
                   LoaiNhomDichVu = ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDichVuKyThuat,
                   Nhom = "DỊCH VỤ",
                   Ten = p.TenDichVu,
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   KhongMua = false

               });
            var yeuCauKhamBenhDonThuocChiTietGridVo = _yeuCauKhamBenhDonThuocChiTietRepository.TableNoTracking
                .Include(o => o.YeuCauKhamBenhDonThuoc).ThenInclude(o => o.YeuCauKhamBenh)
                .Include(o => o.DuocPham)
                .Where(o => o.YeuCauKhamBenhDonThuoc != null && o.YeuCauKhamBenhDonThuoc.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.HuyXuatThuoc &&
                o.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && o.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham &&
                o.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhanId == yeuCauTiepNhanId && o.TrangThaiThanhToan == ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan)
               .Select(p => new DichVuChuaThuGridVo
               {
                   Id = p.Id,
                   LoaiNhomDichVu = ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet,
                   Nhom = "THUỐC",
                   Ten = p.DuocPham != null ? p.DuocPham.Ten : "",
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   KhongMua = p.KhongMua

               });
            var gridVo = yeuCauKhamBenhGridVo.Union(yeuCauDichVuKyThuatGridVo).Union(yeuCauKhamBenhDonThuocChiTietGridVo);


            var countResult = await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(o => o.Nhom).ThenBy(o => o.Ten).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
        public async Task<GridDataSource> GetDichVuDaThuDataForGrid(long yeuCauTiepNhanId)
        {
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.YeuCauTiepNhanId == yeuCauTiepNhanId)
               .Select(p => new DichVuDaThuGridVo
               {
                   Id = p.Id,
                   SoPhieu = p.SoPhieu,
                   TienMat = p.TienMat,
                   ChuyenKhoan = p.ChuyenKhoan,
                   Pos = p.POS,
                   NoiDungThu = p.NoiDungThu,
                   NgayThu = p.NgayThu,
                   NhanVienThu = p.NhanVienThucHien != null && p.NhanVienThucHien.User != null ? p.NhanVienThucHien.User.HoTen : "",
                   DaHuy = p.DaHuy,
                   NgayHuy = p.NgayHuy,
                   TenNhanVienHuy = p.NhanVienHuy != null && p.NhanVienHuy.User != null ? p.NhanVienHuy.User.HoTen : "",
                   LyDoHuy = p.LyDoHuy
               });


            var countResult = await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(o => o.SoPhieu).ThenBy(o => o.NgayThu).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }



        public dynamic GetDataDoanhThuGanDay(TrangChuQueryInfo queryInfo)
        {
            var lichHenKhamGridVo = new DoanhThuGanDayGridVo
            {
                SoTiens = new List<decimal>(),
                NgayThus = new List<string>()
            };
            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.DaHuy != true &&
                (queryInfo.TuNgay <= o.NgayThu) &&
                (queryInfo.DenNgay >= o.NgayThu))
               .Select(p => new
               {
                   Id = p.Id,
                   NgayThu = p.NgayThu,
                   SoTien = (p.TienMat ?? 0) + (p.ChuyenKhoan ?? 0) + (p.POS ?? 0)
               }).OrderBy(o => o.NgayThu).ThenBy(o => o.Id).ToList();
            foreach (DateTime day in DateTimeHelper.EachDay(queryInfo.TuNgay, queryInfo.DenNgay))
            {
                lichHenKhamGridVo.SoTiens.Add(gridVo.Where(o => ((DateTime)o.NgayThu).Date == day.Date).Sum(o => o.SoTien));
                lichHenKhamGridVo.NgayThus.Add(day.Date.ApplyFormatDate());

            }

            return lichHenKhamGridVo;

        }
        public async Task<GridDataSource> GetDataDoanhThuTheoNgay(DoanhThuTheoNgayQueryInfo queryInfo)
        {
            var gridVo = BaseRepository.TableNoTracking
                 .Where(o => o.DaHuy != true &&
                (queryInfo.NgayThu <= o.NgayThu) &&
                (queryInfo.DenNgay >= o.NgayThu))
               .Select(p => new DoanhThuChiTietGridVo
               {
                   Id = p.Id,
                   MaYeuCauTiepNhan = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.MaYeuCauTiepNhan : "",
                   MaNguoiBenh = p.YeuCauTiepNhan != null && p.NguoiBenh != null ? p.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen : "",
                   GioiTinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.GioiTinh : Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens.LoaiGioiTinh.ChuaXacDinh,
                   NgaySinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NgaySinh : null,
                   ThangSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.ThangSinh : null,
                   NamSinh = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.NamSinh : null,
                   SoDienThoai = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.SoDienThoai : "",
                   TenTinhThanh = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.TinhThanh != null ? p.YeuCauTiepNhan.TinhThanh.Ten : "",
                   TenQuanHuyen = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.QuanHuyen != null ? p.YeuCauTiepNhan.QuanHuyen.Ten : "",
                   TenPhuongXa = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.PhuongXa != null ? p.YeuCauTiepNhan.PhuongXa.Ten : "",
                   TenKhomAp = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.KhomAp != null ? p.YeuCauTiepNhan.KhomAp.Ten : "",
                   SoNha = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.SoNha : "",

                   SoPhieu = p.SoPhieu,
                   TienMat = p.TienMat,
                   ChuyenKhoan = p.ChuyenKhoan,
                   Pos = p.POS,
                   NoiDungThu = p.NoiDungThu,
                   NgayThu = p.NgayThu,
                   NhanVienThu = p.NhanVienThucHien != null && p.NhanVienThucHien.User != null ? p.NhanVienThucHien.User.HoTen : "",
                   DaHuy = p.DaHuy,
                   NgayHuy = p.NgayHuy,
                   TenNhanVienHuy = p.NhanVienHuy != null && p.NhanVienHuy.User != null ? p.NhanVienHuy.User.HoTen : "",
                   LyDoHuy = p.LyDoHuy
               }).ApplyLike(queryInfo.HoTen, g => g.HoTen)
               .ApplyLike(queryInfo.SoDienThoai, g => g.SoDienThoai)
               .ApplyLike(queryInfo.SoPhieu, g => g.SoPhieu);


            var countResult = await gridVo.CountAsync();
            var queryResult = await gridVo.OrderBy(o => o.SoPhieu).ThenBy(o => o.NgayThu).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }
    }
}
