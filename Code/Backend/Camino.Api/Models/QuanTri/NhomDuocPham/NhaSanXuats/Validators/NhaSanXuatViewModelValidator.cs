using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomDuocPhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomDuocPham.NhaSanXuats.Validators
{

    [TransientDependency(ServiceType = typeof(IValidator<NhaSanXuatViewModel>))]
    public class NhaSanXuatViewModelValidator : AbstractValidator<NhaSanXuatViewModel>
    {

        public NhaSanXuatViewModelValidator(ILocalizationService localizationService, INhaSanXuatService nhaSanXuatService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("NhaSX.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NhaSX.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("NhaSX.Ma.Required"))
              .Must((model, input, f) => !nhaSanXuatService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("NhaSX.Ma.IsExists"));

            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("NhaSX.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NhaSX.HieuLuc.Required"));
        }
    }
}
