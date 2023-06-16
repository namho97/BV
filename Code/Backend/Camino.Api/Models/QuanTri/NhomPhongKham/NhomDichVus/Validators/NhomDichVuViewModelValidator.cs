using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuBenhViens;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVus.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhomDichVuViewModel>))]
    public class NhomDichVuViewModelValidator : AbstractValidator<NhomDichVuViewModel>
    {

        public NhomDichVuViewModelValidator(ILocalizationService localizationService, INhomDichVuBenhVienService IIcdService)
        {
            RuleFor(a => a.Ma)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"));
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .Must((model, input, p) => !IIcdService.KiemTraTrungTenAsync( model.Id,model.Ten))
                .WithMessage(localizationService.GetResource("Common.Ten.Exist"));
        }
    }
}
