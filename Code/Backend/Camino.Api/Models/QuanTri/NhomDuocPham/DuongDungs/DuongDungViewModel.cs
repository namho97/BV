namespace Camino.Api.Models.QuanTri.NhomDuocPham.DuongDungs
{
    public class DuongDungViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
