using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{

    public class DuongDungMap : CaminoEntityTypeConfiguration<DuongDung>
    {
        public override void Configure(EntityTypeBuilder<DuongDung> builder)
        {
            builder.ToTable(MappingDefaults.DuongDungTable);


            base.Configure(builder);
        }
    }
}
