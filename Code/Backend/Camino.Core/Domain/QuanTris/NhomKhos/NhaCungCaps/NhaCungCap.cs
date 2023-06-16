using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps
{
    public class NhaCungCap :BaseEntity
    {
        public string Ma { get; set; } = "";
        public string Ten { get; set; } = "";

        public string? DiaChi { get; set; }

        public string? MaSoThue { get; set; }

        public string? TaiKhoanNganHang { get; set; }

        public string? NguoiDaiDien { get; set; }

        public string? NguoiLienHe { get; set; }

        public string? SoDienThoaiLienHe { get; set; }
        public string? EmailLienHe { get; set; }
    }
}
