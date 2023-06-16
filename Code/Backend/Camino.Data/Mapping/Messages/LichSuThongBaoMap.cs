using Camino.Core.Domain.Messages;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Camino.Data.Mapping.Messages
{
    public class LichSuThongBaoMap : CaminoEntityTypeConfiguration<LichSuThongBao>
    {
        public override void Configure(EntityTypeBuilder<LichSuThongBao> builder)
        {
            builder.ToTable(MappingDefaults.LichSuThongBaoTable);
            builder.Property(u => u.GoiDen).HasMaxLength(20);
            base.Configure(builder);
        }
    }
}
