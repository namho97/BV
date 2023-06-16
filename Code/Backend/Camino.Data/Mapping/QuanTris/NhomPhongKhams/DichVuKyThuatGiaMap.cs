using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class DichVuKyThuatGiaMap : CaminoEntityTypeConfiguration<DichVuKyThuatGia>
    {
        public override void Configure(EntityTypeBuilder<DichVuKyThuatGia> builder)
        {
            builder.ToTable(MappingDefaults.DichVuKyThuatGiaTable);

            builder.HasOne(rf => rf.DichVuKyThuat)
                .WithMany(r => r.DichVuKyThuatGias)
                .HasForeignKey(rf => rf.DichVuKyThuatId);

            base.Configure(builder);
        }
    }
}
