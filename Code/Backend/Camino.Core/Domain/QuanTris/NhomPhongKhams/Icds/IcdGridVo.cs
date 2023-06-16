using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds
{
    public class IcdGridVo : GridItem
    {
        public string Ma { get; set; } = "";
        public string TenTiengViet { get; set; } = "";
        public string TenTiengAnh { get; set; } = "";
        public string? ManTinh { get; set; }

        public LoaiGioiTinh? GioiTinh { get; set; }
        public string? GioiTinhDisplay { get; set; }

        public string? BenhThuongGap { get; set; }
        public string? BenhNam { get; set; }
        public string? KhongBaoHiem { get; set; }
        public string? NgoaiDinhSuat { get; set; }

        public string? MoTa { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public bool HieuLuc { get; set; }
        public string HieuLucDisplay { get; set; }
    }
}
