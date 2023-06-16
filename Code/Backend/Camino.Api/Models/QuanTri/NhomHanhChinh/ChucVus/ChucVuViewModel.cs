namespace Camino.Api.Models.QuanTri.NhomHanhChinh.ChucVus
{
    public class ChucVuViewModel :BaseViewModel
    {
        public string? Ten { get; set; }
        public string? TenVietTat { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
