using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{
    public class TuongTacThuocMap : CaminoEntityTypeConfiguration<TuongTacThuoc>
    {
        public override void Configure(EntityTypeBuilder<TuongTacThuoc> builder)
        {
            builder.ToTable(MappingDefaults.TuongTacThuocTable);

            builder.HasOne(rf => rf.ThuocHoacHoatChat1)
            .WithMany(r => r.TuongTacThuoc1s)
            .HasForeignKey(rf => rf.ThuocHoacHoatChat1Id);

            builder.HasOne(rf => rf.ThuocHoacHoatChat2)
                .WithMany(r => r.TuongTacThuoc2s)
                .HasForeignKey(rf => rf.ThuocHoacHoatChat2Id);
            base.Configure(builder);
        }
    }
}
