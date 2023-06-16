using Camino.Core.Domain.TiepNhans;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.TiepNhans
{
    public class YeuCauTiepNhanMap : CaminoEntityTypeConfiguration<YeuCauTiepNhan>
    {
        public override void Configure(EntityTypeBuilder<YeuCauTiepNhan> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauTiepNhanTable);

            builder.HasOne(rf => rf.NguoiBenh)
                .WithMany(r => r.YeuCauTiepNhans)
                .HasForeignKey(rf => rf.NguoiBenhId);

            builder.HasOne(rf => rf.TinhThanh)
                .WithMany(r => r.YeuCauTiepNhanTinhThanhs)
                .HasForeignKey(rf => rf.TinhThanhId);

            builder.HasOne(rf => rf.QuanHuyen)
                .WithMany(r => r.YeuCauTiepNhanQuanHuyens)
                .HasForeignKey(rf => rf.QuanHuyenId);

            builder.HasOne(rf => rf.PhuongXa)
                .WithMany(r => r.YeuCauTiepNhanPhuongXas)
                .HasForeignKey(rf => rf.PhuongXaId);

            builder.HasOne(rf => rf.KhomAp)
                .WithMany(r => r.YeuCauTiepNhanKhomAps)
                .HasForeignKey(rf => rf.KhomApId);

            builder.HasOne(rf => rf.DanToc)
                .WithMany(r => r.YeuCauTiepNhans)
                .HasForeignKey(rf => rf.DanTocId);

            builder.HasOne(rf => rf.QuocTich)
                .WithMany(r => r.YeuCauTiepNhans)
                .HasForeignKey(rf => rf.QuocTichId);

            builder.HasOne(rf => rf.NhanVienTiepNhan)
                .WithMany(r => r.YeuCauTiepNhanNhanVienTiepNhans)
                .HasForeignKey(rf => rf.NhanVienTiepNhanId);

            builder.HasOne(rf => rf.NhanVienHuy)
                .WithMany(r => r.YeuCauTiepNhanNhanVienHuys)
                .HasForeignKey(rf => rf.NhanVienHuyId);

            builder.HasOne(rf => rf.NhanVienCapNhatNguoiBenhDen)
                .WithMany(r => r.YeuCauTiepNhanVienCapNhatNguoiBenhDens)
                .HasForeignKey(rf => rf.NhanVienCapNhatNguoiBenhDenId);

            base.Configure(builder);
        }
    }
}
