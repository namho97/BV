
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.TiepNhans
{
    public class YeuCauTiepNhanChiSoSinhTon : BaseEntity
    {
        public long YeuCauTiepNhanId { get; set; }
        public decimal? NhietDo { get; set; }
        public int? HuyetApTamThu { get; set; }
        public int? HuyetApTamTruong { get; set; }
        public int? NhipTho { get; set; }
        public int? Mach { get; set; }
        public decimal? ChieuCao { get; set; }
        public decimal? CanNang { get; set; }
        public decimal? Bmi { get; set; }
        public decimal? SpO2 { get; set; }
        public long NhanVienThucHienId { get; set; }
        public long? NoiThucHienId { get; set; }
        public DateTime ThoiDiemThucHien { get; set; }
        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
        public virtual NhanVien? NhanVienThucHien { get; set; }

    }
}
