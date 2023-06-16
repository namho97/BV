using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs
{
    public class DanTocQueryInfo : QueryInfo
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = null!;
    }
}
