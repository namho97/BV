using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs
{
    public class EnumKhoaPhong
    {
        public enum EnumLoaiKhoaPhong
        {
            [Description("Chức Năng")]
            ChucNang = 1,

            [Description("Lâm Sàng")]
            LamSang = 2,

            [Description("Cận Lâm Sàng")]
            CanLamSang = 3
        }
    }
}
