using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons
{
    public class VanBangChuyenMon :BaseEntity
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";
        public string? TenVietTat { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
