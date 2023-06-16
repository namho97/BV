using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomKhoaPhongs
{
    public class KhoaPhongMap : CaminoEntityTypeConfiguration<KhoaPhong>
    {
        public override void Configure(EntityTypeBuilder<KhoaPhong> builder)
        {
            builder.ToTable(MappingDefaults.KhoaPhongTable);

            base.Configure(builder);
        }
    }
}
