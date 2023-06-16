using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMauChiTiets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{

    public class ToaThuocMauChiTietMap : CaminoEntityTypeConfiguration<ToaThuocMauChiTiet>
    {
        public override void Configure(EntityTypeBuilder<ToaThuocMauChiTiet> builder)
        {
            builder.ToTable(MappingDefaults.ToaThuocMauChiTietTable);

            builder.HasOne(rf => rf.ToaThuocMau)
                .WithMany(r => r.ToaThuocMauChiTiets)
                .HasForeignKey(rf => rf.ToaThuocMauId);

            builder.HasOne(rf => rf.DuocPham)
                .WithMany(r => r.ToaThuocMauChiTiets)
                .HasForeignKey(rf => rf.DuocPhamId);

            base.Configure(builder);
        }
    }
}
