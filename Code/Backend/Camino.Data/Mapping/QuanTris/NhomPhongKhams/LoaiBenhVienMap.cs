using Camino.Core.Domain.QuanTris.NhomPhongKhams.LoaiBenhViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class LoaiBenhVienMap : CaminoEntityTypeConfiguration<LoaiBenhVien>
    {
        public override void Configure(EntityTypeBuilder<LoaiBenhVien> builder)
        {
            builder.ToTable(MappingDefaults.LoaiBenhVienTable);

            base.Configure(builder);
        }
    }
}
