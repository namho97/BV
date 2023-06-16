using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs
{
    public class TrieuChung :BaseEntity
    {
        public string Ten { get; set; } = "";
        public long? TrieuChungChaId { get; set; }
        public int CapNhom { get; set; }

        public virtual TrieuChung? TrieuChungCha { get; set; }

        private ICollection<TrieuChung>? _trieuChungs;
        public virtual ICollection<TrieuChung> TrieuChungs
        {
            get => _trieuChungs ??= new List<TrieuChung>();
            protected set => _trieuChungs = value;
        }
    }
}
