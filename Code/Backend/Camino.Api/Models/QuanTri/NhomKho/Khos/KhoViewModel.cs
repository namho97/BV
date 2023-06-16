using static Camino.Core.Domain.QuanTris.NhomKhos.Khos.EnumKho;

namespace Camino.Api.Models.QuanTri.NhomKho.Khos
{
    public class KhoViewModel :BaseViewModel
    {
        public string? Ten { get; set; } 

        public EnumLoaiKho? LoaiKho { get; set; }

        public long? KhoaPhongId { get; set; }
        public string? KhoaPhong { get; set; }
        public bool IsDefault { get; set; }

        public long? PhongBenhVienId { get; set; }
        public string PhongBenhVien { get; set; }

        public bool? LoaiDuocPham { get; set; }
        public bool? LoaiVatTu { get; set; }
    }
}
