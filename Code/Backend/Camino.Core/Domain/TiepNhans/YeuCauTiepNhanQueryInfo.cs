using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.TiepNhans
{
    public class YeuCauTiepNhanQueryInfo : QueryInfo
    {
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }
        public DateTime? NgayTiepNhanTu { get; set; }
        public DateTime? NgayTiepNhanDen { get; set; }
        public DateTime? NgayHoanThanhTu { get; set; }
        public DateTime? NgayHoanThanhDen { get; set; }
        public List<TrangThaiYeuCauTiepNhanEnum>? TrangThais { get; set; }


    }
}
