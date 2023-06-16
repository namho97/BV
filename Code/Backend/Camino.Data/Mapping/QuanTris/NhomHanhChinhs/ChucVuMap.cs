using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucVus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{
    public class ChucVuMap : CaminoEntityTypeConfiguration<ChucVu>
    {
        public override void Configure(EntityTypeBuilder<ChucVu> builder)
        {
            builder.ToTable(MappingDefaults.ChucVuTable);
            base.Configure(builder);
        }
    }
}
