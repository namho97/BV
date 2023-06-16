using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    public class EnumBoPhan
    {
        public enum BoPhan
        {
            [Description("Tiếp nhận ngoại trú")]
            TiepNhanNgoaiTru = 1,
            [Description("Tiếp nhận nội trú")]
            TiepNhanNoiTru = 2,
            [Description("Khám bệnh")]
            KhamBenh = 3,
            [Description("PTTT")]
            PTTT = 4,
            [Description("Tiêm chủng")]
            TiemChung = 5,
        }
    }
}
