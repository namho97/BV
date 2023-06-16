namespace Camino.Api.Models.QuanTri.NhomPhongKham.ToaThuocMauChiTiets
{
    public class ToaThuocMauChiTietViewModel : BaseViewModel
    {
        public long ToaThuocMauId { get; set; }
        public long DuocPhamId { get; set; }
        public decimal SoLuong { get; set; }
        public int SoNgayDung { get; set; }
        public int SoLuongSang { get; set; }
        public decimal? SoLuongTrua { get; set; }
        public decimal? SoLuongChieu { get; set; }
        public decimal? SoLuongToi { get; set; }
        public string? GhiChu { get; set; }
    }
}
