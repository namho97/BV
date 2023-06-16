using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Api.Models.TiepNhanNguoiBenh.BacSiGiaDinh.DangKyKhams
{
    public class DangKyKhamViewModel : BaseViewModel
    {
        public long? NguoiBenhId { get; set; }
        public string HoTen { get; set; } = "";
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int NamSinh { get; set; }
        public string? NgayThangNamSinh { get; set; }
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
        public LoaiGioiTinh GioiTinh { get; set; }
        public string? GioiTinhHienThi => GioiTinh.GetDescription();
        public string SoDienThoai { get; set; } = "";
        public string? NgheNghiep { get; set; }
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? KhomApId { get; set; }
        public string? SoNha { get; set; }
        public string? HoTenNguoiGiamHo { get; set; }
        public long? DanTocId { get; set; }
        public long? QuocTichId { get; set; }
        public string? NoiLamViec { get; set; }
        public string? Email { get; set; }
        public string MaYeuCauTiepNhan { get; set; } = "";
        public DateTime ThoiDiemTiepNhan { get; set; }
        public string? ThoiDiemTiepNhanHienThi => ThoiDiemTiepNhan.ApplyFormat();
        public long NhanVienTiepNhanId { get; set; }
        public string? TenNhanVienTiepNhan { get; set; }
        public int? SoThuTu { get; set; }
        public string? LyDoTiepNhan { get; set; }
        public bool? LaTaiKham { get; set; }
        public bool? LaDangKyHenKham { get; set; }
        public DateTime? NgayHenKham { get; set; }
        public int? GioHenKham { get; set; }
        public HinhThucHenEnum? HinhThucHen { get; set; }
        public TrangThaiYeuCauTiepNhanEnum? TrangThai { get; set; }
        public string? TrangThaiHienThi => TrangThai?.GetDescription();
        public bool? DangKyVaThuTien { get; set; }
        public decimal? TienKham { get; set; }

        public bool? DoChiSoSinhTon { get; set; }
        public ChiSoSinhTonViewModel? ChiSoSinhTonViewModel { get; set; }
    }

    public class HuyDangKyKhamViewModel : BaseViewModel
    {
        public string LyDoHuy { get; set; }
    }
}
