using System.ComponentModel;

namespace Camino.Core.Domain.NhatKyHoatDongs
{
    public enum LoaiNhatKyHoatDong
    {
        [Description("Tất cả")]
        TatCa = 0,
        [Description("Đăng nhập")]
        DangNhap = 1,
        [Description("Đăng xuất")]
        DangXuat = 2,
        [Description("Thêm")]
        Them = 3,
        [Description("Cập nhật")]
        CapNhat = 4,
        [Description("Xóa")]
        Xoa = 5
    }
}
