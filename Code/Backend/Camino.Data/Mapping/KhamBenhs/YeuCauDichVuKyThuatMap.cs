using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.KhamBenhs
{
    public class YeuCauDichVuKyThuatMap : CaminoEntityTypeConfiguration<YeuCauDichVuKyThuat>
    {
        public override void Configure(EntityTypeBuilder<YeuCauDichVuKyThuat> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauDichVuKyThuatTable);

            builder.HasOne(rf => rf.YeuCauTiepNhan)
                .WithMany(r => r.YeuCauDichVuKyThuats)
                .HasForeignKey(rf => rf.YeuCauTiepNhanId);

            builder.HasOne(rf => rf.DichVuKyThuat)
                .WithMany(r => r.YeuCauDichVuKyThuats)
                .HasForeignKey(rf => rf.DichVuKyThuatId);

            builder.HasOne(rf => rf.NhanVienChiDinh)
                .WithMany(r => r.YeuCauDichVuKyThuatNhanVienChiDinhs)
                .HasForeignKey(rf => rf.NhanVienChiDinhId);

            builder.HasOne(rf => rf.NhanVienThucHien)
                .WithMany(r => r.YeuCauDichVuKyThuatNhanVienThucHiens)
                .HasForeignKey(rf => rf.NhanVienThucHienId);

            builder.HasOne(rf => rf.NhanVienHuy)
                .WithMany(r => r.YeuCauDichVuKyThuatNhanVienHuys)
                .HasForeignKey(rf => rf.NhanVienHuyId);

            base.Configure(builder);
        }
    }
}
