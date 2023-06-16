

using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs
{
    public class YeuCauKhamBenhDonThuoc : BaseEntity
    {
        public long YeuCauKhamBenhId { get; set; }
        public long? ToaThuocMauId { get; set; }
        public LoaiDonThuocEnum LoaiDonThuoc { get; set; }
        public long BacSiKeDonId { get; set; }
        public long? NoiKeDonId { get; set; }
        public DateTime ThoiDiemKeDon { get; set; }
        public TrangThaiDonThuocEnum TrangThai { get; set; }
        public string? GhiChu { get; set; }
        public virtual YeuCauKhamBenh? YeuCauKhamBenh { get; set; }
        public virtual ToaThuocMau? ToaThuocMau { get; set; }
        public virtual NhanVien? BacSiKeDon { get; set; }
        private ICollection<YeuCauKhamBenhDonThuocChiTiet>? _yeuCauKhamBenhDonThuocChiTiets;
        public virtual ICollection<YeuCauKhamBenhDonThuocChiTiet> YeuCauKhamBenhDonThuocChiTiets
        {
            get => _yeuCauKhamBenhDonThuocChiTiets ??= new List<YeuCauKhamBenhDonThuocChiTiet>();
            protected set => _yeuCauKhamBenhDonThuocChiTiets = value;
        }
    }
}
