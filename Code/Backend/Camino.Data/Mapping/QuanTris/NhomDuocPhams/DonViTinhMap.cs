using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{

    public class DonViTinhMap : CaminoEntityTypeConfiguration<DonViTinh>
    {
        public override void Configure(EntityTypeBuilder<DonViTinh> builder)
        {
            builder.ToTable(MappingDefaults.DonViTinhTable);


            base.Configure(builder);
        }
    }
}
