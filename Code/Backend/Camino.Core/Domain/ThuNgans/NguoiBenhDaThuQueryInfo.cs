using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.ThuNgans
{
    public class NguoiBenhDaThuQueryInfo : QueryInfo
    {
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }
        public DateTime? NgayTiepNhanTu { get; set; }
        public DateTime? NgayTiepNhanDen { get; set; }


    }
}
