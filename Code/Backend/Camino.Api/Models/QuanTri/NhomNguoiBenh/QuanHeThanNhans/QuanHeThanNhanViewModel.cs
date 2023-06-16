namespace Camino.Api.Models.QuanTri.NhomNguoiBenh.QuanHeThanNhans
{
    public class QuanHeThanNhanViewModel :BaseViewModel
    {
        public string? TenVietTat { get; set; }
        public string? Ten { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
