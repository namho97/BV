using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.ThuNgans.PhieuChis
{
    public class PhieuChi : BaseEntity
    {

        public long PhieuThuId { get; set; }
        public long NguoiBenhId { get; set; }
        public long YeuCauTiepNhanId { get; set; }
        public long? YeuCauKhamBenhId { get; set; }
        public long? YeuCauDichVuKyThuatId { get; set; }
        public long? YeuCauKhamBenhDonThuocChiTietId { get; set; }
        public decimal? SoTienChi { get; set; }
        public DateTime NgayChi { get; set; }
        public string? NoiDungChi { get; set; }
        public long NhanVienThucHienId { get; set; }
        public bool? DaHuy { get; set; }
        public DateTime? NgayHuy { get; set; }
        public long? NhanVienHuyId { get; set; }
        public string? LyDoHuy { get; set; }
        public string? GhiChu { get; set; }
        public string? SoPhieu { get; set; }
        public virtual NguoiBenh? NguoiBenh { get; set; }
        public virtual PhieuThu? PhieuThu { get; set; }
        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
        public virtual YeuCauKhamBenh? YeuCauKhamBenh { get; set; }
        public virtual YeuCauDichVuKyThuat? YeuCauDichVuKyThuat { get; set; }
        public virtual YeuCauKhamBenhDonThuocChiTiet? YeuCauKhamBenhDonThuocChiTiet { get; set; }
        public virtual NhanVien? NhanVienThucHien { get; set; }
        public virtual NhanVien? NhanVienHuy { get; set; }

    }
}
