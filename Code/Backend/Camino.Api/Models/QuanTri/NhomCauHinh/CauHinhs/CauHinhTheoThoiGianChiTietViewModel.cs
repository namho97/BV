namespace Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs
{
    public class CauHinhTheoThoiGianChiTietViewModel : BaseViewModel
    {
        public long CauHinhTheoThoiGianId { get; set; }

        public string Value { get; set; }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public CauhinhViewModel CauHinhTheoThoiGian { get; set; }
    }
}
