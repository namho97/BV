using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus
{
    public class NhomDichVuBenhVien :BaseEntity
    {
        public string Ma { get; set; } = "";

        public string Ten { get; set; } = "";

        public string? MoTa { get; set; }

        public bool IsDefault { get; set; }

        public long? NhomDichVuBenhVienChaId { get; set; }

        public virtual NhomDichVuBenhVien? NhomDichVuBenhVienCha { get; set; }

        private ICollection<NhomDichVuBenhVien>? _nhomDichVuBenhVienChas { get; set; }

        public virtual ICollection<NhomDichVuBenhVien> NhomDichVuBenhViens
        {
            get => _nhomDichVuBenhVienChas ?? (_nhomDichVuBenhVienChas = new List<NhomDichVuBenhVien>());
            protected set => _nhomDichVuBenhVienChas = value;
        }
    }
}
