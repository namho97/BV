using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.KhoaPhongPhongKhams
{
    public class KhoaPhongPhongKhamQueryInfo : QueryInfo
    {
        public string? TenKhoaPhong { get; set; }
        public string? TenPhongKham { get; set; }
        public string? Ma { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
