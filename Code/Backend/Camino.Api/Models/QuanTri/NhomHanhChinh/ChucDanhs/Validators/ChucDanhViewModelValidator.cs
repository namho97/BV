using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.ChucDanhs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ChucDanhViewModel>))]
    public class ChucDanhViewModelValidator : AbstractValidator<ChucDanhViewModel>
    {
        public ChucDanhViewModelValidator(ILocalizationService localizationService ,IChucDanhService chucDanhService)
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .Must((model, input, f) => !chucDanhService.KiemTraTrungTenAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));

            RuleFor(x => x.Ma)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .Must((model, input, f) => !chucDanhService.KiemTraTrungMaAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ma.IsExists"));
           
        }
    }
}
