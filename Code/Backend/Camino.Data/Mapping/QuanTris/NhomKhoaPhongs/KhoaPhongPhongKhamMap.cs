using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomKhoaPhongs
{
    public class KhoaPhongPhongKhamMap : CaminoEntityTypeConfiguration<KhoaPhongPhongKham>
    {
        public override void Configure(EntityTypeBuilder<KhoaPhongPhongKham> builder)
        {
            builder.ToTable(MappingDefaults.KhoaPhongPhongKhamTable);

            builder.HasOne(rf => rf.KhoaPhong)
             .WithMany(r => r.KhoaPhongPhongKhams)
             .HasForeignKey(rf => rf.KhoaPhongId);

            base.Configure(builder);
        }
    }
}
