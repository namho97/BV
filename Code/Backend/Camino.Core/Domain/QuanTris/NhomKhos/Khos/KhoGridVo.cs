using static Camino.Core.Domain.QuanTris.NhomKhos.Khos.EnumKho;

namespace Camino.Core.Domain.QuanTris.NhomKhos.Khos
{
    public class KhoGridVo :GridItem
    {
        public string? TenKho { get; set; }
        public string? KhoaPhong { get; set; }
        public string? PhongBenhVien { get; set; }
        public string? LoaiKho { get; set; }

        public string? KhoChua { get; set; }
       

        public bool IsDefault { get; set; }
        public string? KhoMacDinh => IsDefault == true ? "Kho mặc định" : "Không";
    }
}
