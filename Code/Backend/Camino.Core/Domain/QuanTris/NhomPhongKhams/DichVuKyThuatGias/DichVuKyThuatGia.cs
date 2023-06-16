
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias
{
    public class DichVuKyThuatGia : BaseEntity
    {
        public long DichVuKyThuatId { get; set; }
        public decimal Gia { get; set; }

        public DateTime TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public virtual DichVuKyThuat? DichVuKyThuat { get; set; }

        private ICollection<GoiDichVuChiTietDichVuKyThuat>? _goiDichVuChiTietDichVuKyThuats { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKyThuat> GoiDichVuChiTietDichVuKyThuats
        {
            get => _goiDichVuChiTietDichVuKyThuats ?? (_goiDichVuChiTietDichVuKyThuats = new List<GoiDichVuChiTietDichVuKyThuat>());
            protected set => _goiDichVuChiTietDichVuKyThuats = value;
        }

    }
}
