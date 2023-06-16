using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Helpers;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using FluentValidation;

namespace Camino.Api.Models.TaiKhoans.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<TaiKhoanViewModel>))]
    public class TaiKhoanViewModelValidator : AbstractValidator<TaiKhoanViewModel>
    {
        public TaiKhoanViewModelValidator(ILocalizationService localizationService, INhanVienService nhanVienSevice)
        {
            RuleFor(x => x.HoTen)
              .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.HoTen.Required"));

            RuleFor(x => x.NamSinh)
               .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.NamSinh.Required"));
            RuleFor(x => x.SoDienThoai)
              .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.SoDienThoai.Required"))
           .Must((request, sdt, id) =>
           {
               var val = nhanVienSevice.CheckIsExistPhone(sdt.RemoveFormatPhone(), request.Id);
               return val;
           }).WithMessage(localizationService.GetResource("NhanVien.SoDienThoai.Exists"));
            RuleFor(x => x.GioiTinh)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.Sex.Required"));
            RuleFor(x => x.TinhThanhId)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.TinhThanh.Required"));
            RuleFor(x => x.QuanHuyenId)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.QuanHuyen.Required"));
            RuleFor(x => x.PhuongXaId)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.PhuongXa.Required"));
        }
    }
}
