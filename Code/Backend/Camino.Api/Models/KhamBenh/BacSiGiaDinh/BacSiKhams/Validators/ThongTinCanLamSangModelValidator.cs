using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThongTinCanLamSangViewModel>))]
    public class ThongTinCanLamSangModelValidator : AbstractValidator<ThongTinCanLamSangViewModel>
    {

        public ThongTinCanLamSangModelValidator(ILocalizationService localizationService)
        {

        }
    }
}
