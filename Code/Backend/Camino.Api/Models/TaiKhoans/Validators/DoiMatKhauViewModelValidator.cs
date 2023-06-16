using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.TaiKhoans.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DoiMatKhauViewModel>))]
    public class DoiMatKhauViewModelValidator : AbstractValidator<DoiMatKhauViewModel>
    {
        public DoiMatKhauViewModelValidator(ILocalizationService localizationService)
        {
            this.CascadeMode = CascadeMode.StopOnFirstFailure;

            RuleFor(s => s.MatKhauCu).NotEmpty().WithMessage(localizationService.GetResource("TaiKhoan.MauKhauCu.Required"));
            RuleFor(s => s.MatKhauMoi).NotEmpty().WithMessage(localizationService.GetResource("TaiKhoan.MatKhauMoi.Required"));
            RuleFor(s => s.XacNhanMatKhau).NotEmpty().WithMessage(localizationService.GetResource("TaiKhoan.XacNhanMatKhau.Required"))
                .Must((model, s) => model.MatKhauMoi == model.XacNhanMatKhau).WithMessage(localizationService.GetResource("TaiKhoan.XacNhanMatKhau.DontMatchPassword"));

        }
    }
}
