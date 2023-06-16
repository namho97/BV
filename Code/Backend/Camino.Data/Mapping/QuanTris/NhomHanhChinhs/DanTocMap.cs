using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{

    public class DanTocMap : CaminoEntityTypeConfiguration<DanToc>
    {
        public override void Configure(EntityTypeBuilder<DanToc> builder)
        {
            builder.ToTable(MappingDefaults.DanTocTable);

            builder.HasOne(rf => rf.QuocGia)
                .WithMany(r => r.DanTocs)
                .HasForeignKey(rf => rf.QuocGiaId);

            base.Configure(builder);
        }
    }
}
