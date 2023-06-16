using AutoMapper;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;

namespace Camino.Api.Models.MappingProfile
{
    public class YeuCauKhamBenhMappingProfile : Profile
    {
        public YeuCauKhamBenhMappingProfile()
        {
            CreateMap<YeuCauTiepNhan, ThongTinHanhChinhViewModel>().AfterMap((s, d) =>
            {
                d.TenTinhThanh = s.TinhThanh?.Ten;
                d.TenQuanHuyen = s.QuanHuyen?.Ten;
                d.TenPhuongXa = s.PhuongXa?.Ten;
                d.TenKhomAp = s.KhomAp?.Ten;

                d.YeuCauTiepNhanId = s.Id;
                d.TenNhanVienHuy = s.NhanVienHuy?.User?.HoTen;
            });
            CreateMap<YeuCauKhamBenh, ThongTinKhamLamSangViewModel>().AfterMap((s, d) =>
            {
                d.ChiSoSinhTon = s.YeuCauTiepNhan?.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.LastOrDefault()?.Map<ChiSoSinhTonViewModel>();
                if (d.ChiSoSinhTon == null)
                    d.ChiSoSinhTon = new ChiSoSinhTonViewModel();
            });
            CreateMap<YeuCauKhamBenh, ThongTinCanLamSangViewModel>().AfterMap((s, d) =>
            {
                d.TaiLieuKetQuaXetNghiem = s.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == Core.Domain.KhamBenhs.KhamBenhEnum.LoaiKetQuaEnum.XetNghiem).Select(o => new ThongTinCanLamSangHinhAnhViewModel
                {
                    Id = o.Id,
                    LoaiKetQua = o.LoaiKetQua,
                    Ten = o.Ten,
                    TenGuid = o.TenGuid,
                    DuongDan = o.DuongDan,
                    LoaiTapTin = o.LoaiTapTin,
                    KichThuoc = o.KichThuoc
                }).ToList();
                d.TaiLieuKetQuaXQuang = s.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == Core.Domain.KhamBenhs.KhamBenhEnum.LoaiKetQuaEnum.XQuang).Select(o => new ThongTinCanLamSangHinhAnhViewModel
                {
                    Id = o.Id,
                    LoaiKetQua = o.LoaiKetQua,
                    Ten = o.Ten,
                    TenGuid = o.TenGuid,
                    DuongDan = o.DuongDan,
                    LoaiTapTin = o.LoaiTapTin,
                    KichThuoc = o.KichThuoc
                }).ToList();
                d.TaiLieuKetQuaSieuAm = s.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == Core.Domain.KhamBenhs.KhamBenhEnum.LoaiKetQuaEnum.SieuAm).Select(o => new ThongTinCanLamSangHinhAnhViewModel
                {
                    Id = o.Id,
                    LoaiKetQua = o.LoaiKetQua,
                    Ten = o.Ten,
                    TenGuid = o.TenGuid,
                    DuongDan = o.DuongDan,
                    LoaiTapTin = o.LoaiTapTin,
                    KichThuoc = o.KichThuoc
                }).ToList();
                d.TaiLieuKetQuaDienTim = s.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == Core.Domain.KhamBenhs.KhamBenhEnum.LoaiKetQuaEnum.DienTim).Select(o => new ThongTinCanLamSangHinhAnhViewModel
                {
                    Id = o.Id,
                    LoaiKetQua = o.LoaiKetQua,
                    Ten = o.Ten,
                    TenGuid = o.TenGuid,
                    DuongDan = o.DuongDan,
                    LoaiTapTin = o.LoaiTapTin,
                    KichThuoc = o.KichThuoc
                }).ToList();
                d.TaiLieuKetQuaThuThuatKhac = s.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == Core.Domain.KhamBenhs.KhamBenhEnum.LoaiKetQuaEnum.ThuThuatKhac).Select(o => new ThongTinCanLamSangHinhAnhViewModel
                {
                    Id = o.Id,
                    LoaiKetQua = o.LoaiKetQua,
                    Ten = o.Ten,
                    TenGuid = o.TenGuid,
                    DuongDan = o.DuongDan,
                    LoaiTapTin = o.LoaiTapTin,
                    KichThuoc = o.KichThuoc
                }).ToList();

            });
            CreateMap<YeuCauKhamBenh, ThongTinChanDoanDieuTriViewModel>().AfterMap((s, d) =>
            {
                d.ToaThuocs = s.YeuCauKhamBenhDonThuocs.SelectMany(o => o.YeuCauKhamBenhDonThuocChiTiets).Select(o => new ToaThuocViewModel
                {
                    Id = o.Id,
                    SoThuTu = o.SoThuTu,
                    DuocPhamId = o.DuocPhamId,
                    DuocPhamTen = o.Ten,
                    HoatChat = o.HoatChat,
                    HamLuong = o.HamLuong,
                    DonViTinh = o.DonViTinh,
                    DuongDung = o.DuongDung,
                    SoLuong = o.SoLuong,
                    CachDung = o.GhiChu,
                    SoNgayDung = o.SoNgayDung,
                    SoLuongSang = o.SoLuongSang,
                    SoLuongTrua = o.SoLuongTrua,
                    SoLuongChieu = o.SoLuongChieu,
                    SoLuongToi = o.SoLuongToi,
                    ThuocBHYT = false,
                    Gia = o.Gia,
                    GiaGoc = o.DuocPham?.DuocPhamGias?.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now))?.Gia ?? 0,
                    TrangThaiThanhToan = o.TrangThaiThanhToan
                }).ToList();
                if (s.TrangThai == Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.DoiKham ||
                s.TrangThai == Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham)
                {
                    d.ToaThuocs.Add(new ToaThuocViewModel
                    {
                        Id = 0,
                        IdTemp = CommonHelper.RandomString(6),
                        SoNgayDung = 1
                    });
                }
                if (s.CachGiaiQuyet == null)
                    d.CachGiaiQuyet = Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.KeToaThuoc;
                d.TenIcdChinh = s.IcdChinh?.TenTiengViet;
                d.TenBenhVienChuyenDen = s.BenhVienChuyenDen?.Ten;
                d.ThucHienThemDichVuTinhPhi = s.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Any();
                d.DichVuTinhPhiDaThanhToan = s.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Any(o => o.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan);

                d.DichVuKyThuatKhacs = s.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Select(o => new DichVuKyThuatKhacViewModel
                {
                    Id = o.Id,
                    TenDichVuKhac = o.TenDichVu,
                    SoLuongDichVuKhac = o.SoLuong,
                    DonGiaDichVuKhac = o.Gia,
                    DonGiaDichVuKhacGoc = o.DichVuKyThuat != null && o.DichVuKyThuat.DichVuKyThuatGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ?
                    (o.DichVuKyThuat.DichVuKyThuatGias.FirstOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now))?.Gia ?? 0) : 0,
                    TrangThaiThanhToan = o.TrangThaiThanhToan
                }).ToList();

            });
            CreateMap<ThongTinKhamLamSangViewModel, YeuCauKhamBenh>().AfterMap((s, d) =>
            {

            });
            CreateMap<ThongTinCanLamSangViewModel, YeuCauKhamBenh>().AfterMap((s, d) =>
            {


            });
            CreateMap<ThongTinChanDoanDieuTriViewModel, YeuCauKhamBenh>().AfterMap((s, d) =>
            {
                if (s.CachGiaiQuyet == Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.KeToaThuoc)
                {
                    d.BenhVienChuyenDenId = null;
                    d.LyDoNhapVien = null;
                    if (s.ToaThuocs != null && s.ToaThuocs.Any())
                    {
                        var i = 1;
                        foreach (var toaThuoc in s.ToaThuocs)
                        {
                            toaThuoc.SoThuTu = i;
                            i++;
                        }
                    }
                }
                else
                {
                    if (s.CachGiaiQuyet == Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.KhongToa)
                    {
                        d.BenhVienChuyenDenId = null;
                        d.LyDoNhapVien = null;
                        s.ToaThuocs = new List<ToaThuocViewModel>();
                    }
                    else
                    {
                        s.ToaThuocs = new List<ToaThuocViewModel>();

                    }
                }
            });


        }
    }
}
