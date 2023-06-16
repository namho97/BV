using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<MoKhamLaiViewModel>))]
    public class MoKhamLaiModelValidator : AbstractValidator<MoKhamLaiViewModel>
    {

        public MoKhamLaiModelValidator(ILocalizationService localizationService)
        {
            RuleFor(o => o.LyDo)
                .NotEmpty().WithMessage(localizationService.GetResource("LichSuKham.MoKhamLai.LyDo.Required"))
                .NotNull().WithMessage(localizationService.GetResource("LichSuKham.MoKhamLai.LyDo.Required"));
        }
    }
}
