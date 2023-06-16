using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKyThuats.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DichVuKyThuatViewModel>))]
    public class DichVuKyThuatViewModelValidator : AbstractValidator<DichVuKyThuatViewModel>
    {

        public DichVuKyThuatViewModelValidator(ILocalizationService localizationService, IDichVuKyThuatService dichVuKyThuatService, IValidator<DichVuKyThuatGiaViewModel> validateDichVuKyThuatGiaViewModel)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("DichVuKyThuat.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("DichVuKyThuat.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("DichVuKyThuat.Ma.Required"))


              //.Must((viewModel, input, d) => string.IsNullOrEmpty(input) || (!string.IsNullOrEmpty(input) && input.Length >= 7))
              //     .WithMessage(localizationService.GetResource("DuocPham.Ma.Length"))
              .Must((model, input, f) => !dichVuKyThuatService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("DichVuKyThuat.Ma.IsExists"));

          
            RuleFor(a => a.HieuLuc)
           .NotNull().WithMessage(localizationService.GetResource("DichVuKyThuat.HieuLuc.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("DichVuKyThuat.HieuLuc.Required"));
            RuleFor(a => a.MacDinh)
           .NotNull().WithMessage(localizationService.GetResource("DichVuKyThuat.MacDinh.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("DichVuKyThuat.MacDinh.Required"));

            RuleForEach(x => x.DichVuKyThuatGias).SetValidator(validateDichVuKyThuatGiaViewModel);

        }
    }
    [TransientDependency(ServiceType = typeof(IValidator<DichVuKyThuatGiaViewModel>))]
    public class DichVuKyThuatGiaModelValidator : AbstractValidator<DichVuKyThuatGiaViewModel>
    {
        public DichVuKyThuatGiaModelValidator(ILocalizationService localizationService)
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
