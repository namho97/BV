using DotLiquid;

namespace Camino.Core.Helpers
{
    public class TemplateHelpper
    {
        public static string FormatTemplateWithContentTemplate(string contentTempalte, object data)
        {
            var template = Template.Parse(contentTempalte);
            return template.Render(Hash.FromAnonymousObject(data));
        }
    }
}
