using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.HuongDanSuDung.BacSiGiaDinh.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<HuongDanSuDungViewModel>))]
    public class HuongDanSuDungViewModelValidator : AbstractValidator<HuongDanSuDungViewModel>
    {

        public HuongDanSuDungViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.Ten.Required"));
            RuleFor(a => a.SoThuTu)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.SoThuTu.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.SoThuTu.Required"));
            RuleFor(a => a.MoTa)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.MoTa.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.MoTa.Required"));
            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.HieuLuc.Required"));

        }
    }
}
