using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNhanViens
{
    public class UserMessagingTokenSubscribeMap : CaminoEntityTypeConfiguration<UserMessagingTokenSubscribe>
    {
        public override void Configure(EntityTypeBuilder<UserMessagingTokenSubscribe> builder)
        {
            builder.ToTable(MappingDefaults.UserMessagingTokenSubscribeTable);

            builder.HasOne(rf => rf.UserMessagingToken)
                .WithMany(r => r.UserMessagingTokenSubscribes)
                .HasForeignKey(rf => rf.UserMessagingTokenId);

            base.Configure(builder);
        }
    }
}
