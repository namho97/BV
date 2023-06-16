using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.TrieuChungs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<TrieuChungViewModel>))]
    public class TrieuChungViewModelValidator : AbstractValidator<TrieuChungViewModel>
    {

        public TrieuChungViewModelValidator(ILocalizationService localizationService, ITrieuChungService trieuChungService)
        {
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !trieuChungService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
        }
    }
}
