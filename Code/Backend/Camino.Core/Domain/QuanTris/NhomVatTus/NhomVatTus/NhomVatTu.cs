using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus
{
    public class NhomVatTu :BaseEntity
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";
        public long? NhomVatTuChaId { get; set; }
        public int CapNhom { get; set; }

        public virtual NhomVatTu? nhomVatTu { get; set; }

        private ICollection<NhomVatTu>? _nhomVatTus;
        public virtual ICollection<NhomVatTu> NhomVatTus
        {
            get => _nhomVatTus ?? (_nhomVatTus = new List<NhomVatTu>());
            protected set => _nhomVatTus = value;
        }
    }

}
