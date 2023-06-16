using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.ChucVus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ChucVuViewModel>))]
    public class ChucVuViewModelValidator : AbstractValidator<ChucVuViewModel>
    {

        public ChucVuViewModelValidator(ILocalizationService localizationService ,IChucVuService chucVuService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                 .Must((model, input, f) => !chucVuService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
            RuleFor(x => x.TenVietTat)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.TenVietTat.Required"))
             ;


        }
    }
}
