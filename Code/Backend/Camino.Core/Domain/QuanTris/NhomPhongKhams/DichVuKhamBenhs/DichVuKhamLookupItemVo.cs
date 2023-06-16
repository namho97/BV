using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs
{
    public class DichVuKhamLookupItemVo : LookupItemVo
    {
        public decimal? Gia { get; set; }
        public long? DichVuKhamGiaId { get; set; }
    }
}
