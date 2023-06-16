using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.LoaiBenhViens
{
    public class LoaiBenhVien : BaseEntity
    {

        public string Ten { get; set; } = "";
        public string? MoTa { get; set; }

        private ICollection<BenhVien>? _benhViens;
        public virtual ICollection<BenhVien> BenhViens
        {
            get => _benhViens ??= new List<BenhVien>();
            protected set => _benhViens = value;
        }
    }
}
