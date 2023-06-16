

using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs
{
    public class YeuCauKhamBenhHinhAnhCanLamSang : BaseEntity
    {
        public long YeuCauKhamBenhId { get; set; }
        public LoaiKetQuaEnum LoaiKetQua { get; set; }
        public string Ten { get; set; } = "";
        public string TenGuid { get; set; } = "";
        public string DuongDan { get; set; } = "";
        public string? LoaiTapTin { get; set; }
        public long KichThuoc { get; set; }
        public string? MoTa { get; set; }
        public virtual YeuCauKhamBenh? YeuCauKhamBenh { get; set; }
    }
}
