using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs
{
    public class ChucDanhGridVo :GridItem
    {
        public string? Ten { get; set; }
        public string? Ma { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public bool? IsDefault { get; set; }
    }
}
