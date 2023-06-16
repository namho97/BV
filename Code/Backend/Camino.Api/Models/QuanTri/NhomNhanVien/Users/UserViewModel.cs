using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.Users
{
    public class UserViewModel : BaseViewModel
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public RegionType Region { get; set; }
        public string HoTen { get; set; }
        public string SoDienThoai { get; set; }
        public string SoChungMinhThu { get; set; }
        public string DiaChi { get; set; }
        public DateTime? NgaySinh { get; set; }
        public LoaiGioiTinh? GioiTinh { get; set; }
        public bool? IsActive { get; set; }
        public string PassCode { get; set; }
        public DateTime? ExpiredCodeDate { get; set; }
        public bool? IsDefault { get; set; }


    }

    public class UserUpdateViewModel : BaseViewModel
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public RegionType Region { get; set; }
    }

    public class UserUpdateExternalViewModel : BaseViewModel
    {
        public string Phone { get; set; }
        public string Email { get; set; }
        public RegionType Region { get; set; }
    }
}
