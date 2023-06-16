using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams
{
    public class DuocPham : BaseEntity
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";
        public string? TenTiengAnh { get; set; }
        public string? SoDangKy { get; set; }
        public string? HoatChat { get; set; }
        public string? QuyCach { get; set; }
        public string? HamLuong { get; set; }
        public string? TieuChuan { get; set; }
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }

        public long? DonViTinhId { get; set; }
        public long? DuongDungId { get; set; }
        public long? NhaSanXuatId { get; set; }
        public long? NuocSanXuatId { get; set; }
        public string? CachDung { get; set; }

        public virtual DonViTinh? DonViTinh { get; set; }

        public virtual DuongDung? DuongDung { get; set; }
        public virtual NhaSanXuat? NhaSanXuat { get; set; }
        public virtual QuocGia? NuocSanXuat { get; set; }

        private ICollection<ToaThuocMauChiTiet>? _toaThuocMauChiTiets;
        public virtual ICollection<ToaThuocMauChiTiet> ToaThuocMauChiTiets
        {
            get => _toaThuocMauChiTiets ??= new List<ToaThuocMauChiTiet>();
            protected set => _toaThuocMauChiTiets = value;
        }
        private ICollection<YeuCauKhamBenhDonThuocChiTiet>? _yeuCauKhamBenhDonThuocChiTiets;
        public virtual ICollection<YeuCauKhamBenhDonThuocChiTiet> YeuCauKhamBenhDonThuocChiTiets
        {
            get => _yeuCauKhamBenhDonThuocChiTiets ??= new List<YeuCauKhamBenhDonThuocChiTiet>();
            protected set => _yeuCauKhamBenhDonThuocChiTiets = value;
        }

        private ICollection<DuocPhamGia>? _duocPhamGias;
        public virtual ICollection<DuocPhamGia> DuocPhamGias
        {
            get => _duocPhamGias ??= new List<DuocPhamGia>();
            protected set => _duocPhamGias = value;
        }

    }
}
