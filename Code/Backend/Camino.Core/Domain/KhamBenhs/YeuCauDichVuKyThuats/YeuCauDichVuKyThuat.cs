using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.TiepNhans;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats
{
    public class YeuCauDichVuKyThuat : BaseEntity
    {
        public long YeuCauTiepNhanId { get; set; }
        public long DichVuKyThuatId { get; set; }
        public string? MaDichVu { get; set; }
        public string TenDichVu { get; set; } = "";
        public decimal? SoLuong { get; set; }
        public decimal? Gia { get; set; }
        public string? MoTa { get; set; }
        public TrangThaiDichVuKyThuatEnum TrangThai { get; set; }
        public long NhanVienChiDinhId { get; set; }
        public long? NoiChiDinhId { get; set; }
        public DateTime ThoiDiemChiDinh { get; set; }
        public long? NhanVienThucHienId { get; set; }
        public long? NoiThucHienId { get; set; }
        public DateTime? ThoiDiemThucHien { get; set; }
        public long? NhanVienHuyId { get; set; }
        public DateTime? ThoiDiemHuy { get; set; }
        public string? LyDoHuy { get; set; }
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public decimal? SoTienBenhNhanDaChi { get; set; }
        public decimal? SoTienMienGiam { get; set; }
        public string? GhiChuMienGiam { get; set; }

        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
        public virtual DichVuKyThuat? DichVuKyThuat { get; set; }
        public virtual NhanVien? NhanVienChiDinh { get; set; }
        public virtual NhanVien? NhanVienThucHien { get; set; }
        public virtual NhanVien? NhanVienHuy { get; set; }

        private ICollection<PhieuChi>? _phieuChis;
        public virtual ICollection<PhieuChi> PhieuChis
        {
            get => _phieuChis ??= new List<PhieuChi>();
            protected set => _phieuChis = value;
        }
        private ICollection<YeuCauDichVuKyThuatLichSuTrangThai>? _yeuCauDichVuKyThuatLichSuTrangThais;
        public virtual ICollection<YeuCauDichVuKyThuatLichSuTrangThai> YeuCauDichVuKyThuatLichSuTrangThais
        {
            get => _yeuCauDichVuKyThuatLichSuTrangThais ??= new List<YeuCauDichVuKyThuatLichSuTrangThai>();
            protected set => _yeuCauDichVuKyThuatLichSuTrangThais = value;
        }
    }
}
