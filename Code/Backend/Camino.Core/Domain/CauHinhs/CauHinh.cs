namespace Camino.Core.Domain.CauHinhs
{
    public class CauHinh : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Value { get; set; } = null!;
        public DataType DataType { get; set; }
    }
}
