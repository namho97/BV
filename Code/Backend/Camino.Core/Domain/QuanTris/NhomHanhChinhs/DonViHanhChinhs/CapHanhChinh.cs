using System.ComponentModel;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs
{
    public enum CapHanhChinh
    {
        [Description("Tỉnh/Thành phố")]
        TinhThanhPho = 1,
        [Description("Quận/Huyện")]
        QuanHuyen = 2,
        [Description("Phường/Xã")]
        PhuongXa = 3,
        [Description("Khu Phố/Thôn Xóm")]
        KhomAp = 4
    }
    public enum VungDiaLy
    {
        TayBacBo = 1,

        DongBacBo = 2,

        DongBangSongHong = 3,

        BacTrungBo = 4,

        NamTrungBo = 5,

        TayNguyen = 6,

        DongNamBo = 7,

        DongBangSongCuuLong = 8
    }
}
