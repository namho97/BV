using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomNguoiBenhs
{
    public class QuanHeNhanThanMap : CaminoEntityTypeConfiguration<QuanHeNhanThan>
    {
        public override void Configure(EntityTypeBuilder<QuanHeNhanThan> builder)
        {
            builder.ToTable(MappingDefaults.QuanHeNhanThanTable);
            base.Configure(builder);
        }
    }
}
