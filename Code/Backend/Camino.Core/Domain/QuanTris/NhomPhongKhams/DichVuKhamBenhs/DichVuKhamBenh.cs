
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs
{
    public class DichVuKhamBenh : BaseEntity
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";

        public string? MoTa { get; set; }
        public bool? MacDinh { get; set; }
        public bool? HieuLuc { get; set; }

        private ICollection<DichVuKhamBenhGia>? _dichVuKhamBenhGias;
        public virtual ICollection<DichVuKhamBenhGia> DichVuKhamBenhGias
        {
            get => _dichVuKhamBenhGias ??= new List<DichVuKhamBenhGia>();
            protected set => _dichVuKhamBenhGias = value;
        }
        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhs;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhs
        {
            get => _yeuCauKhamBenhs ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhs = value;
        }

        private ICollection<GoiDichVuChiTietDichVuKhamBenh>? _goiDichVuChiTietDichVuKhamBenhs { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKhamBenh> GoiDichVuChiTietDichVuKhamBenhs
        {
            get => _goiDichVuChiTietDichVuKhamBenhs ?? (_goiDichVuChiTietDichVuKhamBenhs = new List<GoiDichVuChiTietDichVuKhamBenh>());
            protected set => _goiDichVuChiTietDichVuKhamBenhs = value;
        }

    }
}
