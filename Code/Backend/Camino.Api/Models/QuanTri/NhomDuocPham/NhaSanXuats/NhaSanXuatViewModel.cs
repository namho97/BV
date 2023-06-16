namespace Camino.Api.Models.QuanTri.NhomDuocPham.NhaSanXuats
{
    public class NhaSanXuatViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
