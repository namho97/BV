using Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{
    public class TrieuChungMap : CaminoEntityTypeConfiguration<TrieuChung>
    {
        public override void Configure(EntityTypeBuilder<TrieuChung> builder)
        {
            builder.ToTable(MappingDefaults.TrieuChungTable);

            builder.HasOne(rf => rf.TrieuChungCha)
                 .WithMany(r => r.TrieuChungs)
                 .HasForeignKey(rf => rf.TrieuChungChaId);
            base.Configure(builder);
        }
    }
}
