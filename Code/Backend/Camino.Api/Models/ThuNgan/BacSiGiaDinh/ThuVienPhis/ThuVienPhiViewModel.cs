using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Domain.ThuNgans;
using Camino.Core.Helpers;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Models.ThuNgan.BacSiGiaDinh.ThuVienPhis
{
    public class ThuVienPhiViewModel : BaseViewModel
    {
        public long YeuCauTiepNhanId { get; set; }
        public decimal? TongThucThu { get; set; }
        public List<HinhThucThanhToanEnum>? HinhThucThanhToan { get; set; }
        public decimal? TienMat { get; set; }
        public decimal? ChuyenKhoan { get; set; }
        public decimal? Pos { get; set; }
        public decimal? NguoiBenhDua { get; set; }
        public DateTime? NgayThu { get; set; }
        public string? NoiDungThu { get; set; }
        public List<DichVuChuaThuGridVo>? DichVus { get; set; }
        public bool? ThuNhanh { get; set; }
    }

    public class ThongTinThuVienPhiViewModel : BaseViewModel
    {
        public ThongTinHanhChinhViewModel ThongTinHanhChinh { get; set; }
        public decimal? TongCong { get; set; }
        public decimal? TongDaThu { get; set; }
        public decimal? TongChuaThu { get; set; }
        public string TongSoTienBangChu => NumberHelper.ChuyenSoRaText((TongChuaThu ?? 0));
    }
    public class DichVuViewModel : BaseViewModel
    {
        public string? Nhom { get; set; }
        public string? Ten { get; set; }
        public float? SoLuong { get; set; }
        public float? DonGia { get; set; }

        public float? ThanhTien => (SoLuong ?? 0) * (DonGia ?? 0);
        public float? MienGiam { get; set; }
        public float? DaThu { get; set; }
        public float? ChuaThu => (ThanhTien ?? 0) - (MienGiam ?? 0) - (DaThu ?? 0) > 0 ? (ThanhTien ?? 0) - (MienGiam ?? 0) - (DaThu ?? 0) : 0;
        public string? GhiChu { get; set; }
        public bool? IsExpanded { get; set; }
    }
    public class HuyPhieuThuViewModel : BaseViewModel
    {
        public string? LyDoHuy { get; set; }
    }
}
