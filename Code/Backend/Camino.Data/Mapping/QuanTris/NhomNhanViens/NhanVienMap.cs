using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNhanViens
{
    public class NhanVienMap : CaminoEntityTypeConfiguration<NhanVien>
    {
        public override void Configure(EntityTypeBuilder<NhanVien> builder)
        {
            builder.ToTable(MappingDefaults.NhanVienTable);

            builder.HasOne(rf => rf.User)
              .WithOne(r => r.NhanVien).
              HasForeignKey<NhanVien>(c => c.Id);

            builder.HasOne(rf => rf.ChucDanh)
                .WithMany(r => r.NhanViens)
                .HasForeignKey(rf => rf.ChucDanhId);

            base.Configure(builder);
        }
    }
}
