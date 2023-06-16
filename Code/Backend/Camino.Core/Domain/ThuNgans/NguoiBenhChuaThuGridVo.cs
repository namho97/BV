using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;

namespace Camino.Core.Domain.ThuNgans
{
    public class NguoiBenhChuaThuGridVo : GridItem
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
        public string? NguoiTiepNhan { get; set; }
        public DateTime? NgayTiepNhan { get; set; }
        public string? NgayTiepNhanHienThi => NgayTiepNhan?.ApplyFormat();
        public decimal? SoTien { get; set; }

    }
}
