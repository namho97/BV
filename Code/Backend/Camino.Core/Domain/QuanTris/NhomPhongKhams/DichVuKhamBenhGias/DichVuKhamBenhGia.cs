
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias
{
    public class DichVuKhamBenhGia : BaseEntity
    {
        public long DichVuKhamBenhId { get; set; }
        public decimal Gia { get; set; }

        public DateTime TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public virtual DichVuKhamBenh? DichVuKhamBenh { get; set; }

        private ICollection<GoiDichVuChiTietDichVuKhamBenh>? _goiDichVuChiTietDichVuKhamBenhs { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKhamBenh> GoiDichVuChiTietDichVuKhamBenhs
        {
            get => _goiDichVuChiTietDichVuKhamBenhs ?? (_goiDichVuChiTietDichVuKhamBenhs = new List<GoiDichVuChiTietDichVuKhamBenh>());
            protected set => _goiDichVuChiTietDichVuKhamBenhs = value;
        }

    }
}
