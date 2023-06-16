using Camino.Core.Domain.CauHinhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.CauHinhs
{
    public class CauHinhMap : CaminoEntityTypeConfiguration<CauHinh>
    {
        public override void Configure(EntityTypeBuilder<CauHinh> builder)
        {
            builder.ToTable(MappingDefaults.CauHinhTable);
            base.Configure(builder);
        }
    }
}
