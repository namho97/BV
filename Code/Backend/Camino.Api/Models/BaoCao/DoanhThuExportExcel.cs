
using Camino.Core.Domain;

namespace Camino.Api.Models.BaoCao
{
    public class DoanhThuExportExcel
    {
        [Width(30)]
        public string? NgayPhatSinhHienThi { get; set; }
        [Width(40)]
        public string HoTen { get; set; } = "";
        [Width(30)]
        public string? TrangThaiThanhToanHienThi { get; set; }
        [Width(20)]
        public string? LoaiDichVuHienThi { get; set; }
        [Width(40)]
        public string? TenDichVu { get; set; }
        [Width(10)]
        public string? DonViTinh { get; set; }
        [Width(15)]
        public decimal? SoLuong { get; set; }
        [Width(15)]
        public decimal? DonGia { get; set; }
        [Width(15)]
        public decimal? ThanhTien { get; set; }
        [Width(15)]
        public decimal? DoanhThu { get; set; }
    }
}
