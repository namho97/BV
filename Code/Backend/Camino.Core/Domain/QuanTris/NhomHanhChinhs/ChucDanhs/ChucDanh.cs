using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs
{
    public class ChucDanh :BaseEntity
    {
        public string Ten { get; set; } = "";
        public string? Ma { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public bool? IsDefault { get; set; }


        private ICollection<NhanVien>? _nhanViens;

        public virtual ICollection<NhanVien> NhanViens
        {
            get => _nhanViens ?? (_nhanViens = new List<NhanVien>());
            protected set => _nhanViens = value;
        }
    }
}
