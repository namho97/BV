using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class ToaThuocMauMap : CaminoEntityTypeConfiguration<ToaThuocMau>
    {
        public override void Configure(EntityTypeBuilder<ToaThuocMau> builder)
        {
            builder.ToTable(MappingDefaults.ToaThuocMauTable);

            builder.HasOne(rf => rf.Icd)
                .WithMany(r => r.ToaThuocMaus)
                .HasForeignKey(rf => rf.IcdId);

            builder.HasOne(rf => rf.BacSi)
                .WithMany(r => r.ToaThuocMaus)
                .HasForeignKey(rf => rf.BacSiId);

            base.Configure(builder);
        }
    }
}
