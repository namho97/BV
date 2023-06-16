using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<KhoaPhongViewModel>))]
    public class KhoaPhongViewModelValidator : AbstractValidator<KhoaPhongViewModel>
    {
        public KhoaPhongViewModelValidator(ILocalizationService localizationService, IKhoaPhongService khoaPhongService)
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .Must((model, input, f) => !khoaPhongService.KiemTraTrungTenAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));

            RuleFor(x => x.Ma)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"));

            RuleFor(x => x.LoaiKhoaPhong)
               .NotEmpty().WithMessage(localizationService.GetResource("Common.LoaiKhoaPhong.Required"));

        }
    }
}
