using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.BenhViens.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<BenhVienViewModel>))]
    public class BenhVienModelValidator : AbstractValidator<BenhVienViewModel>
    {

        public BenhVienModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("BenhVien.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("BenhVien.Ten.Required"));
            RuleFor(a => a.Ma)
                .NotNull().WithMessage(localizationService.GetResource("BenhVien.Ma.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("BenhVien.Ma.Required"));

        }
    }
}
