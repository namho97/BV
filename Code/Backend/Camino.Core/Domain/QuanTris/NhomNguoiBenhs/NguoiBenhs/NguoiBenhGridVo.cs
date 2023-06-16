using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;

namespace Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs
{
    public class NguoiBenhGridVo : GridItem
    {
        public string MaNguoiBenh { get; set; } = "";
        public string HoTen { get; set; } = "";
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");
        public string? SoChungMinhThu { get; set; }
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public string SoDienThoai { get; set; } = "";
        public string? NgheNghiep { get; set; }
        public long? TinhThanhId { get; set; }
        public string? TinhThanhDisplay { get; set; }

        public long? QuanHuyenId { get; set; }
        public string? QuanHuyenDisplay { get; set; }

        public long? PhuongXaId { get; set; }
        public string? PhuongXaDisplay { get; set; }

        public long? KhomApId { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public string? HoTenNguoiGiamHo { get; set; }
        public string? DanToc { get; set; }
        public string? QuocTich { get; set; }
        public string? NoiLamViec { get; set; }
        public string? Email { get; set; }
        public string? TienSuBenhBanThan { get; set; }
        public string? TienSuBenhGiaDinh { get; set; }
        public string? TienSuDiUng { get; set; }
    }
}
