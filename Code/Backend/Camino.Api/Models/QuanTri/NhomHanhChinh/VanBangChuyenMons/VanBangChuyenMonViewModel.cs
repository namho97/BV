namespace Camino.Api.Models.QuanTri.NhomHanhChinh.VanBangChuyenMons
{
    public class VanBangChuyenMonViewModel:BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? TenVietTat { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
