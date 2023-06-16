using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNhanViens
{
    public class RoleFunctionMap : CaminoEntityTypeConfiguration<RoleFunction>
    {
        public override void Configure(EntityTypeBuilder<RoleFunction> builder)
        {
            builder.ToTable(MappingDefaults.RoleFunctionTable);

            builder.HasOne(rf => rf.Role)
                .WithMany(r => r.RoleFunctions)
                .HasForeignKey(rf => rf.RoleId)
                .IsRequired();

            base.Configure(builder);
        }
    }
}
