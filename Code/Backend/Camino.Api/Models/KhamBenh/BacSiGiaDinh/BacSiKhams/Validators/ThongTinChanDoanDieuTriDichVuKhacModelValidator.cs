using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DichVuKyThuatKhacViewModel>))]
    public class ThongTinChanDoanDieuTriDichVuKhacModelValidator : AbstractValidator<DichVuKyThuatKhacViewModel>
    {

        public ThongTinChanDoanDieuTriDichVuKhacModelValidator(ILocalizationService localizationService)
        {

            RuleFor(o => o.TenDichVuKhac)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.TenDichVuKhac.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.TenDichVuKhac.Required"));

            RuleFor(o => o.SoLuongDichVuKhac)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoLuongDichVuKhac.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.SoLuongDichVuKhac.Required"));

            RuleFor(o => o.DonGiaDichVuKhac)
                .NotEmpty().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.DonGiaDichVuKhac.Required"))
                .NotNull().WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.DonGiaDichVuKhac.Required"));

        }
    }
}
