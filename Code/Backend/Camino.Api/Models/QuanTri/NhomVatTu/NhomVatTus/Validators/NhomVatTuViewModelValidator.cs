using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomVatTus.NhomVatTus;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomVatTu.NhomVatTus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhomVatTuViewModel>))]
    public class NhomVatTuViewModelValidator : AbstractValidator<NhomVatTuViewModel>
    {
        public NhomVatTuViewModelValidator(ILocalizationService localizationService, INhomVatTuService nhomVatTuService)
        {
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !nhomVatTuService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
        }
    }
}
