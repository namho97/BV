using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{
    public class ChucDanhMap : CaminoEntityTypeConfiguration<ChucDanh>
    {
        public override void Configure(EntityTypeBuilder<ChucDanh> builder)
        {
            builder.ToTable(MappingDefaults.ChucDanhTable);
            base.Configure(builder);
        }
    }
}
