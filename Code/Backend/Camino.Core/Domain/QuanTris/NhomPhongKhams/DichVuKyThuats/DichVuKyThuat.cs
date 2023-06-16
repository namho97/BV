
using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats
{
    public class DichVuKyThuat : BaseEntity
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = "";

        public string? MoTa { get; set; }
        public bool? MacDinh { get; set; }
        public bool? HieuLuc { get; set; }

        private ICollection<DichVuKyThuatGia>? _dichVuKyThuatGias;
        public virtual ICollection<DichVuKyThuatGia> DichVuKyThuatGias
        {
            get => _dichVuKyThuatGias ??= new List<DichVuKyThuatGia>();
            protected set => _dichVuKyThuatGias = value;
        }
        private ICollection<YeuCauDichVuKyThuat>? _yeuCauDichVuKyThuats;
        public virtual ICollection<YeuCauDichVuKyThuat> YeuCauDichVuKyThuats
        {
            get => _yeuCauDichVuKyThuats ??= new List<YeuCauDichVuKyThuat>();
            protected set => _yeuCauDichVuKyThuats = value;
        }

        private ICollection<GoiDichVuChiTietDichVuKyThuat>? _goiDichVuChiTietDichVuKyThuats { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKyThuat> GoiDichVuChiTietDichVuKyThuats
        {
            get => _goiDichVuChiTietDichVuKyThuats ?? (_goiDichVuChiTietDichVuKyThuats = new List<GoiDichVuChiTietDichVuKyThuat>());
            protected set => _goiDichVuChiTietDichVuKyThuats = value;
        }
    }
}
