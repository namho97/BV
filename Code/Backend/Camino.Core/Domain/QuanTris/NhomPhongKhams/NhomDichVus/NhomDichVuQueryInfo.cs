using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus
{
    public class NhomDichVuQueryInfo : QueryInfo
    {
        public string? TenNhom { get; set; }
        public long? HieuLucId { get; set; }
    }
}
