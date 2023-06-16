namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongNhanViens
{
    public class KhoaPhongNhanVienViewModel :BaseViewModel
    {
        public long? KhoaPhongId { get; set; }
        public long? NhanVienId { get; set; }
        public long? KhoaPhongPhongKhamId { get; set; }
        public bool? LaPhongLamViecChinh { get; set; }
    }
}
