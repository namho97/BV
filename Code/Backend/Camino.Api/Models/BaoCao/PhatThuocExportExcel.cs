using Camino.Core.Domain;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Models.BaoCao
{
    public class PhatThuocExportExcel
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
        public string? NgayPhatThuocHienThi { get; set; }
        [Width(20)]
        public string? TenThuoc { get; set; }
        [Width(20)]
        public string? SoDangKy { get; set; }
        [Width(20)]
        public string? DonViTinh { get; set; }
        [Width(20)]
        public decimal? SoLuong { get; set; }
        [Width(20)]
        public decimal? DonGia { get; set; }
        [Width(20)]
        public decimal? ThanhTien { get; set; }
        [Width(20)]
        public decimal? DoanhThu { get; set; }

        [Width(20)]
        public string? TrangThaiHienThi { get; set; }

    }
}
