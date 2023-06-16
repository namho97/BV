using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomKhos
{
    public class KhoMap : CaminoEntityTypeConfiguration<Kho>
    {
        public override void Configure(EntityTypeBuilder<Kho> builder)
        {
            builder.ToTable(MappingDefaults.KhoTable);

            builder.HasOne(rf => rf.KhoaPhong)
                .WithMany(r => r.Khos)
                .HasForeignKey(rf => rf.KhoaPhongId);

            builder.HasOne(rf => rf.PhongBenhVien)
                .WithMany(r => r.Khos)
                .HasForeignKey(rf => rf.PhongBenhVienId);

            base.Configure(builder);
        }
    }
}
