using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.DonViHanhChinhs
{
    public class DonViHanhChinhViewModel : BaseViewModel
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";
        public CapHanhChinh? CapHanhChinh { get; set; }
        public string? TenDonViHanhChinh { get; set; }
        public string? TenVietTat { get; set; }
        public long? TrucThuocDonViHanhChinhId { get; set; }
        public long? TrucThuocThanhPhoId { get; set; }
        public long? TrucThuocQuanHuyenId { get; set; }
        public long? TrucThuocPhuongXaId { get; set; }
    }
}
