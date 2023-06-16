using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.HuongDanSuDungs
{
    public class HuongDanSuDung : BaseEntity
    {
        public string Ten { get; set; } = "";
        public int? SoThuTu { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
