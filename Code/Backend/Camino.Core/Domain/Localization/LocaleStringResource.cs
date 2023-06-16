namespace Camino.Core.Domain.Localization
{
    public class LocaleStringResource : BaseEntity
    {
        public string ResourceName { get; set; } = null!;
        public string ResourceValue { get; set; } = null!;
        public int Language { get; set; }
    }
}
