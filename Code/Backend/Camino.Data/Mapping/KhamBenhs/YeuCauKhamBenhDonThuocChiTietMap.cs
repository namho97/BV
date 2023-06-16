using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping.KhamBenhs
{
    public class YeuCauKhamBenhDonThuocChiTietMap : CaminoEntityTypeConfiguration<YeuCauKhamBenhDonThuocChiTiet>
    {
        public override void Configure(EntityTypeBuilder<YeuCauKhamBenhDonThuocChiTiet> builder)
        {
            builder.ToTable(MappingDefaults.YeuCauKhamBenhDonThuocChiTietTable);

            builder.HasOne(rf => rf.YeuCauKhamBenhDonThuoc)
                .WithMany(r => r.YeuCauKhamBenhDonThuocChiTiets)
                .HasForeignKey(rf => rf.YeuCauKhamBenhDonThuocId);

            builder.HasOne(rf => rf.DuocPham)
                .WithMany(r => r.YeuCauKhamBenhDonThuocChiTiets)
                .HasForeignKey(rf => rf.DuocPhamId);

            builder.HasOne(rf => rf.NhaSanXuat)
                .WithMany(r => r.YeuCauKhamBenhDonThuocChiTiets)
                .HasForeignKey(rf => rf.NhaSanXuatId);

            builder.HasOne(rf => rf.NuocSanXuat)
                .WithMany(r => r.YeuCauKhamBenhDonThuocChiTiets)
                .HasForeignKey(rf => rf.NuocSanXuatId);



            base.Configure(builder);
        }
    }
}
