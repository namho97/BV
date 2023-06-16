namespace Camino.Api.Models.QuanTri.NhomDuocPham.DonViTinhs
{
    public class DonViTinhViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
