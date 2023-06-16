using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams
{
    public class BacSiKhamViewModel : BaseViewModel
    {
        public ThongTinHanhChinhViewModel? ThongTinHanhChinhViewModel { get; set; }
        public ThongTinKhamLamSangViewModel? ThongTinKhamLamSangViewModel { get; set; }
        public ThongTinCanLamSangViewModel? ThongTinCanLamSangViewModel { get; set; }
        public ThongTinChanDoanDieuTriViewModel? ThongTinChanDoanDieuTriViewModel { get; set; }
    }
    public class ThongTinHanhChinhViewModel : BaseViewModel
    {
        public long? YeuCauTiepNhanId { get; set; }
        public long? NguoiBenhId { get; set; }
        public int? SoThuTu { get; set; }
        public string? MaYeuCauTiepNhan { get; set; }
        public DateTime ThoiDiemTiepNhan { get; set; }
        public string? ThoiDiemTiepNhanHienThi => ThoiDiemTiepNhan.ApplyFormat();
        public string? MaNguoiBenh { get; set; }
        public string? HoTen { get; set; }
        public string? Barcode => BarcodeHelper.GenerateBarCode(MaYeuCauTiepNhan);
        public LoaiGioiTinh GioiTinh { get; set; }
        public string? GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NamSinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NgaySinh { get; set; }
        public string? SoDienThoai { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh.ToString() : "") + (NgaySinh != null && ThangSinh != null ? "/" : "") + (ThangSinh != null ? ThangSinh.ToString() : "") + (NamSinh != null && ThangSinh != null ? "/" : "") + (NamSinh != null ? NamSinh.ToString() : "");
        public string? Tuoi
        {
            get
            {
                var result = "";
                if (NamSinh != null)
                {
                    if (NamSinh >= DateTime.Now.Year - 6)
                    {
                        if (ThangSinh != null)
                        {
                            if (ThangSinh >= DateTime.Now.Month)
                            {
                                result = ((DateTime.Now.Year - (int)NamSinh) * 12 + (ThangSinh - DateTime.Now.Month)) + " tháng tuổi";
                            }
                            else
                            {
                                result = ((DateTime.Now.Year - (int)NamSinh - 1) * 12 + ThangSinh) + " tháng tuổi";

                            }
                        }
                        else
                        {
                            result = (DateTime.Now.Year - (int)NamSinh) * 12 + " tháng tuổi";
                        }
                    }
                    else
                    {
                        result = (DateTime.Now.Year - (int)NamSinh) + " tuổi";
                    }
                }
                return result;
            }
        }
        public string? SoChungMinhThu { get; set; }
        public string? NgheNghiep { get; set; }
        public string? HoTenNguoiGiamHo { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? KhomApId { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public bool? LaDangKyHenTruoc { get; set; }
        public DateTime? NgayHen { get; set; }
        public int? GioHenTu { get; set; }
        public HinhThucHenEnum? HinhThucHen { get; set; }
        public TrangThaiYeuCauTiepNhanEnum? TrangThai { get; set; }
        public string? TrangThaiHienThi => TrangThai?.GetDescription();
        public string? TenNhanVienHuy { get; set; }
        public DateTime? ThoiDiemHuy { get; set; }
        public string? ThoiDiemHuyHienThi => ThoiDiemHuy?.ApplyFormat();
        public string? LyDoHuy { get; set; }
    }
    public class ThongTinKhamLamSangViewModel : BaseViewModel
    {

        public bool? HoanThanhKham { get; set; }
        public string? LyDoKhamBenh { get; set; }
        public string? TongTrang { get; set; }
        public bool? CoKhamChiTietCacBoPhan { get; set; }
        public string? BoPhanTimMach { get; set; }
        public string? BoPhanHoHap { get; set; }
        public string? BoPhanTieuHoa { get; set; }
        public string? BoPhanTietNieu { get; set; }
        public string? BoPhanThanKinh { get; set; }
        public string? BoPhanPhuKhoa { get; set; }
        public string? BoPhanDaLieu { get; set; }
        public string? BoPhanTaiMuiHong { get; set; }
        public string? BoPhanMat { get; set; }
        public string? BoPhanCoXuongKhop { get; set; }
        public string? TienSuBenhBanThan { get; set; }
        public string? TienSuBenhGiaDinh { get; set; }
        public string? TienSuDiUng { get; set; }
        public ChiSoSinhTonViewModel? ChiSoSinhTon { get; set; }
    }
    public class ThongTinCanLamSangViewModel : BaseViewModel
    {
        public bool? HoanThanhKham { get; set; }
        public string? CanLamSangNoiDungKetQuaXetNghiem { get; set; }
        public string? CanLamSangNoiDungKetQuaXQuang { get; set; }
        public string? CanLamSangNoiDungKetQuaSieuAm { get; set; }
        public string? CanLamSangNoiDungKetQuaDienTim { get; set; }
        public string? CanLamSangNoiDungKetQuaThuThuatKhac { get; set; }

        public List<ThongTinCanLamSangHinhAnhViewModel>? TaiLieuKetQuaXetNghiem { get; set; }
        public List<ThongTinCanLamSangHinhAnhViewModel>? TaiLieuKetQuaXQuang { get; set; }
        public List<ThongTinCanLamSangHinhAnhViewModel>? TaiLieuKetQuaSieuAm { get; set; }
        public List<ThongTinCanLamSangHinhAnhViewModel>? TaiLieuKetQuaDienTim { get; set; }
        public List<ThongTinCanLamSangHinhAnhViewModel>? TaiLieuKetQuaThuThuatKhac { get; set; }
    }
    public class ThongTinCanLamSangHinhAnhViewModel : BaseViewModel
    {
        public LoaiKetQuaEnum LoaiKetQua { get; set; }
        public string Ten { get; set; } = "";
        public string TenGuid { get; set; } = "";
        public string DuongDan { get; set; } = "";
        public string? LoaiTapTin { get; set; }
        public long KichThuoc { get; set; }
        public string? MoTa { get; set; }
    }
    public class ThongTinChanDoanDieuTriViewModel : BaseViewModel
    {
        public bool? HoanThanhKham { get; set; }
        public long? IcdChinhId { get; set; }
        public string? TenIcdChinh { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public CachGiaiQuyetEnum? CachGiaiQuyet { get; set; }
        public string? CachGiaiQuyetHienThi => CachGiaiQuyet?.GetDescription();
        public string? LoiDan { get; set; }
        public bool? CoHenTaiKham { get; set; }
        public int? KhamLaiSau { get; set; }
        public DateTime? NgayHenTaiKham { get; set; }
        public string? NgayHenTaiKhamHienThi => NgayHenTaiKham?.ApplyFormatDate();
        public string? GhiChuHenTaiKham { get; set; }
        public long? BenhVienChuyenDenId { get; set; }
        public string? TenBenhVienChuyenDen { get; set; }
        public string? LyDoNhapVien { get; set; }
        public long? ToaThuocMauId { get; set; }
        public List<ToaThuocViewModel>? ToaThuocs { get; set; }
        public int? SoNgayDungThuocMacDinh { get; set; }
        public bool? ThucHienThemDichVuTinhPhi { get; set; }
        public bool? DichVuTinhPhiDaThanhToan { get; set; }
        public List<DichVuKyThuatKhacViewModel>? DichVuKyThuatKhacs { get; set; }
    }

    public class DichVuKyThuatKhacViewModel : BaseViewModel
    {
        public string? TenDichVuKhac { get; set; }
        public decimal? SoLuongDichVuKhac { get; set; }
        public decimal? DonGiaDichVuKhac { get; set; }
        public decimal? DonGiaDichVuKhacGoc { get; set; }
        public decimal? ThanhTienDichVuKhac => (SoLuongDichVuKhac ?? 0) * (DonGiaDichVuKhac ?? 0);
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public string? TrangThaiThanhToanHienThi => TrangThaiThanhToan?.GetDescription();
    }
    public class ChiSoSinhTonViewModel : BaseViewModel
    {
        public int? Mach { get; set; }
        public decimal? NhietDo { get; set; }
        public int? HuyetApTamThu { get; set; }
        public int? HuyetApTamTruong { get; set; }
        public int? NhipTho { get; set; }
        public decimal? CanNang { get; set; }
        public decimal? ChieuCao { get; set; }
        public decimal? Bmi { get; set; }
        public decimal? Glassgow { get; set; }
        public decimal? SpO2 { get; set; }
    }
    public class ToaThuocViewModel : BaseViewModel
    {
        public int? SoThuTu { get; set; }
        public long? DuocPhamId { get; set; }
        public string? DuocPhamTen { get; set; }
        public string? IdTemp { get; set; }
        public string? HoatChat { get; set; }
        public string? HamLuong { get; set; }
        public string? DonViTinh { get; set; }
        public string? DuongDung { get; set; }
        public decimal? SoLuong { get; set; }
        public int? SoNgayDung { get; set; }
        public decimal? SoLuongSang { get; set; }
        public decimal? SoLuongTrua { get; set; }
        public decimal? SoLuongChieu { get; set; }
        public decimal? SoLuongToi { get; set; }
        public string? CachDung { get; set; }
        public bool? ThuocBHYT { get; set; }
        public decimal? Gia { get; set; }
        public decimal? GiaGoc { get; set; }
        public decimal? ThanhTien => (SoLuong ?? 0) * (Gia ?? 0);
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public string? TrangThaiThanhToanHienThi => TrangThaiThanhToan?.GetDescription();
    }
    public class MoKhamLaiViewModel : BaseViewModel
    {
        public string? LyDo { get; set; }
    }
}
