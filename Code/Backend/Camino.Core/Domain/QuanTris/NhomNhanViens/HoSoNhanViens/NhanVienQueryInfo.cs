namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class NhanVienQueryInfo : QueryInfo
    {
        public string? HoTen { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public List<LoaiGioiTinh?> GioiTinhs { get; set; }
        public bool? ChuaKichHoat { get; set; }

    }
}
