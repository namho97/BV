using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons
{
    public class VanBangChuyenMonQueryInfo: QueryInfo
    {
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? TenVietTat { get; set; }
    }
}
