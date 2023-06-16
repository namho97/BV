using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.KhamBenhs
{
    public class YeuCauKhamBenhLichSuTrangThaiMap : CaminoEntityTypeConfiguration<YeuCauKhamBenhLichSuTrangThai>
    {
        public override void Configure(EntityTypeBuilder<YeuCauKhamBenhLichSuTrangThai> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauKhamBenhLichSuTrangThaiTable);

            builder.HasOne(rf => rf.YeuCauKhamBenh)
                .WithMany(r => r.YeuCauKhamBenhLichSuTrangThais)
                .HasForeignKey(rf => rf.YeuCauKhamBenhId);

            base.Configure(builder);
        }
    }
}
