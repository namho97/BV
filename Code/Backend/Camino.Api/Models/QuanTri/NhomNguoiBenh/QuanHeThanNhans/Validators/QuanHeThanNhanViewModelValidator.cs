using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNguoiBenhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNguoiBenh.QuanHeThanNhans.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<QuanHeThanNhanViewModel>))]
    public class QuanHeThanNhanViewModelValidator : AbstractValidator<QuanHeThanNhanViewModel>
    {

        public QuanHeThanNhanViewModelValidator(ILocalizationService localizationService, IQuanHeNhanThanService quanHeNhanThanService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                 .Must((model, input, f) => !quanHeNhanThanService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));
            RuleFor(x => x.TenVietTat)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.TenVietTat.Required"))
             ;


        }
    }
}
