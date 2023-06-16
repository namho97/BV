namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs
{
    public class DonViHanhChinhVo
    {
        public long? Id { get; set; }
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public CapHanhChinh CapHanhChinh { get; set; }
        public string TenDonViHanhChinh { get; set; } = null!;
        public VungDiaLy? VungDiaLy { get; set; }
        public string? TenVietTat { get; set; }
        public long? TrucThuocDonViHanhChinhId { get; set; }
    }
}
