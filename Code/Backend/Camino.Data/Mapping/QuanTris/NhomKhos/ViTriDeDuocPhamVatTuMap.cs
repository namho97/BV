using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomKhos
{
    public class ViTriDeDuocPhamVatTuMap : CaminoEntityTypeConfiguration<ViTriDeDuocPhamVatTu>
    {
        public override void Configure(EntityTypeBuilder<ViTriDeDuocPhamVatTu> builder)
        {
            builder.ToTable(MappingDefaults.ViTriDeDuocPhamVatTuTable);
            builder.HasOne(rf => rf.Kho)
               .WithMany(r => r.ViTriDeDuocPhamVatTus)
               .HasForeignKey(rf => rf.KhoId);

            base.Configure(builder);
        }
    }
}
