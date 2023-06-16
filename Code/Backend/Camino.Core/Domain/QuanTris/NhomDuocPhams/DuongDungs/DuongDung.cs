using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs
{
    public class DuongDung : BaseEntity
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

        private ICollection<ThuocHoacHoatChat>? _thuocHoacHoatChats;
        public virtual ICollection<ThuocHoacHoatChat> ThuocHoacHoatChats
        {
            get => _thuocHoacHoatChats ?? (_thuocHoacHoatChats = new List<ThuocHoacHoatChat>());
            protected set => _thuocHoacHoatChats = value;
        }
    }
}
