using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.ThuNgans.PhieuThus
{
    public class PhieuThu : BaseEntity
    {

        public long YeuCauTiepNhanId { get; set; }
        public long NguoiBenhId { get; set; }
        public decimal? TienMat { get; set; }
        public decimal? ChuyenKhoan { get; set; }
        public decimal? POS { get; set; }
        public DateTime NgayThu { get; set; }
        public string? NoiDungThu { get; set; }
        public string? SoPhieu { get; set; }
        public long NhanVienThucHienId { get; set; }
        public bool? DaHuy { get; set; }
        public DateTime? NgayHuy { get; set; }
        public long? NhanVienHuyId { get; set; }
        public string? LyDoHuy { get; set; }
        public string? GhiChu { get; set; }
        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
        public virtual NguoiBenh? NguoiBenh { get; set; }
        public virtual NhanVien? NhanVienThucHien { get; set; }
        public virtual NhanVien? NhanVienHuy { get; set; }

        private ICollection<PhieuChi>? _phieuChis;
        public virtual ICollection<PhieuChi> PhieuChis
        {
            get => _phieuChis ??= new List<PhieuChi>();
            protected set => _phieuChis = value;
        }
    }
}
