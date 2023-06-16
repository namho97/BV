using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.NhanViens
{
    public class NhanVienViewModel : BaseViewModel
    {
        public string HoTen { get; set; }
        public int? NamSinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NgaySinh { get; set; }
        public DateTime? NgayThangNamSinh { get; set; }
        public string SoChungMinhThu { get; set; }
        public LoaiGioiTinh? GioiTinh { get; set; }
        public string SoNha { get; set; }
        public long? KhomApId { get; set; }
        public long? PhuongXaId { get; set; }
        public long? QuanHuyenId { get; set; }
        public long? TinhThanhId { get; set; }

        public string SoDienThoai { get; set; }
        public string Email { get; set; }
        public long? RoleId { get; set; }
        public bool? IsActive { get; set; }
        public string? HocViHocHam { get; set; }
        public string? SoChungChiHanhNghe { get; set; }
        public string? PhamViChuyenMon { get; set; }
        public string? MatKhau { get; set; }
        public string? XacNhanMatKhau { get; set; }
    }
    public class NhanVienDoiMatKhauViewModel : BaseViewModel
    {
        public string? MatKhau { get; set; }
        public string? XacNhanMatKhau { get; set; }
    }
}
