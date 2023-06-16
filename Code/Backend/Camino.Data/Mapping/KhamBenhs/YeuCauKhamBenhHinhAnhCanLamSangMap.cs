using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.KhamBenhs
{
    public class YeuCauKhamBenhHinhAnhCanLamSangMap : CaminoEntityTypeConfiguration<YeuCauKhamBenhHinhAnhCanLamSang>
    {
        public override void Configure(EntityTypeBuilder<YeuCauKhamBenhHinhAnhCanLamSang> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauKhamBenhHinhAnhCanLamSangTable);

            builder.HasOne(rf => rf.YeuCauKhamBenh)
                .WithMany(r => r.YeuCauKhamBenhHinhAnhCanLamSangs)
                .HasForeignKey(rf => rf.YeuCauKhamBenhId);


            base.Configure(builder);
        }
    }
}
