using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens
{
    public class KhoaPhongNhanVien :BaseEntity
    {
        public long KhoaPhongId { get; set; }

        public long NhanVienId { get; set; }

        public long? KhoaPhongPhongKhamId { get; set; }

        public bool? LaPhongLamViecChinh { get; set; }

        public virtual KhoaPhongPhongKham? KhoaPhongPhongKham { get; set; }

        public virtual KhoaPhong? KhoaPhong { get; set; }

        public virtual NhanVien? NhanVien { get; set; }
    }
}
