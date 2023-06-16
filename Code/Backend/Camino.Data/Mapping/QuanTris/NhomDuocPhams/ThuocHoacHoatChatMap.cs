using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{
    public class ThuocHoacHoatChatMap : CaminoEntityTypeConfiguration<ThuocHoacHoatChat>
    {
        public override void Configure(EntityTypeBuilder<ThuocHoacHoatChat> builder)
        {
            builder.ToTable(MappingDefaults.ThuocHoacHoatChatTable);

            builder.HasOne(rf => rf.NhomThuoc)
                .WithMany(r => r.ThuocHoacHoatChats)
                .HasForeignKey(rf => rf.NhomthuocId);
            builder.HasOne(rf => rf.DuongDung)
                .WithMany(r => r.ThuocHoacHoatChats)
                .HasForeignKey(rf => rf.DuongDungId);

            base.Configure(builder);
        }
    }
}
