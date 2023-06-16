using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus
{
    public class NhomVatTuGridVo : GridItem
    {
        public NhomVatTuGridVo()
        {
            NodeChilds = new List<NhomVatTuGridVo>();
        }
        public long NodeId { get; set; }
        public long? ParentNodeId { get; set; }
        public string NodeName { get; set; }
        public bool Disabled { get; set; }
        public string Icon { get; set; } = "folder";
        public string IconColorClass { get; set; } = "orange";
        public int CapNhom { get; set; }

        public List<NhomVatTuGridVo> NodeChilds { get; set; }
    }
}
