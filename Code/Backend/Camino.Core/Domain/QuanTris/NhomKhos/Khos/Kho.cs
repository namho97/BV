using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using static Camino.Core.Domain.QuanTris.NhomKhos.Khos.EnumKho;

namespace Camino.Core.Domain.QuanTris.NhomKhos.Khos
{
    public class Kho :BaseEntity
    {
        public string Ten { get; set; } = "";

        public EnumLoaiKho LoaiKho { get; set; }

        public long? KhoaPhongId { get; set; }

        public bool IsDefault { get; set; }

        public long? PhongBenhVienId { get; set; }

        public bool? LoaiDuocPham { get; set; }
        public bool? LoaiVatTu { get; set; }

        public virtual KhoaPhongPhongKham? PhongBenhVien { get; set; }

        public virtual KhoaPhong? KhoaPhong { get; set; }

        private ICollection<ViTriDeDuocPhamVatTu>? _viTriDeDuocPhamVatTu;
        public virtual ICollection<ViTriDeDuocPhamVatTu> ViTriDeDuocPhamVatTus
        {
            get => _viTriDeDuocPhamVatTu ?? (_viTriDeDuocPhamVatTu = new List<ViTriDeDuocPhamVatTu>());
            protected set => _viTriDeDuocPhamVatTu = value;
        }
    }
}
