using Camino.Core.Helpers;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class NhanVienGridVo : GridItem
    {
        public string HoTen { get; set; } = null!;
        public long UserId { get; set; }
        public string? NgaySinhHienThi { get; set; }
        public string? SoChungMinhThu { get; set; }
        public string? SoNha { get; set; }
        public string? KhomAp { get; set; }
        public string? PhuongXa { get; set; }
        public string? QuanHuyen { get; set; }
        public string? TinhThanh { get; set; }
        public string DiaChi => AddressHelper.ApplyFormatAddress(TinhThanh, QuanHuyen, PhuongXa, KhomAp, SoNha);
        public string SoDienThoai { get; set; } = null!;
        public string? QuyenHan { get; set; }
        public string? GhiChu { get; set; }
        public LoaiGioiTinh? GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.HasValue ? GioiTinh.Value.GetDescription() : "";
        public bool? KichHoat { get; set; }
        public string? Email { get; set; }
    }
}
