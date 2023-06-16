using static Camino.Core.Domain.QuanTris.NhomKhos.Khos.EnumKho;

namespace Camino.Core.Domain.QuanTris.NhomKhos.Khos
{
    public class KhoQueryInfo: QueryInfo
    {
        public string? Ten { get; set; } 

        public EnumLoaiKho? LoaiKho { get; set; }

        public long? KhoaPhongId { get; set; }

        public long? PhongBenhVienId { get; set; }

        public bool? LoaiDuocPham { get; set; }
        public bool? LoaiVatTu { get; set; }
    }
}
