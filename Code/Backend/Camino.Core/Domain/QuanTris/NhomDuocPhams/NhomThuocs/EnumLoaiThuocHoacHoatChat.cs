using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs
{
    public class EnumLoaiThuocHoacHoatChat
    {
        public enum LoaiThuocHoacHoatChat
        {
            [Description("Tân dược")]
            ThuocTanDuoc = 1,
            [Description("Chế phẩm YHCT")]
            ChePham = 2,
            [Description("Vị thuốc YHCT")]
            ViThuoc = 3,
            [Description("Phóng xạ")]
            PhongXa = 4,
            [Description("Tân dược tự bào chế")]
            TanDuocTuBaoChe = 5,
            [Description("Chế phẩm YHCT tự bào chế")]
            ChePhamTuBaoChe = 6


        }
    }
}
