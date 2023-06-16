using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongPhongKhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongPhongKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<KhoaPhongPhongKhamViewModel>))]
    public class KhoaPhongPhongKhamViewModelValidator : AbstractValidator<KhoaPhongPhongKhamViewModel>
    {

        public KhoaPhongPhongKhamViewModelValidator(ILocalizationService localizationService, IKhoaPhongPhongKhamService khoaPhongPhongKhamService)
        {
            RuleFor(a => a.Ma)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"));
            RuleFor(x => x.Ten)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
              .Must((model, input, f) => !khoaPhongPhongKhamService.KiemTraTrungTenAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));

            RuleFor(x => x.KhoaPhongId)
             .NotEmpty().WithMessage(localizationService.GetResource("KhoaPhongPhongKham.KhoaPhongId.Required"));

        }
    }
}
