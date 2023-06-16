using Camino.Core.Helpers;

namespace Camino.Core.Domain.ThuNgans
{
    public class DichVuDaThuGridVo : GridItem
    {
        public string? SoPhieu { get; set; }
        public decimal? TienMat { get; set; }
        public decimal? ChuyenKhoan { get; set; }
        public decimal? Pos { get; set; }
        public decimal TongSoTienBangSo => (TienMat ?? 0) + (ChuyenKhoan ?? 0) + (Pos ?? 0);
        public string? TongSoTienBangChu => NumberHelper.ChuyenSoRaText(TongSoTienBangSo);
        public string? HinhThucThanhToan
        {
            get
            {
                var result = (TienMat != null ? "Tiền mặt; " : "") + (ChuyenKhoan != null ? "Chuyển khoản; " : "") + (Pos != null ? "Pos; " : "");
                if (!string.IsNullOrEmpty(result))
                {
                    result = result.Substring(0, result.Length - 2);
                }
                return result;
            }
        }
        public string? NoiDungThu { get; set; }
        public DateTime NgayThu { get; set; }
        public string NgayThuHienThi => NgayThu.ApplyFormat();
        public string? NhanVienThu { get; set; }
        public bool? DaHuy { get; set; }
        public DateTime? NgayHuy { get; set; }
        public string NgayHuyHienThi => NgayHuy?.ApplyFormat();
        public string? TenNhanVienHuy { get; set; }
        public string? LyDoHuy { get; set; }


    }
}
