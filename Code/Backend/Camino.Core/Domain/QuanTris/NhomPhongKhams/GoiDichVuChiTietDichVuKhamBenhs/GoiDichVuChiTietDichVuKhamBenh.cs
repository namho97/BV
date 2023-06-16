using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs
{
    public class GoiDichVuChiTietDichVuKhamBenh:BaseEntity
    {
        public long GoiDichVuId { get; set; }

        public long DichVuKhamBenhId { get; set; }

        public long DichVuKhamBenhGiaId { get; set; }

        public int SoLan { get; set; }

        public string? GhiChu { get; set; }

        public virtual DichVuKhamBenh? DichVuKhamBenh { get; set; }

        public virtual DichVuKhamBenhGia? DichVuKhamBenhGia { get; set; }

        public virtual GoiDichVu? GoiDichVu { get; set; }
    }
}
