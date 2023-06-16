using Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomHanhChinhs
{
    public class VanBangChuyenMonMap : CaminoEntityTypeConfiguration<VanBangChuyenMon>
    {
        public override void Configure(EntityTypeBuilder<VanBangChuyenMon> builder)
        {
            builder.ToTable(MappingDefaults.VanBangChuyenMonTable);
            base.Configure(builder);
        }
    }
}
