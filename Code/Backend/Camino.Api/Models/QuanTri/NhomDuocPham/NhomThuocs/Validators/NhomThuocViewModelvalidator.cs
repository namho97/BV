using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomDuocPhams.NhomThuocs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomDuocPham.NhomThuocs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhomThuocViewModel>))]
    public class NhomThuocViewModelvalidator : AbstractValidator<NhomThuocViewModel>
    {
        public NhomThuocViewModelvalidator(ILocalizationService localizationService, INhomThuocService nhomThuocService)
        {
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !nhomThuocService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
        }
    }
}
