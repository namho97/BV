using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Camino.Data.Mapping.QuanTris.NhomPhongKhams
{
    public class NhomDichVuBenhVienMap : CaminoEntityTypeConfiguration<NhomDichVuBenhVien>
    {
        public override void Configure(EntityTypeBuilder<NhomDichVuBenhVien> builder)
        {
            builder.ToTable(MappingDefaults.NhomDichVuBenhVienTable);

            base.Configure(builder);
        }
    }
}
