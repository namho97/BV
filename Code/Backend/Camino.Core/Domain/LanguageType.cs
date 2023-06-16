using System.ComponentModel;

namespace Camino.Core.Domain
{
    public enum LanguageType
    {
        [Description("Việt Nam")]
        VietNam = 1,
        [Description("English")]
        English = 2
    }
    public enum AreaCode
    {
        [Description("+84")]
        VietNam = 1
    }
}
