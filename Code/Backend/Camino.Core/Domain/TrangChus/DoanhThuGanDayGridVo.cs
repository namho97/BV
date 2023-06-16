using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;

namespace Camino.Core.Domain.TrangChus
{
    public class DoanhThuGanDayGridVo : GridItem
    {
        public List<decimal>? SoTiens { get; set; }
        public List<string>? NgayThus { get; set; }
    }

    public class DoanhThuChiTietGridVo : GridItem
    {
        public string MaYeuCauTiepNhan { get; set; } = "";
        public string MaNguoiBenh { get; set; } = "";
        public string HoTen { get; set; } = "";
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");
        public string? SoDienThoai { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public string? SoPhieu { get; set; }
        public decimal? TienMat { get; set; }
        public decimal? ChuyenKhoan { get; set; }
        public decimal? Pos { get; set; }
        public decimal TongSoTienBangSo => (TienMat ?? 0) + (ChuyenKhoan ?? 0) + (Pos ?? 0);
        public string? TongSoTienBangChu => NumberHelper.ChuyenSoRaText(TongSoTienBangSo);
        public string? HinhThucThanhToan
        {
            get
            {
                var result = (TienMat != null ? "Tiền mặt; " : "") + (ChuyenKhoan != null ? "Chuyển khoản; " : "") + (Pos != null ? "Pos; " : "");
                if (!string.IsNullOrEmpty(result))
                {
                    result = result.Substring(0, result.Length - 2);
                }
                return result;
            }
        }
        public string? NoiDungThu { get; set; }
        public DateTime NgayThu { get; set; }
        public string NgayThuHienThi => NgayThu.ApplyFormat();
        public string? NhanVienThu { get; set; }
        public bool? DaHuy { get; set; }
        public DateTime? NgayHuy { get; set; }
        public string NgayHuyHienThi => NgayHuy?.ApplyFormat();
        public string? TenNhanVienHuy { get; set; }
        public string? LyDoHuy { get; set; }
    }
}
