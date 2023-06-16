using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.DichVuKyThuats
{
    public class YeuCauDichVuKyThuatLichSuTrangThaiMap : CaminoEntityTypeConfiguration<YeuCauDichVuKyThuatLichSuTrangThai>
    {
        public override void Configure(EntityTypeBuilder<YeuCauDichVuKyThuatLichSuTrangThai> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauDichVuKyThuatLichSuTrangThaiTable);

            builder.HasOne(rf => rf.YeuCauDichVuKyThuat)
                .WithMany(r => r.YeuCauDichVuKyThuatLichSuTrangThais)
                .HasForeignKey(rf => rf.YeuCauDichVuKyThuatId);

            base.Configure(builder);
        }
    }
}
