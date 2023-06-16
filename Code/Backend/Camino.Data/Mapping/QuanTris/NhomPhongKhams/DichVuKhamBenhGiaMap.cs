using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class DichVuKhamBenhGiaMap : CaminoEntityTypeConfiguration<DichVuKhamBenhGia>
    {
        public override void Configure(EntityTypeBuilder<DichVuKhamBenhGia> builder)
        {
            builder.ToTable(MappingDefaults.DichVuKhamBenhGiaTable);

            builder.HasOne(rf => rf.DichVuKhamBenh)
                .WithMany(r => r.DichVuKhamBenhGias)
                .HasForeignKey(rf => rf.DichVuKhamBenhId);

            base.Configure(builder);
        }
    }
}
