using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.TrangChus
{
    public class TrangChuQueryInfo : QueryInfo
    {
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }


    }
    public class LichHenKhamTheoNgayQueryInfo : QueryInfo
    {
        public DateTime NgayHenKham { get; set; }
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }


    }
    public class DoanhThuTheoNgayQueryInfo : QueryInfo
    {
        public DateTime NgayThu { get; set; }
        public DateTime DenNgay => new DateTime(NgayThu.Year, NgayThu.Month, NgayThu.Day, 23, 59, 59);
        public string? HoTen { get; set; }
        public string? SoDienThoai { get; set; }
        public string? SoPhieu { get; set; }


    }
    public class TinhTrangKhamNgayQueryInfo : QueryInfo
    {
        public DateTime TuNgay { get; set; }
        public DateTime DenNgay { get; set; }
        public string? TrangThai { get; set; }
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }


    }
}
