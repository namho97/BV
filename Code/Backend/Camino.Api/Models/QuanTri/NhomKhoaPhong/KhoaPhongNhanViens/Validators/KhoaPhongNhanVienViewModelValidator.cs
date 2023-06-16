using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongNhanViens.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<KhoaPhongNhanVienViewModel>))]
    public class KhoaPhongNhanVienViewModelValidator : AbstractValidator<KhoaPhongNhanVienViewModel>
    {

        public KhoaPhongNhanVienViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.NhanVienId)
                .NotNull().WithMessage(localizationService.GetResource("KhoaPhongNhanVien.NhanVienId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("KhoaPhongNhanVien.NhanVienId.Required"));

            RuleFor(a => a.KhoaPhongId)
                .NotNull().WithMessage(localizationService.GetResource("KhoaPhongNhanVien.KhoaPhongId.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("KhoaPhongNhanVien.KhoaPhongId.Required"));
        }
    }
}
