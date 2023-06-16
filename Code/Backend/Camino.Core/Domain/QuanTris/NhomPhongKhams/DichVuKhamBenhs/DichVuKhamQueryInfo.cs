using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs
{
    public class DichVuKhamQueryInfo : QueryInfo
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public long? HieuLucId { get; set; }
    }
}
