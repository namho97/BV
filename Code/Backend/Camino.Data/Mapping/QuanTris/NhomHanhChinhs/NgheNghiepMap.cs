using Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{

    public class NgheNghiepMap : CaminoEntityTypeConfiguration<NgheNghiep>
    {
        public override void Configure(EntityTypeBuilder<NgheNghiep> builder)
        {
            builder.ToTable(MappingDefaults.NgheNghiepTable);

            base.Configure(builder);
        }
    }
}
