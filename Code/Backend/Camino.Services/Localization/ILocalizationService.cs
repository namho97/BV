using Camino.Core.Domain;

namespace Camino.Services.Localization
{
    public interface ILocalizationService
    {
        string GetResource(string resourceKey);
        LanguageType? CurrentUserLanguage { get; set; }

    }
}
