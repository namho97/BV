using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.TiepNhans
{
    public class YeuCauTiepNhanLichSuTrangThai : BaseEntity
    {
        public long YeuCauTiepNhanId { get; set; }
        public TrangThaiYeuCauTiepNhanEnum TrangThai { get; set; }
        public string? GhiChu { get; set; }


        public virtual YeuCauTiepNhan? YeuCauTiepNhan { get; set; }
    }
}
