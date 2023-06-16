namespace Camino.Api.Models.QuanTri.NhomDuocPham.DuocPhams
{
    public class DuocPhamViewModel : BaseViewModel
    {
        public DuocPhamViewModel()
        {
            DuocPhamGias = new List<DuocPhamGiaViewModel>();
        }
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";
        public string? HoatChat { get; set; }
        public string? HamLuong { get; set; }
        public long? DonViTinhId { get; set; }
        public string? TenDonViTinh { get; set; }
        public string? QuyCach { get; set; }
        public long? DuongDungId { get; set; }
        public string? TenDuongDung { get; set; }
        public long? NhaSanXuatId { get; set; }
        public string? TenNhaSanXuat { get; set; }
        public long? NuocSanXuatId { get; set; }
        public string? TenNuocSanXuat { get; set; }
        public string? CachDung { get; set; }

        public string? TieuChuan { get; set; }
        public string? GhiChu { get; set; }
        public string? SoDangKy { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }

        public List<DuocPhamGiaViewModel> DuocPhamGias { get; set; }
    }
    public class DuocPhamGiaViewModel : BaseViewModel
    {
        public long DuocPhamId { get; set; }
        public decimal? Gia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? DenNgayRequired { get; set; }
    }
}
