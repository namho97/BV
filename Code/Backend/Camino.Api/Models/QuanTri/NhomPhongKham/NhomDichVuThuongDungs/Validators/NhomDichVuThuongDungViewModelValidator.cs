using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVuThuongDungs.Validators
{

    [TransientDependency(ServiceType = typeof(IValidator<NhomDichVuThuongDungViewModel>))]
    public class NhomDichVuThuongDungViewModelValidator : AbstractValidator<NhomDichVuThuongDungViewModel>
    {

        public NhomDichVuThuongDungViewModelValidator(ILocalizationService localizationService, INhomDichVuThuongDungService nhomDichVuThuongDungService)
        {
            RuleFor(a => a.LoaiGoiDichVu)
                .NotNull().WithMessage(localizationService.GetResource("NhomDichVuThuongDung.LoaiGoiDichVu.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NhomDichVuThuongDung.LoaiGoiDichVu.Required"));
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"))
                .Must((model, input, p) => !nhomDichVuThuongDungService.KiemTraTrungTenAsync(model.Id, input))
                .WithMessage(localizationService.GetResource("Common.Ma.Exist"));
        }
    }
}
