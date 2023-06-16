using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs
{
    public class YeuCauKhamBenhLichSuTrangThai : BaseEntity
    {
        public long YeuCauKhamBenhId { get; set; }
        public TrangThaiDichVuKhamEnum TrangThai { get; set; }
        public string? GhiChu { get; set; }


        public virtual YeuCauKhamBenh? YeuCauKhamBenh { get; set; }
    }
}
