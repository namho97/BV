using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats
{
    public class YeuCauDichVuKyThuatLichSuTrangThai : BaseEntity
    {
        public long YeuCauDichVuKyThuatId { get; set; }
        public TrangThaiDichVuKyThuatEnum TrangThai { get; set; }
        public string? GhiChu { get; set; }


        public virtual YeuCauDichVuKyThuat? YeuCauDichVuKyThuat { get; set; }
    }
}
