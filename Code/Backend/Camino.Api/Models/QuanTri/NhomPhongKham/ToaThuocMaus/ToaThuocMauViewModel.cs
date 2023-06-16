namespace Camino.Api.Models.QuanTri.NhomToaThuocMau.ToaThuocMaus
{
    public class ToaThuocMauViewModel : BaseViewModel
    {
        public ToaThuocMauViewModel()
        {
            ToaThuocMauChiTiets = new List<ToaThuocMauChiTietViewModel>();
        }
        public string Ten { get; set; } = "";
        public long? IcdId { get; set; }
        public long? BacSiId { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
        public List<ToaThuocMauChiTietViewModel> ToaThuocMauChiTiets { get; set; }
    }
    public class ToaThuocMauChiTietViewModel : BaseViewModel
    {
        public long? ToaThuocMauId { get; set; }
        public long? DuocPhamId { get; set; }
        public decimal? SoLuong { get; set; }
        public int? SoNgayDung { get; set; }
        public int? SoLuongSang { get; set; }
        public decimal? SoLuongTrua { get; set; }
        public decimal? SoLuongChieu { get; set; }
        public decimal? SoLuongToi { get; set; }
        public string? GhiChu { get; set; }
        public string? HoatChat { get; set; }
        public string? HamLuong { get; set; }
        public string? DonViTinh { get; set; }
        public string? DuongDung { get; set; }
        public decimal? Gia { get; set; }
        public decimal? GiaGoc => Gia;
    }
}
