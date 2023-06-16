using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.EnumBoPhan;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.LoaiGoiDichVu;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    public class GoiDichVu :BaseEntity
    {
        public EnumLoaiGoiDichVu LoaiGoiDichVu { get; set; }

        public string Ten { get; set; } = "";

        public string? MoTa { get; set; } 

        public bool? HieuLuc { get; set; } 

        public BoPhan? BoPhan { get; set; }

        private ICollection<GoiDichVuChiTietDichVuKhamBenh>? _goiDichVuChiTietDichVuKhamBenhs { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKhamBenh> GoiDichVuChiTietDichVuKhamBenhs
        {
            get => _goiDichVuChiTietDichVuKhamBenhs ?? (_goiDichVuChiTietDichVuKhamBenhs = new List<GoiDichVuChiTietDichVuKhamBenh>());
            protected set => _goiDichVuChiTietDichVuKhamBenhs = value;
        }


        private ICollection<GoiDichVuChiTietDichVuKyThuat>? _goiDichVuChiTietDichVuKyThuats { get; set; }
        public virtual ICollection<GoiDichVuChiTietDichVuKyThuat> GoiDichVuChiTietDichVuKyThuats
        {
            get => _goiDichVuChiTietDichVuKyThuats ?? (_goiDichVuChiTietDichVuKyThuats = new List<GoiDichVuChiTietDichVuKyThuat>());
            protected set => _goiDichVuChiTietDichVuKyThuats = value;
        }

    }
}
