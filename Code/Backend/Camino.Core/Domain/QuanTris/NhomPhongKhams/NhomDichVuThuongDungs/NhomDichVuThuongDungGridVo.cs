using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    public  class NhomDichVuThuongDungGridVo:GridItem
    {
        public string? TenNhom { get; set; }
        public bool? HieuLuc { get; set; }
        public string? MoTa { get; set; }
    }
}
