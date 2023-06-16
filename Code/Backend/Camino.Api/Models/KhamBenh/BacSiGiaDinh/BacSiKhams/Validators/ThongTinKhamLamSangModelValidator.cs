using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThongTinKhamLamSangViewModel>))]
    public class ThongTinKhamLamSangModelValidator : AbstractValidator<ThongTinKhamLamSangViewModel>
    {

        public ThongTinKhamLamSangModelValidator(ILocalizationService localizationService)
        {
            //RuleFor(o => o.TongTrang)
            //    .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinKhamLamSang.TongTrang.Required"))
            //    .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinKhamLamSang.TongTrang.Required"));
        }
    }
}
