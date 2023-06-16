using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThongTinHanhChinhViewModel>))]
    public class ThongTinHanhChinhModelValidator : AbstractValidator<ThongTinHanhChinhViewModel>
    {

        public ThongTinHanhChinhModelValidator(ILocalizationService localizationService)
        {
            RuleFor(o => o.HoTen)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.HoTen.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.HoTen.Required"));
            RuleFor(o => o.SoDienThoai)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.SoDienThoai.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.SoDienThoai.Required"));
            RuleFor(o => o.NamSinh)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.NamSinh.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.NamSinh.Required"));
            RuleFor(o => o.GioiTinh)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.GioiTinh.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinHanhChinh.GioiTinh.Required"));
        }
    }
}
