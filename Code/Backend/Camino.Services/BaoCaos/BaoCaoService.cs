using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.BaoCaos;
using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TiepNhans;
using Camino.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.BaoCaos
{
    [ScopedDependency(ServiceType = typeof(IBaoCaoService))]
    public class BaoCaoService : MasterFileService<YeuCauTiepNhan>, IBaoCaoService
    {
        private IRepository<PhieuThu> _repositoryPhieuThu;
        private IRepository<PhieuChi> _repositoryPhieuChi;
        private IRepository<YeuCauKhamBenh> _repositoryYeuCauKhamBenh;
        private IRepository<YeuCauDichVuKyThuat> _repositoryYeuCauDichVuKyThuat;
        private IRepository<YeuCauKhamBenhDonThuocChiTiet> _repositoryYeuCauKhamBenhDonThuocChiTiet;
        public BaoCaoService(IRepository<YeuCauTiepNhan> repository, IRepository<PhieuThu> repositoryPhieuThu,
            IRepository<PhieuChi> repositoryPhieuChi, IRepository<YeuCauKhamBenh> repositoryYeuCauKhamBenh,
            IRepository<YeuCauDichVuKyThuat> repositoryYeuCauDichVuKyThuat,
            IRepository<YeuCauKhamBenhDonThuocChiTiet> repositoryYeuCauKhamBenhDonThuocChiTiet) : base(repository)
        {
            _repositoryPhieuThu = repositoryPhieuThu;
            _repositoryPhieuChi = repositoryPhieuChi;
            _repositoryYeuCauKhamBenh = repositoryYeuCauKhamBenh;
            _repositoryYeuCauDichVuKyThuat = repositoryYeuCauDichVuKyThuat;
            _repositoryYeuCauKhamBenhDonThuocChiTiet = repositoryYeuCauKhamBenhDonThuocChiTiet;
        }

        public async Task<GridDataSource> GetDoanhThuDataForGridAsync(BaoCaoDoanhThuQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var yeuCauKhamBenhGridVo = _repositoryYeuCauKhamBenh.TableNoTracking
                .Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.HuyKham &&
                (queryInfo.LoaiDichVu == null || queryInfo.LoaiDichVu == Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauKhamBenh) &&
                (queryInfo.TrangThaiThanhToan == null || queryInfo.TrangThaiThanhToan == o.TrangThaiThanhToan) &&
                (queryInfo.TuNgay == null || queryInfo.TuNgay <= o.ThoiDiemChiDinh) &&
                (queryInfo.DenNgay == null || queryInfo.DenNgay >= o.ThoiDiemChiDinh))
               .Select(p => new BaoCaoDoanhThuGridVo
               {
                   Id = p.Id,
                   NgayPhatSinh = p.ThoiDiemChiDinh,
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen : "",
                   TrangThaiThanhToan = p.TrangThaiThanhToan,
                   LoaiDichVu = Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauKhamBenh,
                   TenDichVu = p.TenDichVu,
                   DonViTinh = "Lần",
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   DoanhThu = p.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan ? (p.SoTienBenhNhanDaChi ?? 0) : ((p.SoLuong ?? 0) * (p.Gia ?? 0))
               });

            var yeuCauDichVuKyThuatGridVo = _repositoryYeuCauDichVuKyThuat.TableNoTracking
                .Where(o => o.TrangThai != Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKyThuatEnum.HuyThucHien &&
                (queryInfo.LoaiDichVu == null || queryInfo.LoaiDichVu == Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDichVuKyThuat) &&
                (queryInfo.TrangThaiThanhToan == null || queryInfo.TrangThaiThanhToan == o.TrangThaiThanhToan) &&
                (queryInfo.TuNgay == null || queryInfo.TuNgay <= o.ThoiDiemChiDinh) &&
                (queryInfo.DenNgay == null || queryInfo.DenNgay >= o.ThoiDiemChiDinh))
               .Select(p => new BaoCaoDoanhThuGridVo
               {
                   Id = p.Id,
                   NgayPhatSinh = p.ThoiDiemChiDinh,
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen : "",
                   TrangThaiThanhToan = p.TrangThaiThanhToan,
                   LoaiDichVu = Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDichVuKyThuat,
                   TenDichVu = p.TenDichVu,
                   DonViTinh = "Lần",
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   DoanhThu = p.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan ? (p.SoTienBenhNhanDaChi ?? 0) : ((p.SoLuong ?? 0) * (p.Gia ?? 0))
               });

            var yeuCauKhamBenhDonThuocChiTietGridVo = _repositoryYeuCauKhamBenhDonThuocChiTiet.TableNoTracking
                .Where(o => o.KhongMua != true &&
                (queryInfo.LoaiDichVu == null || queryInfo.LoaiDichVu == Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet) &&
                (queryInfo.TrangThaiThanhToan == null || queryInfo.TrangThaiThanhToan == o.TrangThaiThanhToan) &&
                (queryInfo.TuNgay == null || (o.YeuCauKhamBenhDonThuoc != null && queryInfo.TuNgay <= o.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon)) &&
                (queryInfo.DenNgay == null || (o.YeuCauKhamBenhDonThuoc != null && queryInfo.DenNgay >= o.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon)))
               .Select(p => new BaoCaoDoanhThuGridVo
               {
                   Id = p.Id,
                   NgayPhatSinh = p.YeuCauKhamBenhDonThuoc != null ? p.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon : null,
                   HoTen = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.HoTen : "",
                   TrangThaiThanhToan = p.TrangThaiThanhToan,
                   LoaiDichVu = Core.Domain.ThuNgans.ThuNganEnum.LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet,
                   TenDichVu = p.DuocPham != null ? p.DuocPham.Ten : "",
                   DonViTinh = p.DonViTinh,
                   SoLuong = p.SoLuong,
                   DonGia = p.Gia,
                   DoanhThu = p.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan ? (p.SoTienBenhNhanDaChi ?? 0) : (p.SoLuong * (p.Gia ?? 0))
               });
            var gridVo = yeuCauKhamBenhGridVo.Union(yeuCauDichVuKyThuatGridVo).Union(yeuCauKhamBenhDonThuocChiTietGridVo);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = queryInfo.LoadAll == true ? await gridVo.OrderBy(queryInfo.SortString).ToArrayAsync() :
                await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };

        }

        public async Task<GridDataSource> GetHenKhamDataForGridAsync(BaoCaoHenKhamQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = BaseRepository.TableNoTracking
                .Where(o => o.LaDangKyHenKham==true &&
                (queryInfo.TrangThai == null || queryInfo.TrangThai == o.TrangThai) &&
                (queryInfo.TuNgay == null || queryInfo.TuNgay <= o.NgayHenKham) &&
                (queryInfo.DenNgay == null || queryInfo.DenNgay >= o.NgayHenKham))
               .Select(p => new BaoCaoHenKhamGridVo
               {
                   Id = p.Id,
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
                   NgayHenKham=p.NgayHenKham,
                   GioHenKham = p.GioHenKham,
                   HinhThucHen=p.HinhThucHen,
                   TrangThai=p.TrangThai
               });


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = queryInfo.LoadAll == true ? await gridVo.OrderBy(queryInfo.SortString).ToArrayAsync() :
                                              await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }

        public async Task<GridDataSource> GetKhamBenhDataForGridAsync(BaoCaoKhamBenhQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = _repositoryYeuCauKhamBenh.TableNoTracking
                .Where(o => 
                (queryInfo.TrangThai == null || queryInfo.TrangThai == o.TrangThai) &&
                (queryInfo.TuNgay == null || queryInfo.TuNgay <= o.ThoiDiemChiDinh) &&
                (queryInfo.DenNgay == null || queryInfo.DenNgay >= o.ThoiDiemChiDinh))
               .Select(p => new BaoCaoKhamBenhGridVo
               {
                   Id = p.Id,
                   MaNguoiBenh = p.YeuCauTiepNhan != null && p.YeuCauTiepNhan.NguoiBenh != null ? p.YeuCauTiepNhan.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.YeuCauTiepNhan != null ? p.YeuCauTiepNhan.HoTen:"",
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
                   TrangThai = p.TrangThai,
                   NgayKhamBenh=p.ThoiDiemHoanThanh!=null?p.ThoiDiemHoanThanh:(p.ThoiDiemThucHien!=null?p.ThoiDiemThucHien:p.ThoiDiemChiDinh),
                   LyDoKhamBenh=p.LyDoKhamBenh,
                   TongTrang=p.TongTrang,
                   TenIcd=p.IcdChinh!=null?p.IcdChinh.TenTiengViet:"",
                   NoiDungChanDoan=p.NoiDungChanDoan,
                   CachGiaiQuyet=p.CachGiaiQuyet,
                   LoiDan=p.LoiDan,
                   NgayTaiKham=p.NgayHenTaiKham,
                   GhiChu=p.GhiChuHenTaiKham
               });


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = queryInfo.LoadAll == true ? await gridVo.OrderBy(queryInfo.SortString).ToArrayAsync() :
                                              await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }

        public async Task<GridDataSource> GetPhatThuocDataForGridAsync(BaoCaoPhatThuocQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);

            var gridVo = _repositoryYeuCauKhamBenhDonThuocChiTiet.TableNoTracking
                .Where(o => 
                (queryInfo.TrangThai == null || (o.YeuCauKhamBenhDonThuoc!=null && queryInfo.TrangThai == o.YeuCauKhamBenhDonThuoc.TrangThai)) &&
                (queryInfo.TuNgay == null || (o.YeuCauKhamBenhDonThuoc != null && queryInfo.TuNgay <= o.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon)) &&
                (queryInfo.DenNgay == null || (o.YeuCauKhamBenhDonThuoc != null && queryInfo.DenNgay >= o.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon)))
               .Select(p => new BaoCaoPhatThuocGridVo
               {
                   Id = p.Id,
                   MaNguoiBenh = p.YeuCauKhamBenhDonThuoc!=null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh!=null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.NguoiBenh != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.NguoiBenh.MaNguoiBenh : "",
                   HoTen = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.HoTen : "",
                   GioiTinh = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.GioiTinh : Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens.LoaiGioiTinh.ChuaXacDinh,
                   NgaySinh = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.NgaySinh : null,
                   ThangSinh = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.ThangSinh : null,
                   NamSinh = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.NamSinh : null,
                   SoDienThoai = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.SoDienThoai : "",
                   TenTinhThanh = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.TinhThanh != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.TinhThanh.Ten : "",
                   TenQuanHuyen = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.QuanHuyen != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.QuanHuyen.Ten : "",
                   TenPhuongXa = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.PhuongXa != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.PhuongXa.Ten : "",
                   TenKhomAp = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.KhomAp != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.KhomAp.Ten : "",
                   SoNha = p.YeuCauKhamBenhDonThuoc != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh != null && p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan != null ? p.YeuCauKhamBenhDonThuoc.YeuCauKhamBenh.YeuCauTiepNhan.SoNha : "",
                  NgayPhatThuoc= p.YeuCauKhamBenhDonThuoc != null?p.YeuCauKhamBenhDonThuoc.ThoiDiemKeDon:null,
                  TenThuoc=p.DuocPham!=null?p.DuocPham.Ten:"",
                  SoDangKy=p.DuocPham!=null?p.DuocPham.SoDangKy:"",
                  DonViTinh=p.DonViTinh,
                  SoLuong=p.SoLuong,
                  DonGia=p.Gia,
                  TrangThai= p.YeuCauKhamBenhDonThuoc != null ? p.YeuCauKhamBenhDonThuoc.TrangThai : null,
                   KhongMua = p.KhongMua
               });


            var countResult = queryInfo.LazyLoadPage == true ? 0 : await gridVo.CountAsync();
            var queryResult = queryInfo.LoadAll == true ? await gridVo.OrderBy(queryInfo.SortString).ToArrayAsync() :
                                              await gridVo.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };


        }
    }
}
