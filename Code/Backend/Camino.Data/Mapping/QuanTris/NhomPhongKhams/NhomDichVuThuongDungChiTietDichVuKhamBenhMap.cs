using Camino.Core.Domain.QuanTris.NhomPhongKhams.GoiDichVuChiTietDichVuKhamBenhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{
    public class NhomDichVuThuongDungChiTietDichVuKhamBenhMap : CaminoEntityTypeConfiguration<GoiDichVuChiTietDichVuKhamBenh>
    {
        public override void Configure(EntityTypeBuilder<GoiDichVuChiTietDichVuKhamBenh> builder)
        {
            builder.ToTable(MappingDefaults.GoiDichVuChiTietDichVuKhamBenhTable);

            builder.HasOne(rf => rf.DichVuKhamBenh)
                    .WithMany(r => r.GoiDichVuChiTietDichVuKhamBenhs)
                    .HasForeignKey(rf => rf.DichVuKhamBenhId);

            builder.HasOne(rf => rf.DichVuKhamBenhGia)
                .WithMany(r => r.GoiDichVuChiTietDichVuKhamBenhs)
                .HasForeignKey(rf => rf.DichVuKhamBenhGiaId);

            builder.HasOne(rf => rf.GoiDichVu)
                      .WithMany(r => r.GoiDichVuChiTietDichVuKhamBenhs)
                      .HasForeignKey(rf => rf.GoiDichVuId);

            base.Configure(builder);
        }
    }
}
