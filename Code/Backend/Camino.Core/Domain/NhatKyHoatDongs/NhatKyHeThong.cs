using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.NhatKyHoatDongs
{
    public class NhatKyHeThong : BaseEntity
    {
        public LoaiNhatKyHoatDong HoatDong { get; set; }
        public string? MaDoiTuong { get; set; }
        public long? IdDoiTuong { get; set; }
        public string NoiDung { get; set; } = null!;
        public virtual User? User { get; set; }
    }
}
