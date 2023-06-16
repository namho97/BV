
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats
{
    public class NhaSanXuat : BaseEntity
    {

        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public bool? HieuLuc { get; set; }
        private ICollection<YeuCauKhamBenhDonThuocChiTiet>? _yeuCauKhamBenhDonThuocChiTiets;
        public virtual ICollection<YeuCauKhamBenhDonThuocChiTiet> YeuCauKhamBenhDonThuocChiTiets
        {
            get => _yeuCauKhamBenhDonThuocChiTiets ??= new List<YeuCauKhamBenhDonThuocChiTiet>();
            protected set => _yeuCauKhamBenhDonThuocChiTiets = value;
        }
        private ICollection<DuocPham>? _duocPhams;
        public virtual ICollection<DuocPham> DuocPhams
        {
            get => _duocPhams ??= new List<DuocPham>();
            protected set => _duocPhams = value;
        }
    }
}
