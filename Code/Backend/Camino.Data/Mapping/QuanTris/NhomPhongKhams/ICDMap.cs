using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class ICDMap : CaminoEntityTypeConfiguration<Icd>
    {
        public override void Configure(EntityTypeBuilder<Icd> builder)
        {
            builder.ToTable(MappingDefaults.IcdTable);

            base.Configure(builder);
        }
    }
}
