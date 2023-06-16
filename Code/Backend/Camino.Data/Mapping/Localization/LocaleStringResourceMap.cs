using Camino.Core.Domain.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.Localization
{
    public class LocaleStringResourceMap : CaminoEntityTypeConfiguration<LocaleStringResource>
    {
        public override void Configure(EntityTypeBuilder<LocaleStringResource> builder)
        {
            builder.ToTable(MappingDefaults.LocaleStringResourceTable);
            base.Configure(builder);
        }
    }
}
