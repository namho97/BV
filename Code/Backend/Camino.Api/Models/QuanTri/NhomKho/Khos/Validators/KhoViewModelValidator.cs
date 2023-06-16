using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomKhos.Khos;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKho.Khos.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<KhoViewModel>))]
    public class KhoViewModelValidator : AbstractValidator<KhoViewModel>
    {

        public KhoViewModelValidator(ILocalizationService localizationService, IKhoService khoService)
        {
            RuleFor(a => a.LoaiKho)
                .NotNull().WithMessage(localizationService.GetResource("Kho.LoaiKho.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Kho.LoaiKho.Required"));
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !khoService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
        }
    }
}
