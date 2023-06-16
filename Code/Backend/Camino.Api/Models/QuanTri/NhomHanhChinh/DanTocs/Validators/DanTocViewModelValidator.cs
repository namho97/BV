using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.DanTocs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DanTocViewModel>))]
    public class DanTocViewModelValidator : AbstractValidator<DanTocViewModel>
    {
        public DanTocViewModelValidator(ILocalizationService localizationService, IDanTocService danTocService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"))
            .Must((model, input, f) => !danTocService.KiemTraTrungMaAsync(model.Id, input))
            .WithMessage(localizationService.GetResource("Common.Ma.IsExists"));

            RuleFor(a => a.QuocGiaId)
              .NotNull().WithMessage(localizationService.GetResource("Common.QuocGia.Required"))
              .NotEmpty().WithMessage(localizationService.GetResource("Common.QuocGia.Required"));
            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("Common.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.HieuLuc.Required"));
        }
    }
}
