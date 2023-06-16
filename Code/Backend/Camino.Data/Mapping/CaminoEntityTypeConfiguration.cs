using Camino.Core.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Camino.Data.Mapping
{
    public class CaminoEntityTypeConfiguration<T> : IEntityTypeConfiguration<T>
        where T : BaseEntity
    {
        public virtual void Configure(EntityTypeBuilder<T> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.LastModified)
                .IsRequired()
                .IsFixedLength()
                .IsRowVersion();
        }
    }
}
