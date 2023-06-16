using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{
    public class DuocPhamMap : CaminoEntityTypeConfiguration<DuocPham>
    {
        public override void Configure(EntityTypeBuilder<DuocPham> builder)
        {
            builder.ToTable(MappingDefaults.DuocPhamTable);

            builder.HasOne(rf => rf.DonViTinh)
                .WithMany(r => r.DuocPhams)
                .HasForeignKey(rf => rf.DonViTinhId);

            builder.HasOne(rf => rf.DuongDung)
                .WithMany(r => r.DuocPhams)
                .HasForeignKey(rf => rf.DuongDungId);

            builder.HasOne(rf => rf.NhaSanXuat)
                .WithMany(r => r.DuocPhams)
                .HasForeignKey(rf => rf.NhaSanXuatId);

            builder.HasOne(rf => rf.NuocSanXuat)
                .WithMany(r => r.DuocPhams)
                .HasForeignKey(rf => rf.NuocSanXuatId);

            base.Configure(builder);
        }
    }
}
