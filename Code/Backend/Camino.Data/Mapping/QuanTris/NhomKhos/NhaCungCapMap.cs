using Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomKhos
{
    public class NhaCungCapMap : CaminoEntityTypeConfiguration<NhaCungCap>
    {
        public override void Configure(EntityTypeBuilder<NhaCungCap> builder)
        {
            builder.ToTable(MappingDefaults.NhaCungCapTable);

            base.Configure(builder);
        }
    }
}
