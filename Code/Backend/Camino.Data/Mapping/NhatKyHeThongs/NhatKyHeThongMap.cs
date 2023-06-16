
using Camino.Core.Domain.NhatKyHoatDongs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.NhatKyHeThongs
{
    public class QuanLyNhatKyHeThongMap : CaminoEntityTypeConfiguration<NhatKyHeThong>
    {
        public override void Configure(EntityTypeBuilder<NhatKyHeThong> builder)
        {
            builder.ToTable(MappingDefaults.NhatKyHeThongTable);

            builder.HasOne(rf => rf.User)
                .WithMany(r => r.NhatKyHeThongs)
                .HasForeignKey(rf => rf.CreatedById)
                .IsRequired();

            builder.Property(x => x.NoiDung).HasMaxLength(2000);
            builder.Property(x => x.MaDoiTuong).HasMaxLength(20);
            base.Configure(builder);
        }
    }
}
