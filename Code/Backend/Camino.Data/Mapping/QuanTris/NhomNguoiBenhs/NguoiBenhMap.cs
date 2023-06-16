using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.QuanTris.NhomNguoiBenhs
{

    public class NguoiBenhMap : CaminoEntityTypeConfiguration<NguoiBenh>
    {
        public override void Configure(EntityTypeBuilder<NguoiBenh> builder)
        {
            builder.ToTable(MappingDefaults.NguoiBenhTable);

            builder.HasOne(rf => rf.TinhThanh)
                .WithMany(r => r.NguoiBenhTinhThanhs)
                .HasForeignKey(rf => rf.TinhThanhId);

            builder.HasOne(rf => rf.QuanHuyen)
                .WithMany(r => r.NguoiBenhQuanHuyens)
                .HasForeignKey(rf => rf.QuanHuyenId);

            builder.HasOne(rf => rf.PhuongXa)
                .WithMany(r => r.NguoiBenhPhuongXas)
                .HasForeignKey(rf => rf.PhuongXaId);

            builder.HasOne(rf => rf.KhomAp)
                .WithMany(r => r.NguoiBenhKhomAps)
                .HasForeignKey(rf => rf.KhomApId);

            builder.HasOne(rf => rf.DanToc)
                .WithMany(r => r.NguoiBenhs)
                .HasForeignKey(rf => rf.DanTocId);

            builder.HasOne(rf => rf.QuocTich)
                .WithMany(r => r.NguoiBenhs)
                .HasForeignKey(rf => rf.QuocTichId);

            base.Configure(builder);
        }
    }
}
