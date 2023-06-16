using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class DichVuKyThuatMap : CaminoEntityTypeConfiguration<DichVuKyThuat>
    {
        public override void Configure(EntityTypeBuilder<DichVuKyThuat> builder)
        {
            builder.ToTable(MappingDefaults.DichVuKyThuatTable);

            base.Configure(builder);
        }
    }
}
