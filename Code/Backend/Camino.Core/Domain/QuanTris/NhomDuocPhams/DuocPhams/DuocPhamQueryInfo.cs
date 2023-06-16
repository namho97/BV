namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams
{
    public class DuocPhamQueryInfo : QueryInfo
    {
        public string? Ten { get; set; }
        public string? Ma { get; set; }
        public string? HamLuong { get; set; }
        public string? HoatChat { get; set; }
        public long? DonViTinhId { get; set; }
        public long? DuongDungId { get; set; }
        public string? QuyCachDongGoi { get; set; }
        public long? NhaSanXuatId { get; set; }
        public long? NuocSanXuatId { get; set; }
    }
}
