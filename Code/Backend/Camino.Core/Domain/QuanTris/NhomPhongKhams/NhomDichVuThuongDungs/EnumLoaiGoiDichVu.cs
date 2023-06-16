using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs
{
    public class LoaiGoiDichVu
    {
        public enum EnumLoaiGoiDichVu
        {
            [Description("Marketing")]
            Marketing = 1,

            [Description("Sử dụng trong phòng bác sỹ")]
            TrongPhongBacSy = 2
        }
    }
   
}
