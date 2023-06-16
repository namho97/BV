
using Camino.Core.Domain.ThuNgans.PhieuThus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.ThuNgans
{
    public class PhieuThuMap : CaminoEntityTypeConfiguration<PhieuThu>
    {
        public override void Configure(EntityTypeBuilder<PhieuThu> builder)
        {
            builder.ToTable(MappingDefaults.PhieuThuTable);

            builder.HasOne(rf => rf.YeuCauTiepNhan)
                .WithMany(r => r.PhieuThus)
                .HasForeignKey(rf => rf.YeuCauTiepNhanId);

            builder.HasOne(rf => rf.NhanVienThucHien)
                .WithMany(r => r.PhieuThuNhanVienThucHiens)
                .HasForeignKey(rf => rf.NhanVienThucHienId);

            builder.HasOne(rf => rf.NhanVienHuy)
                .WithMany(r => r.PhieuThuNhanVienHuys)
                .HasForeignKey(rf => rf.NhanVienHuyId);

            builder.HasOne(rf => rf.NguoiBenh)
                .WithMany(r => r.PhieuThus)
                .HasForeignKey(rf => rf.NguoiBenhId);
            base.Configure(builder);
        }
    }
}
