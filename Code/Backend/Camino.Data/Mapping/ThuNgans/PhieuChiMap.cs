
using Camino.Core.Domain.ThuNgans.PhieuChis;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.ThuNgans
{
    public class PhieuChiMap : CaminoEntityTypeConfiguration<PhieuChi>
    {
        public override void Configure(EntityTypeBuilder<PhieuChi> builder)
        {
            builder.ToTable(MappingDefaults.PhieuChiTable);

            builder.HasOne(rf => rf.PhieuThu)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.PhieuThuId);

            builder.HasOne(rf => rf.YeuCauTiepNhan)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.YeuCauTiepNhanId);

            builder.HasOne(rf => rf.YeuCauKhamBenh)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.YeuCauKhamBenhId);

            builder.HasOne(rf => rf.YeuCauDichVuKyThuat)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.YeuCauDichVuKyThuatId);

            builder.HasOne(rf => rf.YeuCauKhamBenhDonThuocChiTiet)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.YeuCauKhamBenhDonThuocChiTietId);

            builder.HasOne(rf => rf.NhanVienThucHien)
                .WithMany(r => r.PhieuChiNhanVienThucHiens)
                .HasForeignKey(rf => rf.NhanVienThucHienId);

            builder.HasOne(rf => rf.NhanVienHuy)
                .WithMany(r => r.PhieuChiNhanVienHuys)
                .HasForeignKey(rf => rf.NhanVienHuyId);

            builder.HasOne(rf => rf.NguoiBenh)
                .WithMany(r => r.PhieuChis)
                .HasForeignKey(rf => rf.NguoiBenhId);

            base.Configure(builder);
        }
    }
}
