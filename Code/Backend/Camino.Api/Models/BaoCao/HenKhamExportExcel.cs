using Camino.Core.Domain;

namespace Camino.Api.Models.BaoCao
{
    public class HenKhamExportExcel
    {
        [Width(15)]
        public string? MaNguoiBenh { get; set; }
        [Width(40)]
        public string HoTen { get; set; } = "";
        [Width(20)]
        public string? GioiTinhHienThi { get; set; }
        [Width(20)]
        public string? NgayThangNamSinh { get; set; }
        [Width(20)]
        public string? SoDienThoai { get; set; }
        [Width(20)]
        public string? DiaChiDayDu { get; set; }
        [Width(20)]
        public string? NgayHenKhamHienThi { get; set; }
        [Width(20)]
        public string? GioHenKhamHienThi { get; set; }
        [Width(20)]
        public string? HinhThucHenHienThi { get; set; }

        [Width(20)]
        public string? TrangThaiHienThi { get; set; }
    }
}
