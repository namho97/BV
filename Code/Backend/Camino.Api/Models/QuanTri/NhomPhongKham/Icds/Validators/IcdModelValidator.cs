using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.Icds.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<IcdViewModel>))]
    public class IcdModelValidator : AbstractValidator<IcdViewModel>
    {

        public IcdModelValidator(ILocalizationService localizationService, IIcdService IIcdService)
        {
            RuleFor(a => a.TenTiengViet)
                .NotNull().WithMessage(localizationService.GetResource("Icd.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Icd.Ten.Required"));
            RuleFor(a => a.Ma)
                .NotNull().WithMessage(localizationService.GetResource("Icd.Ma.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Icd.Ma.Required"))
                .Must((model, input, p) => !IIcdService.KiemTraTrungMa(model.Ma, model.Id))
                .WithMessage(localizationService.GetResource("Icd.Ma.Exist"));

            RuleFor(a => a.HieuLucInt)
                .NotNull().WithMessage(localizationService.GetResource("Icd.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Icd.HieuLuc.Required"));

        }
    }
}
