using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNhanViens
{
    public class UserMessagingTokenMap : CaminoEntityTypeConfiguration<UserMessagingToken>
    {
        public override void Configure(EntityTypeBuilder<UserMessagingToken> builder)
        {
            builder.ToTable(MappingDefaults.UserMessagingTokenTable);

            builder.HasOne(rf => rf.User)
                .WithMany(r => r.UserMessagingTokens)
                .HasForeignKey(rf => rf.UserId);

            base.Configure(builder);
        }
    }
}
