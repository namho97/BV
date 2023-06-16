namespace Camino.Core.Domain.TrangChus
{
    public class ChiTietTiepNhanGridVo : GridItem
    {
        public int? TongTiepNhanSoLuong { get; set; }
        public int? TreEmSoLuong { get; set; }
        public decimal? TreEmPhanTram => TongTiepNhanSoLuong > 0 ? (decimal)(((TreEmSoLuong ?? 0) * 100) / (TongTiepNhanSoLuong ?? 0)) : 0;
        public int? NhapVienSoLuong { get; set; }
        public decimal? NhapVienPhanTram => TongTiepNhanSoLuong > 0 ? (decimal)(((NhapVienSoLuong ?? 0) * 100) / (TongTiepNhanSoLuong ?? 0)) : 0;
    }

}
