using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucVus
{
    public class ChucVu :BaseEntity
    {
        public string? TenVietTat { get; set; }
        public string? Ten { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
