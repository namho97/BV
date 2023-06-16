namespace Camino.Api.Models.QuanTri.NhomPhongKham.BenhViens
{
    public class BenhVienViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? TenVietTat { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public long? LoaiBenhVienId { get; set; }
        public int? HangBenhVien { get; set; }
        public int? TuyenChuyenMonKyThuat { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
