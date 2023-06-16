using Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomVatTus
{
    public class NhomVatTuMap : CaminoEntityTypeConfiguration<NhomVatTu>
    {
        public override void Configure(EntityTypeBuilder<NhomVatTu> builder)
        {
            builder.ToTable(MappingDefaults.NhomVatTuTable);


            base.Configure(builder);
        }
    }
}
