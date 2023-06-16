using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs.EnumKhoaPhong;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs
{
    public class KhoaPhongQueryInfo: QueryInfo
    {
        public string? Ten { get; set; }

        public string? Ma { get; set; } 

        public EnumLoaiKhoaPhong? LoaiKhoaPhong { get; set; }

        public bool? CoKhamNgoaiTru { get; set; }
        public bool? CoKhamNoiTru { get; set; }

        public bool? HieuLuc { get; set; }
    }
}
