using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNhanViens
{
    public class UserMap : CaminoEntityTypeConfiguration<User>
    {
        public override void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable(MappingDefaults.UserTable);

            builder.Property(u => u.Email).HasMaxLength(100);
            builder.Property(u => u.PassCode).HasMaxLength(50);

            base.Configure(builder);
        }
    }
}
