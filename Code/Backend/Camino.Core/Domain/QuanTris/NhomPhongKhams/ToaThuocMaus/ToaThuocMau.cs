using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus
{
    public class ToaThuocMau : BaseEntity
    {

        public string Ten { get; set; } = "";
        public long? IcdId { get; set; }
        public long BacSiId { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public virtual Icd? Icd { get; set; }
        public virtual NhanVien? BacSi { get; set; }

        private ICollection<ToaThuocMauChiTiet>? _toaThuocMauChiTiets;
        public virtual ICollection<ToaThuocMauChiTiet> ToaThuocMauChiTiets
        {
            get => _toaThuocMauChiTiets ??= new List<ToaThuocMauChiTiet>();
            protected set => _toaThuocMauChiTiets = value;
        }
        private ICollection<YeuCauKhamBenhDonThuoc>? _yeuCauKhamBenhDonThuocs;
        public virtual ICollection<YeuCauKhamBenhDonThuoc> YeuCauKhamBenhDonThuocs
        {
            get => _yeuCauKhamBenhDonThuocs ??= new List<YeuCauKhamBenhDonThuoc>();
            protected set => _yeuCauKhamBenhDonThuocs = value;
        }
    }
}
