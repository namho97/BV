using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus
{
    public class ViTriDeDuocPhamVatTuGridVo : GridItem
    {
        public string? Kho { get; set; }
        public string? Ten { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
