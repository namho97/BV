using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomCauHinh.NoiDungMaus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NoiDungMauViewModel>))]
    public class NoiDungMauViewModelValidator : AbstractValidator<NoiDungMauViewModel>
    {
        public NoiDungMauViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(x => x.Loai)
              .NotEmpty().WithMessage(localizationService.GetResource("NoiDungMau.Loai.Required"));

            RuleFor(x => x.NoiDung)
               .NotEmpty().WithMessage(localizationService.GetResource("NoiDungMau.NoiDung.Required"));
        }
    }
}
