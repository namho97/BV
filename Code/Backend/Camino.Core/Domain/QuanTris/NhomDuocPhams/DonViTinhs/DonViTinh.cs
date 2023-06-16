using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs
{
    public class DonViTinh : BaseEntity
    {

        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
        public string? GhiChu { get; set; }
        public bool? HieuLuc { get; set; }

        private ICollection<DuocPham>? _duocPhams;
        public virtual ICollection<DuocPham> DuocPhams
        {
            get => _duocPhams ??= new List<DuocPham>();
            protected set => _duocPhams = value;
        }
    }
}
