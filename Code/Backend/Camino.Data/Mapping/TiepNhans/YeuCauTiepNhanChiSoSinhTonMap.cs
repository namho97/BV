using Camino.Core.Domain.TiepNhans;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.TiepNhans
{
    public class YeuCauTiepNhanChiSoSinhTonMap : CaminoEntityTypeConfiguration<YeuCauTiepNhanChiSoSinhTon>
    {
        public override void Configure(EntityTypeBuilder<YeuCauTiepNhanChiSoSinhTon> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauTiepNhanChiSoSinhTonTable);

            builder.HasOne(rf => rf.YeuCauTiepNhan)
                .WithMany(r => r.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans)
                .HasForeignKey(rf => rf.YeuCauTiepNhanId);

            builder.HasOne(rf => rf.NhanVienThucHien)
                .WithMany(r => r.YeuCauTiepNhanChiSoSinhTonNhanVienThucHiens)
                .HasForeignKey(rf => rf.NhanVienThucHienId);

            base.Configure(builder);
        }
    }
}
