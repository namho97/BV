namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats
{
    public class NhaSanXuatGridVo : GridItem
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
