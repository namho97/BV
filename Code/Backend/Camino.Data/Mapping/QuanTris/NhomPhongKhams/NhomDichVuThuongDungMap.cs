using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{
    public class NhomDichVuThuongDungMap : CaminoEntityTypeConfiguration<GoiDichVu>
    {
        public override void Configure(EntityTypeBuilder<GoiDichVu> builder)
        {
            builder.ToTable(MappingDefaults.NhomDichVuThuongDungTable);

            base.Configure(builder);
        }
    }
}
