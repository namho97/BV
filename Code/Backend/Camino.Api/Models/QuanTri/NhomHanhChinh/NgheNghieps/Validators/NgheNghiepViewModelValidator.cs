using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.NgheNghieps.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NgheNghiepViewModel>))]
    public class NgheNghiepViewModelValidator : AbstractValidator<NgheNghiepViewModel>
    {

        public NgheNghiepViewModelValidator(ILocalizationService localizationService, INgheNghiepService ngheNghiepService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ma.Required"))
              .Must((model, input, f) => !ngheNghiepService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("DonViTinh.Ma.IsExists"));

            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"));
        }
    }
}
