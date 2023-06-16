using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.TiepNhans;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs
{
    public class DanToc : BaseEntity
    {

        public long QuocGiaId { get; set; }
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }
        public virtual QuocGia? QuocGia { get; set; }

        private ICollection<YeuCauTiepNhan>? _yeuCauTiepNhans;
        public virtual ICollection<YeuCauTiepNhan> YeuCauTiepNhans
        {
            get => _yeuCauTiepNhans ??= new List<YeuCauTiepNhan>();
            protected set => _yeuCauTiepNhans = value;
        }
        private ICollection<NguoiBenh>? _nguoiBenhs;
        public virtual ICollection<NguoiBenh> NguoiBenhs
        {
            get => _nguoiBenhs ??= new List<NguoiBenh>();
            protected set => _nguoiBenhs = value;
        }
    }
}
