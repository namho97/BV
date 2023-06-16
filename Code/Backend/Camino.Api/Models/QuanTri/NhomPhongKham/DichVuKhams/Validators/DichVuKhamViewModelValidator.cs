using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DichVuKhamViewModel>))]
    public class DichVuKhamViewModelValidator : AbstractValidator<DichVuKhamViewModel>
    {

        public DichVuKhamViewModelValidator(ILocalizationService localizationService, IDichVuKhamBenhService dichVuKhamService, IValidator<DichVuKhamGiaViewModel> validateDichVuKhamGiaViewModel)
        {
            RuleFor(a => a.Ten)
                .NotNull().WithMessage(localizationService.GetResource("Common.Ten.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Ten.Required"));
            RuleFor(x => x.Ma)
              .NotEmpty().WithMessage(localizationService.GetResource("Common.Ma.Required"))
              .Must((model, input, f) => !dichVuKhamService.KiemTraTrungMaAsync(model.Id, input))
              .WithMessage(localizationService.GetResource("Common.Ma.IsExists"));


            RuleFor(a => a.HieuLuc)
           .NotNull().WithMessage(localizationService.GetResource("Common.HieuLuc.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("Common.HieuLuc.Required"));
            RuleFor(a => a.MacDinh)
           .NotNull().WithMessage(localizationService.GetResource("Common.MacDinh.Required"))
           .NotEmpty().WithMessage(localizationService.GetResource("Common.MacDinh.Required"));

            RuleForEach(x => x.DichVuKhamBenhGias).SetValidator(validateDichVuKhamGiaViewModel);

        }
    }
    [TransientDependency(ServiceType = typeof(IValidator<DichVuKhamGiaViewModel>))]
    public class DichVuKhamGiaModelValidator : AbstractValidator<DichVuKhamGiaViewModel>
    {
        public DichVuKhamGiaModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.Gia)
                .NotNull().WithMessage(localizationService.GetResource("Common.Gia.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("Common.Gia.Required"))
                .Must((request, gia, id) =>
                {
                    if (gia <= 0)
                    {
                        return false;
                    }
                    return true;
                }).WithMessage(localizationService.GetResource("Common.Gia.Required"));

            RuleFor(a => a.TuNgay)
               .NotNull().WithMessage(localizationService.GetResource("Common.TuNgay.Required"))
               .NotEmpty().WithMessage(localizationService.GetResource("Common.TuNgay.Required"));

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
            }).WithMessage(localizationService.GetResource("Common.DenNgay.NhoHonTuNgay"));
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
            }).WithMessage(localizationService.GetResource("Common.DenNgay.Required"));
        }
    }
}
