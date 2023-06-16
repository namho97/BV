using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class BenhVienMap : CaminoEntityTypeConfiguration<BenhVien>
    {
        public override void Configure(EntityTypeBuilder<BenhVien> builder)
        {
            builder.ToTable(MappingDefaults.BenhVienTable);

            builder.HasOne(rf => rf.LoaiBenhVien)
                .WithMany(r => r.BenhViens)
                .HasForeignKey(rf => rf.LoaiBenhVienId);

            base.Configure(builder);
        }
    }
}
