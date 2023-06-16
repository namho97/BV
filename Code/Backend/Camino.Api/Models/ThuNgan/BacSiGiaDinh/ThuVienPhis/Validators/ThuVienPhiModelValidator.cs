using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.ThuNgan.BacSiGiaDinh.ThuVienPhis.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThuVienPhiViewModel>))]
    public class ThuVienPhiModelValidator : AbstractValidator<ThuVienPhiViewModel>
    {

        public ThuVienPhiModelValidator(ILocalizationService localizationService)
        {


            RuleFor(o => o.HinhThucThanhToan)
                .NotEmpty().WithMessage(localizationService.GetResource("ThuNgan.HinhThucThanhToan.Required"))
                .NotNull().WithMessage(localizationService.GetResource("ThuNgan.HinhThucThanhToan.Required"));

            RuleFor(o => o.TienMat)
               .Must((request, tienMat, id) =>
               {
                   if (request != null && request.HinhThucThanhToan != null && request.HinhThucThanhToan.Contains(Core.Domain.ThuNgans.ThuNganEnum.HinhThucThanhToanEnum.TienMat) && (tienMat == null || tienMat <= 0))
                   {
                       return false;
                   }
                   return true;
               }).WithMessage(localizationService.GetResource("ThuNgan.TienMat.Required"));

            RuleFor(o => o.ChuyenKhoan)
               .Must((request, chuyenKhoan, id) =>
               {
                   if (request != null && request.HinhThucThanhToan != null && request.HinhThucThanhToan.Contains(Core.Domain.ThuNgans.ThuNganEnum.HinhThucThanhToanEnum.ChuyenKhoan) && (chuyenKhoan == null || chuyenKhoan <= 0))
                   {
                       return false;
                   }
                   return true;
               }).WithMessage(localizationService.GetResource("ThuNgan.ChuyenKhoan.Required"));
            RuleFor(o => o.Pos)
                .Must((request, pos, id) =>
                {
                    if (request != null && request.HinhThucThanhToan != null && request.HinhThucThanhToan.Contains(Core.Domain.ThuNgans.ThuNganEnum.HinhThucThanhToanEnum.POS) && (pos == null || pos <= 0))
                    {
                        return false;
                    }
                    return true;
                }).WithMessage(localizationService.GetResource("ThuNgan.Pos.Required"));

            RuleFor(o => o.TongThucThu)
              .Must((request, tongThucThu, id) =>
              {
                  if (request != null && tongThucThu != null &&
                      (
                          (tongThucThu > (request.TienMat ?? 0) + (request.ChuyenKhoan ?? 0) + (request.Pos ?? 0)) ||
                          (tongThucThu < (request.TienMat ?? 0) + (request.ChuyenKhoan ?? 0) + (request.Pos ?? 0))
                      )
                  )
                  {
                      return false;
                  }
                  return true;
              }).WithMessage(localizationService.GetResource("ThuNgan.TongThucThu.Invalid"));

            RuleFor(o => o.NgayThu)
                .NotEmpty().WithMessage(localizationService.GetResource("ThuNgan.NgayThu.Required"))
                .NotNull().WithMessage(localizationService.GetResource("ThuNgan.NgayThu.Required"));

            RuleFor(o => o.NoiDungThu)
                .NotEmpty().WithMessage(localizationService.GetResource("ThuNgan.NoiDungThu.Required"))
                .NotNull().WithMessage(localizationService.GetResource("ThuNgan.NoiDungThu.Required"));
        }
    }
}
