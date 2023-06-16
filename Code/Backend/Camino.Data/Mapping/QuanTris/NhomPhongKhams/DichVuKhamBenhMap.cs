using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class DichVuKhamBenhMap : CaminoEntityTypeConfiguration<DichVuKhamBenh>
    {
        public override void Configure(EntityTypeBuilder<DichVuKhamBenh> builder)
        {
            builder.ToTable(MappingDefaults.DichVuKhamBenhTable);

            base.Configure(builder);
        }
    }
}
