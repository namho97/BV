using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus
{
    public class NhomDichVuGridVo : GridItem
    {
        public NhomDichVuGridVo()
        {
            NodeChilds = new List<NhomDichVuGridVo>();
        }
        public long NodeId { get; set; }
        public long? ParentNodeId { get; set; }
        public string NodeName { get; set; }
        public bool Disabled { get; set; }
        public string Icon { get; set; } = "folder";
        public string IconColorClass { get; set; } = "orange";

        public List<NhomDichVuGridVo> NodeChilds { get; set; }
    }

    public class NhomDichVuBenhVienTreeViewGridVo : GridItem
    {
        public string? IdCap { get; set; }
        public int? CapNhomDichVuBenhVien { get; set; }
        public long? NhomDichVuBenhVienChaId { get; set; }
        public string? Ma { get; set; }
        public string? Ten { get; set; }
        public string? MoTa { get; set; }
        public string? TenCha { get; set; }
        public string? SearchString { get; set; }
        public bool HasChildren { get; set; }
        public bool? IsDefault { get; set; }
    }
}