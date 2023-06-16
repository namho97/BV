using Camino.Core.Domain.Templates;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.Templates
{
    public class TemplateMap : CaminoEntityTypeConfiguration<Template>
    {
        public override void Configure(EntityTypeBuilder<Template> builder)
        {
            builder.ToTable(MappingDefaults.TemplateTable);


            base.Configure(builder);
        }
    }
}
