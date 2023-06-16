using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats
{
    public  class DichVuKyThuatGridVo :GridItem
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; } 

        public string? MoTa { get; set; }
        public bool? MacDinh { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
