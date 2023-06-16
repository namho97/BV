using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams
{
    public class KhoaPhongPhongKham : BaseEntity
    {
        public long KhoaPhongId { get; set; }
        public string Ten { get; set; } = "";
        public string Ma { get; set; } = "";
        public bool? HieuLuc { get; set; }
        public string? Tang { get; set; }

        public virtual KhoaPhong? KhoaPhong { get; set; }

        private ICollection<KhoaPhongNhanVien>? _khoaPhongNhanViens;
        public virtual ICollection<KhoaPhongNhanVien> KhoaPhongNhanViens
        {
            get => _khoaPhongNhanViens ?? (_khoaPhongNhanViens = new List<KhoaPhongNhanVien>());
            protected set => _khoaPhongNhanViens = value;
        }

        private ICollection<Kho>? _khos;
        public virtual ICollection<Kho> Khos
        {
            get => _khos ?? (_khos = new List<Kho>());
            protected set => _khos = value;
        }
    }
}
