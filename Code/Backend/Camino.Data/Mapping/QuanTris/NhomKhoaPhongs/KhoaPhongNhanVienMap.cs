using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomKhoaPhongs
{
    public class KhoaPhongNhanVienMap : CaminoEntityTypeConfiguration<KhoaPhongNhanVien>
    {
        public override void Configure(EntityTypeBuilder<KhoaPhongNhanVien> builder)
        {
            builder.ToTable(MappingDefaults.KhoaPhongNhanVienTable);

            builder.HasOne(rf => rf.KhoaPhongPhongKham)
              .WithMany(r => r.KhoaPhongNhanViens)
              .HasForeignKey(rf => rf.KhoaPhongPhongKhamId);

            builder.HasOne(rf => rf.KhoaPhong)
                        .WithMany(r => r.KhoaPhongNhanViens)
                        .HasForeignKey(rf => rf.KhoaPhongId)
                        .IsRequired();

            builder.HasOne(rf => rf.NhanVien)
                        .WithMany(r => r.KhoaPhongNhanViens)
                        .HasForeignKey(rf => rf.NhanVienId)
                        .IsRequired();

            base.Configure(builder);
        }
    }

}
