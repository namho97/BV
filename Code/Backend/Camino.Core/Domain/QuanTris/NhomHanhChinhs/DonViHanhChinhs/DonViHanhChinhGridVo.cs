using Camino.Core.Helpers;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs
{
    public class DonViHanhChinhGridVo : GridItem
    {
        public string Ma { get; set; }
        public string Ten { get; set; }
        public string TenVietTat { get; set; }
        public CapHanhChinh CapHanhChinhId { get; set; }
        public string CapHanhChinh
        {
            get
            {
                return CapHanhChinhId.GetDescription();
            }
        }
        public long? TrucThuocDonViHanhChinhId { get; set; }
        public string TrucThuocDonViHanhChinh { get; set; }
    }
}
