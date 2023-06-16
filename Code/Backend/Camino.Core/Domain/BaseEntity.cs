using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Camino.Core.Domain
{
    public abstract class BaseEntity
    {
        /// <summary>
        /// Gets or sets the entity identifier
        /// </summary>
        public long Id { get; set; }

        public long LastUserId { get; set; }

        public long CreatedById { get; set; }

        [NotMapped]
        public bool WillDelete { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime LastTime { get; set; }

        [Timestamp]
        public virtual byte[] LastModified { get; set; } = null!;
    }
}
