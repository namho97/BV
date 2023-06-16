using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKyThuats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{
   
    public class NhomDichVuThuongDungChiTieDichVuKyThuatMap : CaminoEntityTypeConfiguration<GoiDichVuChiTietDichVuKyThuat>
    {
        public override void Configure(EntityTypeBuilder<GoiDichVuChiTietDichVuKyThuat> builder)
        {
            builder.ToTable(MappingDefaults.GoiDichVuChiTietDichVuKyThuatTable);

            builder.HasOne(rf => rf.DichVuKyThuat)
                    .WithMany(r => r.GoiDichVuChiTietDichVuKyThuats)
                    .HasForeignKey(rf => rf.DichVuKyThuatId);

            builder.HasOne(rf => rf.DichVuKyThuatGia)
                .WithMany(r => r.GoiDichVuChiTietDichVuKyThuats)
                .HasForeignKey(rf => rf.DichVuKyThuatGiaId);

            builder.HasOne(rf => rf.GoiDichVu)
                      .WithMany(r => r.GoiDichVuChiTietDichVuKyThuats)
                      .HasForeignKey(rf => rf.GoiDichVuId);

            base.Configure(builder);
        }
    }
}
