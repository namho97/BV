using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs.EnumKhoaPhong;

namespace Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs
{
    public class KhoaPhong :BaseEntity
    {
        public string Ten { get; set; } = "";

        public string Ma { get; set; } = "";

        public EnumLoaiKhoaPhong? LoaiKhoaPhong { get; set; }

        public bool? CoKhamNgoaiTru { get; set; }
        public bool? CoKhamNoiTru { get; set; }

        public bool? HieuLuc { get; set; }

        public bool IsDefault { get; set; }

        public string? MoTa { get; set; }
        public long? SoTienThuTamUng { get; set; }
        public int? SoGiuongKeHoach { get; set; }

        private ICollection<KhoaPhongPhongKham>? _khoaPhongPhongKhams;
        public virtual ICollection<KhoaPhongPhongKham> KhoaPhongPhongKhams
        {
            get => _khoaPhongPhongKhams ?? (_khoaPhongPhongKhams = new List<KhoaPhongPhongKham>());
            protected set => _khoaPhongPhongKhams = value;
        }

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
