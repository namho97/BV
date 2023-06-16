namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs
{
    public class DonViHanhChinhQueryInfo : QueryInfo
    {
        public CapHanhChinh CapHanhChinhId { get; set; }
        public long? TrucThuocDonViHanhChinhId { get; set; }
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? KhomApId { get; set; }
        public string? Ma { get; set; }
        public string? TenVietTat { get; set; }
        public string? Ten { get; set; }
    }
    public class DonViHanhChinhLookupQueryInfo : LookupQueryInfo
    {
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
    }
    public class DonViHanhChinhTreeQueryInfo
    {
        public string? SearchString { get; set; }
    }
}
