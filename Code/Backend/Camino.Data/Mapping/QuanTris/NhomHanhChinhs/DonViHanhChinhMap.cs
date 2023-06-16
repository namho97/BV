using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{
    public class DonViHanhChinhMap : CaminoEntityTypeConfiguration<DonViHanhChinh>
    {
        public override void Configure(EntityTypeBuilder<DonViHanhChinh> builder)
        {
            builder.ToTable(MappingDefaults.DonViHanhChinhTable);

            builder.HasOne(rf => rf.TrucThuocDonViHanhChinh)
                .WithMany(r => r.TrucThuocDonViHanhChinhs)
                .HasForeignKey(rf => rf.TrucThuocDonViHanhChinhId);

            base.Configure(builder);
        }
    }
}
