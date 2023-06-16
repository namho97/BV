namespace Camino.Core.Domain.Templates
{
    public class Template : BaseEntity
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Version { get; set; }
        public TemplateType TemplateType { get; set; }
        public int Language { get; set; }
        public string Description { get; set; }
        public bool? IsDisabled { get; set; }

        public static object Parse(string contentTempalte)
        {
            throw new NotImplementedException();
        }
    }
}
