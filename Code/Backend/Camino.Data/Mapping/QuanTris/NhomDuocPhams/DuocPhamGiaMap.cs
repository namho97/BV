using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{
    public class DuocPhamGiaMap : CaminoEntityTypeConfiguration<DuocPhamGia>
    {
        public override void Configure(EntityTypeBuilder<DuocPhamGia> builder)
        {
            builder.ToTable(MappingDefaults.DuocPhamGiaTable);

            builder.HasOne(rf => rf.DuocPham)
                .WithMany(r => r.DuocPhamGias)
                .HasForeignKey(rf => rf.DuocPhamId);

            base.Configure(builder);
        }
    }
}
