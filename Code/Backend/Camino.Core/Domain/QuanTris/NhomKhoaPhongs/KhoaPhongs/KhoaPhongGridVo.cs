using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs
{
    public  class KhoaPhongGridVo :GridItem
    {
        public string? Ten { get; set; } 

        public string? Ma { get; set; } 

        public string? LoaiKhoaPhong { get; set; }

        public string? CoKhamNgoaiTru { get; set; }
        public string? CoKhamNoiTru { get; set; }

        public bool? HieuLuc { get; set; }

        public bool IsDefault { get; set; }

        public string? MoTa { get; set; }
        public long? SoTienThuTamUng { get; set; }
        public int? SoGiuongKeHoach { get; set; }
    }
}
