using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets
{
    public class ToaThuocMauChiTiet : BaseEntity
    {

        public long ToaThuocMauId { get; set; }
        public long DuocPhamId { get; set; }
        public decimal SoLuong { get; set; }
        public int SoNgayDung { get; set; }
        public int SoLuongSang { get; set; }
        public decimal? SoLuongTrua { get; set; }
        public decimal? SoLuongChieu { get; set; }
        public decimal? SoLuongToi { get; set; }
        public string? GhiChu { get; set; }
        public virtual ToaThuocMau? ToaThuocMau { get; set; }
        public virtual DuocPham? DuocPham { get; set; }

    }
}
