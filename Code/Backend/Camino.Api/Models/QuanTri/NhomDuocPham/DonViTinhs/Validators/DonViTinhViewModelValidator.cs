using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomDuocPhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomDuocPham.DonViTinhs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DonViTinhViewModel>))]
    public class DonViTinhViewModelValidator : AbstractValidator<DonViTinhViewModel>
    {

        public DonViTinhViewModelValidator(ILocalizationService localizationService, IDonViTinhService donViTinhService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ma.Required"))
              .Must((model, input, f) => !donViTinhService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("DonViTinh.Ma.IsExists"));

            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"));
        }
    }
}
