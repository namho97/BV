using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Helpers;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.NhanViens.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NhanVienViewModel>))]
    public class NhanVienViewModelValidator : AbstractValidator<NhanVienViewModel>
    {
        public NhanVienViewModelValidator(ILocalizationService localizationService, INhanVienService nhanVienSevice)
        {
            RuleFor(x => x.HoTen)
              .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.HoTen.Required"));

            RuleFor(x => x.NamSinh)
               .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.NamSinh.Required"));
            //.Must((request, ngay, id) =>
            //{
            //    if (ngay == null)
            //        return false;
            //    return true;
            //}).WithMessage(localizationService.GetResource("Common.NgaySinh.Required"))
            // .Must((request, ngay, id) =>
            // {
            //     if (ngay != null && ngay.Value.Date >= DateTime.Now.Date)
            //         return false;
            //     return true;
            // }).WithMessage(localizationService.GetResource("Common.NgaySinh.LessThanNow"));
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
            RuleFor(x => x.RoleId)
             .NotEmpty().WithMessage(localizationService.GetResource("NhanVien.Quyen.Required"));
            RuleFor(x => x.MatKhau)
             .Must((request, matKhau, id) =>
            {
                if (request.Id == 0 && string.IsNullOrEmpty(matKhau))
                    return false;
                return true;
            }).WithMessage(localizationService.GetResource("NhanVien.MatKhau.Required"));
            RuleFor(x => x.XacNhanMatKhau)
             .Must((request, xacNhanMatKhau, id) =>
             {
                 if (request.Id == 0 && string.IsNullOrEmpty(xacNhanMatKhau))
                     return false;
                 return true;
             }).WithMessage(localizationService.GetResource("NhanVien.XacNhanMatKhau.Required"))
            .Must((request, xacNhanMatKhau, id) =>
            {
                if (request.Id == 0 && !string.IsNullOrEmpty(xacNhanMatKhau) && xacNhanMatKhau != request.MatKhau)
                    return false;
                return true;
            }).WithMessage(localizationService.GetResource("NhanVien.XacNhanMatKhau.Invalid"));
        }
    }
}
