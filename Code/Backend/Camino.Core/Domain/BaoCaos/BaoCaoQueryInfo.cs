using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.BaoCaos
{
    public class BaoCaoDoanhThuQueryInfo : QueryInfo
    {
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public LoaiNhomDichVuEnum? LoaiDichVu { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? LoadAll { get; set; }


    }
    public class BaoCaoHenKhamQueryInfo : QueryInfo
    {
        public TrangThaiYeuCauTiepNhanEnum? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? LoadAll { get; set; }
    }
    public class BaoCaoKhamBenhQueryInfo : QueryInfo
    {
        public TrangThaiDichVuKhamEnum? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? LoadAll { get; set; }
    }
    public class BaoCaoPhatThuocQueryInfo : QueryInfo
    {
        public TrangThaiDonThuocEnum? TrangThai { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }
        public bool? LoadAll { get; set; }
    }
}
