using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.NhanViens.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhanVienDoiMatKhauViewModel>))]
    public class NhanVienDoiMatKhauViewModelValidator : AbstractValidator<NhanVienDoiMatKhauViewModel>
    {
        public NhanVienDoiMatKhauViewModelValidator(ILocalizationService localizationService, INhanVienService nhanVienSevice)
        {
            RuleFor(x => x.MatKhau)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.MatKhau.Required"));
            RuleFor(x => x.XacNhanMatKhau)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.XacNhanMatKhau.Required"))
            .Must((request, xacNhanMatKhau, id) =>
            {
                if (!string.IsNullOrEmpty(xacNhanMatKhau) && xacNhanMatKhau != request.MatKhau)
                    return false;
                return true;
            }).WithMessage(localizationService.GetResource("NhanVien.XacNhanMatKhau.Invalid"));
        }
    }
}
