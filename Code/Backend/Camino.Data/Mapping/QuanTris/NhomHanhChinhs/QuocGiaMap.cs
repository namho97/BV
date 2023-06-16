using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{

    public class QuocGiaMap : CaminoEntityTypeConfiguration<QuocGia>
    {
        public override void Configure(EntityTypeBuilder<QuocGia> builder)
        {
            builder.ToTable(MappingDefaults.QuocGiaTable);

            base.Configure(builder);
        }
    }
}
