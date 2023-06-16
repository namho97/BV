using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThongTinChanDoanDieuTriViewModel>))]
    public class ThongTinChanDoanDieuTriModelValidator : AbstractValidator<ThongTinChanDoanDieuTriViewModel>
    {

        public ThongTinChanDoanDieuTriModelValidator(ILocalizationService localizationService,
            IValidator<ToaThuocViewModel> thongTinChanDoanDieuTriToaThuocModelValidator,
            IValidator<DichVuKyThuatKhacViewModel> thongTinChanDoanDieuTriDichVuKhacModelValidator)
        {
            RuleFor(o => o.NoiDungChanDoan)
                .Must((request, chanDoan, id) =>
                {
                    if (string.IsNullOrEmpty(chanDoan) && request.HoanThanhKham != true)
                    {
                        return true;
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(chanDoan) && request.HoanThanhKham == true)
                        {
                            return false;
                        }
                        return true;
                    }
                }).WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.ChanDoan.Required"));
            RuleFor(o => o.ToaThuocs)
                .Must((request, toaThuocs, id) =>
                {
                    if (request.CachGiaiQuyet == Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.KeToaThuoc &&
                    (toaThuocs == null || !toaThuocs.Any()) && request.HoanThanhKham == true)
                    {
                        return false;
                    }
                    return true;
                }).WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.ToaThuoc.Required"));
            RuleFor(o => o.BenhVienChuyenDenId)
                .Must((request, benhVienChuyenDenId, id) =>
                {
                    if (request.CachGiaiQuyet == Core.Domain.KhamBenhs.KhamBenhEnum.CachGiaiQuyetEnum.NhapVien &&
                    (benhVienChuyenDenId == null || benhVienChuyenDenId == 0) && request.HoanThanhKham == true)
                    {
                        return false;
                    }
                    return true;
                }).WithMessage(localizationService.GetResource("BacSiKham.ThongTinChanDoanDieuTri.BenhVienChuyenDen.Required"));
            RuleForEach(o => o.ToaThuocs).SetValidator(thongTinChanDoanDieuTriToaThuocModelValidator);
            RuleForEach(o => o.DichVuKyThuatKhacs).SetValidator(thongTinChanDoanDieuTriDichVuKhacModelValidator);
        }
    }
}
