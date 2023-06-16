using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Core.Domain.ThuNgans
{
    public class DichVuChuaThuGridVo : GridItem
    {
        public LoaiNhomDichVuEnum LoaiNhomDichVu { get; set; }
        public string Nhom { get; set; } = "";
        public string Ten { get; set; } = "";
        public decimal? SoLuong { get; set; }
        public decimal? DonGia { get; set; }
        public decimal ThanhTien => (SoLuong ?? 0) * (DonGia ?? 0);
        public bool? KhongMua { get; set; }

    }
}
