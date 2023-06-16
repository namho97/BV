using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs
{
    public class NhomThuocGridVo :GridItem
    {
        public NhomThuocGridVo()
        {
            NodeChilds = new List<NhomThuocGridVo>();
        }
        public long NodeId { get; set; }
        public long? ParentNodeId { get; set; }
        public string NodeName { get; set; }
        public bool Disabled { get; set; }
        public string Icon { get; set; } = "folder";
        public string IconColorClass { get; set; } = "orange";
        public int CapNhom { get; set; }

        public List<NhomThuocGridVo> NodeChilds { get; set; }
    }

}
