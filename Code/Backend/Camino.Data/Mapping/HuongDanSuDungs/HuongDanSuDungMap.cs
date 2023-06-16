using Camino.Core.Domain.HuongDanSuDungs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.HuongDanSuDungs
{
    public class HuongDanSuDungMap : CaminoEntityTypeConfiguration<HuongDanSuDung>
    {
        public override void Configure(EntityTypeBuilder<HuongDanSuDung> builder)
        {
            builder.ToTable(MappingDefaults.HuongDanSuDungTable);


            base.Configure(builder);
        }
    }
}
