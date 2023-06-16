using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomHanhChinhs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomHanhChinh.QuocGias.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<QuocGiaViewModel>))]
    public class QuocGiaViewModelValidator : AbstractValidator<QuocGiaViewModel>
    {

        public QuocGiaViewModelValidator(ILocalizationService localizationService, IQuocGiaService quocGiaService)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.Ma.Required"))
              .Must((model, input, f) => !quocGiaService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("DonViTinh.Ma.IsExists"));

            RuleFor(a => a.HieuLuc)
                .NotNull().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DonViTinh.HieuLuc.Required"));
            RuleFor(a => a.ChauLuc)
                .NotNull().WithMessage(localizationService.GetResource("QuocGia.ChauLuc.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("QuocGia.ChauLuc.Required"));
            RuleFor(a => a.ThuDo)
              .NotNull().WithMessage(localizationService.GetResource("QuocGia.ThuDo.Required"))
              .NotEmpty().WithMessage(localizationService.GetResource("QuocGia.ThuDo.Required"));
            RuleFor(a => a.MaDienThoaiQuocTe)
             .NotNull().WithMessage(localizationService.GetResource("QuocGia.MaDienThoaiQuocTe.Required"))
             .NotEmpty().WithMessage(localizationService.GetResource("QuocGia.MaDienThoaiQuocTe.Required"));
            RuleFor(a => a.TenVietTat)
           .NotNull().WithMessage(localizationService.GetResource("QuocGia.TenVietTat.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("QuocGia.TenVietTat.Required"));
            RuleFor(a => a.QuocTich)
         .NotNull().WithMessage(localizationService.GetResource("QuocGia.QuocTich.Required"))
         .NotEmpty().WithMessage(localizationService.GetResource("QuocGia.QuocTich.Required"));
        }
    }
}
