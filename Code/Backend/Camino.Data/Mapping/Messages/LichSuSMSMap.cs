using Camino.Core.Domain.Messages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.Messages
{
    class LichSuSMSMap : CaminoEntityTypeConfiguration<LichSuSMS>
    {
        public override void Configure(EntityTypeBuilder<LichSuSMS> builder)
        {
            builder.ToTable(MappingDefaults.LichSuSMSTable);
            base.Configure(builder);
        }
    }
}
