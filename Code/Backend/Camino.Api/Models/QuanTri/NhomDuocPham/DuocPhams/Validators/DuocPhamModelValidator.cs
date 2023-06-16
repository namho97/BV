using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomDuocPhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomDuocPham.DuocPhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DuocPhamViewModel>))]
    public class DuocPhamModelValidator : AbstractValidator<DuocPhamViewModel>
    {

        public DuocPhamModelValidator(ILocalizationService localizationService, IDuocPhamService duocPhamService, IValidator<DuocPhamGiaViewModel> validateDuocPhamGiaViewModel)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.Ma.Required"))


              //.Must((viewModel, input, d) => string.IsNullOrEmpty(input) || (!string.IsNullOrEmpty(input) && input.Length >= 7))
              //     .WithMessage(localizationService.GetResource("DuocPham.Ma.Length"))
              .Must((model, input, f) => !duocPhamService.KiemTraTrungMaDuocPhamBenhVienAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("DuocPham.Ma.IsExists"));


            RuleFor(a => a.HamLuong)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.HamLuong.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.HamLuong.Required"));
            RuleFor(a => a.DonViTinhId)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.DonViTinh.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.DonViTinh.Required"));
            RuleFor(a => a.DuongDungId)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.DuongDung.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.DuongDung.Required"));
            RuleFor(a => a.HieuLuc)
           .NotNull().WithMessage(localizationService.GetResource("DuocPham.HieuLuc.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.HieuLuc.Required"));

            RuleForEach(x => x.DuocPhamGias).SetValidator(validateDuocPhamGiaViewModel);

        }
    }
    [TransientDependency(ServiceType = typeof(IValidator<DuocPhamGiaViewModel>))]
    public class DuocPhamGiaModelValidator : AbstractValidator<DuocPhamGiaViewModel>
    {
        public DuocPhamGiaModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.Gia)
                .NotNull().WithMessage(localizationService.GetResource("DuocPham.Gia.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.Gia.Required"))
                .Must((request, gia, id) =>
                {
                    if (gia <= 0)
                    {
                        return false;
                    }
                    return true;
                }).WithMessage(localizationService.GetResource("DuocPham.Gia.Required"));

            RuleFor(a => a.TuNgay)
               .NotNull().WithMessage(localizationService.GetResource("DuocPham.TuNgay.Required"))
               .NotEmpty().WithMessage(localizationService.GetResource("DuocPham.TuNgay.Required"));

            RuleFor(x => x.DenNgay).Must((request, ten, id) =>
            {
                if (request.TuNgay != null && request.DenNgay != null)
                {
                    if ((DateTime)request.DenNgay < (DateTime)request.TuNgay)
                    {
                        return false;
                    }
                }
                return true;
            }).WithMessage(localizationService.GetResource("DuocPham.DenNgay.NhoHonTuNgay"));
            RuleFor(x => x.DenNgay).Must((request, ten, id) =>
            {
                if (request.DenNgayRequired == true)
                {
                    if (request.DenNgay == null)
                    {
                        return false;
                    }
                }
                return true;
            }).WithMessage(localizationService.GetResource("DuocPham.DenNgay.Required"));
        }
    }
}
