using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomToaThuocMau.ToaThuocMaus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ToaThuocMauViewModel>))]
    public class ToaThuocMauModelValidator : AbstractValidator<ToaThuocMauViewModel>
    {

        public ToaThuocMauModelValidator(ILocalizationService localizationService, IValidator<ToaThuocMauChiTietViewModel> validateDuocPhamGiaViewModel)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.Ten.Required"));

            RuleFor(a => a.BacSiId)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.BacSiId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.BacSiId.Required"));

            RuleFor(a => a.IcdId)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.IcdId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.IcdId.Required"));
            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.HieuLuc.Required"));

            RuleForEach(x => x.ToaThuocMauChiTiets).SetValidator(validateDuocPhamGiaViewModel);
        }
    }
    [TransientDependency(ServiceType = typeof(IValidator<ToaThuocMauChiTietViewModel>))]
    public class ToaThuocMauChiTietValidator : AbstractValidator<ToaThuocMauChiTietViewModel>
    {

        public ToaThuocMauChiTietValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.DuocPhamId)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.DuocPhamId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.DuocPhamId.Required"));

            RuleFor(a => a.SoNgayDung)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.SoNgayDung.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.SoNgayDung.Required"));

            RuleFor(a => a.SoLuong)
                .NotNull().WithMessage(localizationService.GetResource("ToaThuocMau.SoLuong.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("ToaThuocMau.SoLuong.Required"));

        }
    }
}
