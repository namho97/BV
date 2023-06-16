using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs.Validators
{

    [TransientDependency(ServiceType = typeof(IValidator<CauhinhViewModel>))]
    public class CauHinhViewModelValidator : AbstractValidator<CauhinhViewModel>
    {

        public CauHinhViewModelValidator(ILocalizationService localizationService, IValidator<CauHinhDanhSachChiTiet> validateCauHinhDanhSachChiTietViewModel)
        {
            RuleFor(a => a.Description)
                .NotNull().WithMessage(localizationService.GetResource("CauHinh.Description.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("CauHinh.Description.Required"));
            RuleForEach(x => x.CauHinhDanhSachChiTiets).SetValidator(validateCauHinhDanhSachChiTietViewModel);
        }
    }
    [TransientDependency(ServiceType = typeof(IValidator<CauHinhDanhSachChiTiet>))]
    public class CauHinhDanhSachChiTietViewModelValidator : AbstractValidator<CauHinhDanhSachChiTiet>
    {

        public CauHinhDanhSachChiTietViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.KeyId)
                .NotNull().WithMessage(localizationService.GetResource("CauHinh.KeyId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("CauHinh.KeyId.Required"));
            RuleFor(a => a.DisplayName)
              .NotNull().WithMessage(localizationService.GetResource("CauHinh.DisplayName.Required"))
              .NotEmpty().WithMessage(localizationService.GetResource("CauHinh.DisplayName.Required"));
            RuleFor(a => a.DataType)
              .NotNull().WithMessage(localizationService.GetResource("CauHinh.DataType.Required"))
              .NotEmpty().WithMessage(localizationService.GetResource("CauHinh.DataType.Required"));
            RuleFor(a => a.GhiChu)
              .NotNull().WithMessage(localizationService.GetResource("CauHinh.GhiChu.Required"))
              .NotEmpty().WithMessage(localizationService.GetResource("CauHinh.GhiChu.Required"));

        }
    }
}
