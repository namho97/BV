using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.VanBangChuyenMons.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<VanBangChuyenMonViewModel>))]
    public class VanBangChuyenMonViewModelValidator : AbstractValidator<VanBangChuyenMonViewModel>
    {
        public VanBangChuyenMonViewModelValidator(ILocalizationService localizationService,IVanBangChuyenMonService vanBangChuyenMonService)
        {
            RuleFor(x => x.Ten)
               .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
               .Must((model, input, f) => !vanBangChuyenMonService.KiemTraTrungTenAsync(model.Id, input))
               .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));

            RuleFor(x => x.Ma)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .Must((model, input, f) => !vanBangChuyenMonService.KiemTraTrungMaAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ma.IsExists"));
            RuleFor(x => x.TenVietTat)
               .NotEmpty().WithMessage(localizationService.GetResource("Common.TenVietTat.Required"));
        }
    }
}
