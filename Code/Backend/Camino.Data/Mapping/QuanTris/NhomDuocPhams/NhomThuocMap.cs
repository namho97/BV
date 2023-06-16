using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomDuocPhams
{
    public class NhomThuocMap : CaminoEntityTypeConfiguration<NhomThuoc>
    {
        public override void Configure(EntityTypeBuilder<NhomThuoc> builder)
        {
            builder.ToTable(MappingDefaults.NhomThuocTable);


            base.Configure(builder);
        }
    }
}
