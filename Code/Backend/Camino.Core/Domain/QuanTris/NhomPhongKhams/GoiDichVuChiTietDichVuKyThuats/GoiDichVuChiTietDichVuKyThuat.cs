using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats
{
    public class GoiDichVuChiTietDichVuKyThuat : BaseEntity
    {
        public long DichVuKyThuatId { get; set; }

        public long DichVuKyThuatGiaId { get; set; }

        public long GoiDichVuId { get; set; }

        public int SoLan { get; set; }

        public string? GhiChu { get; set; }

        public virtual DichVuKyThuat? DichVuKyThuat { get; set; }

        public virtual DichVuKyThuatGia? DichVuKyThuatGia { get; set; }

        public virtual GoiDichVu? GoiDichVu { get; set; }

    }
}
