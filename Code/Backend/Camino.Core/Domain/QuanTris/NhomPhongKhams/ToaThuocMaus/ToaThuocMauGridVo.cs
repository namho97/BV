namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus
{
    public class ToaThuocMauGridVo : GridItem
    {
        public string Ten { get; set; } = "";
        public long? IcdId { get; set; }
        public string? IcdDisplay { get; set; }
        public long BacSiId { get; set; }
        public string? BacSiDisplay { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
    }
    public class ToaThuocMauChiTietGridVo : GridItem
    {

        public long? DuocPhamId { get; set; }
        public string? DuocPhamTen { get; set; }
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
    }
    public class ThongTinDuocPham : GridItem
    {
        public string? HoatChat { get; set; }
        public string? HamLuong { get; set; }
        public string? DonViTinh { get; set; }
        public string? DuongDung { get; set; }
        public decimal? Gia { get; set; }

    }
}
