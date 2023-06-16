

namespace Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKyThuats
{
    public class DichVuKyThuatGiaViewModel : BaseViewModel
    {
        public string Ten { get; set; }
        public decimal? Gia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? DenNgayRequired { get; set; }
    }

    public class DichVuKyThuatViewModel : BaseViewModel
    {
        public DichVuKyThuatViewModel()
        {
            DichVuKyThuatGias = new List<DichVuKyThuatGiaViewModel>();
        }
        public string? Ma { get; set; }
        public string Ten { get; set; } = "";

        public string? MoTa { get; set; }
        public bool? MacDinh { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
        public long? MacDinhId { get; set; }
        public List<DichVuKyThuatGiaViewModel> DichVuKyThuatGias { get; set; }
    }
}