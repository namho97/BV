using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs
{
    public class LichSuKhamQueryInfo : QueryInfo
    {
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }
        public DateTime? NgayHoanThanhTu { get; set; }
        public DateTime? NgayHoanThanhDen { get; set; }
        public List<TrangThaiDichVuKhamEnum>? TrangThais { get; set; }

    }
}
