
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets
{
    public class YeuCauKhamBenhDonThuocChiTiet : BaseEntity
    {
        public long YeuCauKhamBenhDonThuocId { get; set; }
        public long DuocPhamId { get; set; }
        public string? Ma { get; set; }
        public string Ten { get; set; } = "";
        public string? TenTiengAnh { get; set; }
        public string? SoDangKy { get; set; }
        public string? HoatChat { get; set; }
        public string? DuongDung { get; set; }
        public long? NhaSanXuatId { get; set; }
        public long? NuocSanXuatId { get; set; }
        public string? DonViTinh { get; set; }
        public string? QuyCach { get; set; }
        public string? HamLuong { get; set; }
        public string? TieuChuan { get; set; }
        public decimal SoLuong { get; set; }
        public int? SoNgayDung { get; set; }
        public decimal? SoLuongSang { get; set; }
        public decimal? SoLuongTrua { get; set; }
        public decimal? SoLuongChieu { get; set; }
        public decimal? SoLuongToi { get; set; }
        public string? GhiChu { get; set; }
        public int? SoThuTu { get; set; }
        public bool? KhongMua { get; set; }
        public decimal? Gia { get; set; }
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public decimal? SoTienBenhNhanDaChi { get; set; }
        public virtual YeuCauKhamBenhDonThuoc? YeuCauKhamBenhDonThuoc { get; set; }
        public virtual DuocPham? DuocPham { get; set; }
        public virtual NhaSanXuat? NhaSanXuat { get; set; }
        public virtual QuocGia? NuocSanXuat { get; set; }

        private ICollection<PhieuChi>? _phieuChis;
        public virtual ICollection<PhieuChi> PhieuChis
        {
            get => _phieuChis ??= new List<PhieuChi>();
            protected set => _phieuChis = value;
        }
    }
}
