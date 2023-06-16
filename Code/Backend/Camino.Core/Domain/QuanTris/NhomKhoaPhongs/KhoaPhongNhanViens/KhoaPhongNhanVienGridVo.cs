using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhonhNhanViens
{
    public class KhoaPhongNhanVienGridVo :GridItem
    {
        public string? TenKhoaPhong { get; set; }
        public string? TenPhongKham { get; set; }
        public string? TenNhanVien { get; set; }
        public bool? LaPhongLamViecChinh { get; set; }
    }
}
