namespace Camino.Api.Models.QuanTri.NhomHanhChinh.DanTocs
{
    public class DanTocViewModel :BaseViewModel
    {
        public long QuocGiaId { get; set; }
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
