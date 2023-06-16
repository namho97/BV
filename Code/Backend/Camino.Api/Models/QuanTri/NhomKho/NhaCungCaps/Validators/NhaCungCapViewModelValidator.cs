using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomKhos.NhaCungCaps;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomKho.NhaCungCaps.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhaCungCapViewModel>))]
    public class NhaCungCapViewModelValidator : AbstractValidator<NhaCungCapViewModel>
    {
        public NhaCungCapViewModelValidator(ILocalizationService localizationService, INhaCungCapService nhaCungCapService)
        {
            RuleFor(x => x.Ten)
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .Must((model, input, f) => !nhaCungCapService.KiemTraTrungTenAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ten.IsExists"));

            RuleFor(x => x.MaSoThue)
                .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.MaSoThue.Required"))
                .Must((model, input, f) => !nhaCungCapService.KiemTraTrungMaSoThueAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("NhaCungCap.MaSoThue.IsExists"));

            RuleFor(x => x.Ma)
               .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"));
            RuleFor(x => x.DiaChi)
               .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.DiaChi.Required"));

            RuleFor(x => x.TaiKhoanNganHang)
               .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.TaiKhoanNganHang.Required"));
            RuleFor(x => x.EmailLienHe)
               .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.EmailLienHe.Required"));
            RuleFor(x => x.NguoiDaiDien)
               .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.NguoiDaiDien.Required"));
            RuleFor(x => x.NguoiLienHe)
              .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.NguoiLienHe.Required"));
            RuleFor(x => x.SoDienThoaiLienHe)
            .NotEmpty().WithMessage(localizationService.GetResource("NhaCungCap.SoDienThoaiLienHe.Required"));
        }
    }
}
