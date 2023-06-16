namespace Camino.Api.Models.QuanTri.NhomHanhChinh.QuocGias
{
    public class QuocGiaViewModel : BaseViewModel
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? TenVietTat { get; set; }
        public string? QuocTich { get; set; }
        public string? MaDienThoaiQuocTe { get; set; }
        public string? ThuDo { get; set; }
        public int? ChauLuc { get; set; }
        public bool? IsDisabled { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
