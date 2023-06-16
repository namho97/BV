using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs
{
    public class TrieuChungItemTemplate
    {
        public long KeyId { get; set; }
        public string DisplayName { get; set; }
        public int CapNhom { get; set; }
        public long? NhomChaId { get; set; }
    }
}
