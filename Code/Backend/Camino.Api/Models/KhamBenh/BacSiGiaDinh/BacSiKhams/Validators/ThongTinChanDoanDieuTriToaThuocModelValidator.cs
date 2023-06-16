using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ToaThuocViewModel>))]
    public class ThongTinChanDoanDieuTriToaThuocModelValidator : AbstractValidator<ToaThuocViewModel>
    {

        public ThongTinChanDoanDieuTriToaThuocModelValidator(ILocalizationService localizationService)
        {

            RuleFor(o => o.DuocPhamId)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.DuocPham.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.DuocPham.Required"));

            RuleFor(o => o.SoNgayDung)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoNgayDung.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoNgayDung.Required"));

            RuleFor(o => o.SoLuong)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoLuong.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoLuong.Required"));

        }
    }
}
