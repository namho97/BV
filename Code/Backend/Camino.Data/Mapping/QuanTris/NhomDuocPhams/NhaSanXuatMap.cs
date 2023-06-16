using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{

    public class NhaSanXuatMap : CaminoEntityTypeConfiguration<NhaSanXuat>
    {
        public override void Configure(EntityTypeBuilder<NhaSanXuat> builder)
        {
            builder.ToTable(MappingDefaults.NhaSanXuatTable);


            base.Configure(builder);
        }
    }
}
