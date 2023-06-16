using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.TrangChus
{
    public class LichHenKhamGridVo : GridItem
    {
        public List<int>? SoLuongs { get; set; }
        public List<string>? NgayHenKhams { get; set; }
    }

    public class LichHenKhamChiTietGridVo : GridItem
    {
        public int? SoThuTu { get; set; }
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
        public string? LyDoTiepNhan { get; set; }
        public DateTime? NgayHenKham { get; set; }
        public string? NgayHenKhamHienThi => NgayHenKham?.ApplyFormatDate();
        public int? GioHenKham { get; set; }
        public string? GioHenKhamHienThi => DateTimeHelper.ConvertIntSecondsToTime(GioHenKham ?? 0);
        public HinhThucHenEnum? HinhThucHen { get; set; }
        public string? HinhThucHenHienThi => HinhThucHen?.GetDescription();
    }
}
