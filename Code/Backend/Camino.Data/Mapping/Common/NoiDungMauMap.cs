using Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.Common
{
    public class NoiDungMauMap : CaminoEntityTypeConfiguration<NoiDungMau>
    {
        public override void Configure(EntityTypeBuilder<NoiDungMau> builder)
        {
            builder.ToTable(MappingDefaults.NoiDungMauTable);

            base.Configure(builder);
        }
    }
}
