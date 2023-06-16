namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps
{
    public class NgheNghiepGridVo : GridItem
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
