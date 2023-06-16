using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Api.Models.QuanTri.NhomNguoiBenh.NguoiBenh
{
    public class NguoiBenhViewModel : BaseViewModel
    {
        public string? HoTen { get; set; }
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public DateTime? NgayThangNamSinh { get; set; }
        public string? SoChungMinhThu { get; set; }
        public LoaiGioiTinh? GioiTinh { get; set; }
        public string? SoDienThoai { get; set; }

        public string? NgheNghiep { get; set; }
        public long? NgheNghiepId { get; set; }
        public long? TinhThanhId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? KhomApId { get; set; }

        public string? SoNha { get; set; }
        public string? HoTenNguoiGiamHo { get; set; }

        public long? DanTocId { get; set; }
        public long? QuocTichId { get; set; }
        public string? NoiLamViec { get; set; }
        public string? Email { get; set; }
        public string? TienSuBenhBanThan { get; set; }
        public string? TienSuBenhGiaDinh { get; set; }
        public string? TienSuDiUng { get; set; }
    }
}
