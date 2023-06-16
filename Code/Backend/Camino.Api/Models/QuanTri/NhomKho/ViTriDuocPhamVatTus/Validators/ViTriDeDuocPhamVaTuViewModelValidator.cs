using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKho.ViTriDuocPhamVatTus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ViTriDeDuocPhamVaTuViewModel>))]
    public class ViTriDeDuocPhamVaTuViewModelValidator : AbstractValidator<ViTriDeDuocPhamVaTuViewModel>
    {

        public ViTriDeDuocPhamVaTuViewModelValidator(ILocalizationService localizationService, IViTriDeDuocPhamVatTuService ViTriDeDuocPhamVatTuService)
        {
            RuleFor(a => a.KhoId)
                .NotNull().WithMessage(localizationService.GetResource("ViTriDeDuocPhamVaTu.KhoId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ViTriDeDuocPhamVaTu.KhoId.Required"));
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !ViTriDeDuocPhamVatTuService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
        }
    }
}
