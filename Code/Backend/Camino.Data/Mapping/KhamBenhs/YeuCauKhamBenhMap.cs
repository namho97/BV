using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.KhamBenhs
{
    public class YeuCauKhamBenhMap : CaminoEntityTypeConfiguration<YeuCauKhamBenh>
    {
        public override void Configure(EntityTypeBuilder<YeuCauKhamBenh> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauKhamBenhTable);

            builder.HasOne(rf => rf.YeuCauTiepNhan)
                .WithMany(r => r.YeuCauKhamBenhs)
                .HasForeignKey(rf => rf.YeuCauTiepNhanId);

            builder.HasOne(rf => rf.DichVuKhamBenh)
                .WithMany(r => r.YeuCauKhamBenhs)
                .HasForeignKey(rf => rf.DichVuKhamBenhId);

            builder.HasOne(rf => rf.NhanVienChiDinh)
                .WithMany(r => r.YeuCauKhamBenhNhanVienChiDinhs)
                .HasForeignKey(rf => rf.NhanVienChiDinhId);

            builder.HasOne(rf => rf.NhanVienThucHien)
                .WithMany(r => r.YeuCauKhamBenhNhanVienThucHiens)
                .HasForeignKey(rf => rf.NhanVienThucHienId);

            builder.HasOne(rf => rf.NhanVienHuy)
                .WithMany(r => r.YeuCauKhamBenhNhanVienHuys)
                .HasForeignKey(rf => rf.NhanVienHuyId);

            builder.HasOne(rf => rf.NhanVienHoanThanhKham)
                .WithMany(r => r.YeuCauKhamBenhNhanVienHoanThanhKhams)
                .HasForeignKey(rf => rf.NhanVienHoanThanhKhamId);

            builder.HasOne(rf => rf.IcdChinh)
                .WithMany(r => r.YeuCauKhamBenhs)
                .HasForeignKey(rf => rf.IcdChinhId);

            builder.HasOne(rf => rf.BenhVienChuyenDen)
                .WithMany(r => r.YeuCauKhamBenhs)
                .HasForeignKey(rf => rf.BenhVienChuyenDenId);

            base.Configure(builder);
        }
    }
}
