namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongPhongKhams
{
    public class KhoaPhongPhongKhamViewModel :BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten{ get; set; }
        public long? KhoaPhongId { get; set; }
        public string? TenKhoaPhong { get; set; }

        public bool? HieuLuc { get; set; }
        public string? Tang { get; set; }
    }
}
