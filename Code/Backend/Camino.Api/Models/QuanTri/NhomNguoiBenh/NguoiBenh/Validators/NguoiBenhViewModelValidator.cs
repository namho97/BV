using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNguoiBenh.NguoiBenh.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<NguoiBenhViewModel>))]
    public class NguoiBenhViewModelValidator : AbstractValidator<NguoiBenhViewModel>
    {

        public NguoiBenhViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.HoTen)
                .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.HoTen.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.HoTen.Required"));
            RuleFor(a => a.NamSinh)
                .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.NamSinh.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.NamSinh.Required"))
                .Must((request, ma, id) =>
                {
                    var kq = true;
                    if (request.NamSinh != null && request.NamSinh > DateTime.Now.Year)
                    {
                        kq = false;
                    }
                    if (request.NgaySinh != null && request.ThangSinh != null && request.NamSinh != null)
                    {
                        var ngayThangNamSinh = new DateTime(request.NamSinh.GetValueOrDefault(), request.ThangSinh.GetValueOrDefault(), request.NgaySinh.GetValueOrDefault());
                        if (ngayThangNamSinh > DateTime.Now)
                        {
                            kq = false;
                        }

                    }
                    return kq;

                }).WithMessage(localizationService.GetResource("NguoiBenh.NamSinh.InvalidValue"));

            RuleFor(a => a.GioiTinh)
                .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.GioiTinh.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.GioiTinh.Required"));
            RuleFor(a => a.SoDienThoai)
                .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.SoDienThoai.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.SoDienThoai.Required"));

            //RuleFor(a => a.TinhThanhId)
            //    .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.TinhThanhId.Required"))
            //    .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.TinhThanhId.Required"));
            //RuleFor(a => a.QuanHuyenId)
            //  .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.QuanHuyenId.Required"))
            //  .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.QuanHuyenId.Required"));
            //RuleFor(a => a.PhuongXaId)
            // .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.PhuongXaId.Required"))
            // .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.PhuongXaId.Required"));
            //RuleFor(a => a.HoTenNguoiGiamHo)
            // .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.HoTenNguoiGiamHo.Required"))
            // .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.HoTenNguoiGiamHo.Required"));
            //RuleFor(a => a.DanTocId)
            //  .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.DanTocId.Required"))
            //  .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.DanTocId.Required"));
            //RuleFor(a => a.QuocTichId)
            //     .NotNull().WithMessage(localizationService.GetResource("NguoiBenh.QuocTichId.Required"))
            //     .NotEmpty().WithMessage(localizationService.GetResource("NguoiBenh.QuocTichId.Required"));
        }
    }
}
