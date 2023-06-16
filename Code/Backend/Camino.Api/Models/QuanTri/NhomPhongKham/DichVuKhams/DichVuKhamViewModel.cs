

namespace Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKhams
{
    public class DichVuKhamGiaViewModel : BaseViewModel
    {
        public long? DichVuKhamId { get; set; }
        public decimal? Gia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? DenNgayRequired { get; set; }
    }
    public class DichVuKhamMacDinhViewModel : BaseViewModel
    {
        public string? Ten { get; set; }
        public decimal? Gia { get; set; }
    }

    public class DichVuKhamViewModel : BaseViewModel
    {
        public DichVuKhamViewModel()
        {
            DichVuKhamBenhGias = new List<DichVuKhamGiaViewModel>();
        }
        public string? Ma { get; set; }
        public string Ten { get; set; } = "";

        public string? MoTa { get; set; }
        public bool? MacDinh { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
        public long? MacDinhId { get; set; }
        public List<DichVuKhamGiaViewModel> DichVuKhamBenhGias { get; set; }
    }
}
