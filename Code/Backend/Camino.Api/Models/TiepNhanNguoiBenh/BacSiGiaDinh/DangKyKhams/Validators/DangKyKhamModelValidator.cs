using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Helpers;
using Camino.Services.Localization;
using Camino.Services.TiepNhans;
using FluentValidation;

namespace Camino.Api.Models.TiepNhanNguoiBenh.BacSiGiaDinh.DangKyKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DangKyKhamViewModel>))]
    public class DangKyKhamModelValidator : AbstractValidator<DangKyKhamViewModel>
    {

        public DangKyKhamModelValidator(ILocalizationService localizationService, IYeuCauTiepNhanService yeuCauTiepNhanService)
        {
            RuleFor(o => o.HoTen)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.HoTen.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.HoTen.Required"));
            RuleFor(o => o.SoDienThoai)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.SoDienThoai.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.SoDienThoai.Required"));
            RuleFor(o => o.NamSinh)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.NamSinh.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.NamSinh.Required"));
            RuleFor(o => o.GioiTinh)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.GioiTinh.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinHanhChinh.GioiTinh.Required"));

            RuleFor(o => o.NgayHenKham)
               .Must((request, ngayHen, id) =>
               {
                   if (ngayHen == null && request.LaDangKyHenKham != true)
                   {
                       return true;
                   }
                   else
                   {
                       if (ngayHen == null && request.LaDangKyHenKham == true)
                       {
                           return false;
                       }
                       return true;
                   }
               }).WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinLichHen.NgayHen.Required"));
            RuleFor(o => o.NgayHenKham)
              .Must((request, ngayHenKham, id) =>
              {
                  if (request.Id > 0)
                  {
                      var yeuCauTiepNhan = yeuCauTiepNhanService.GetById(request.Id);
                      if (ngayHenKham == null || yeuCauTiepNhan.NgayHenKham == ((DateTime)ngayHenKham).Date || ((DateTime)ngayHenKham).Date >= DateTime.Now.Date)
                      {
                          return true;
                      }
                      else
                      {
                          return false;
                      }
                  }
                  else
                  {
                      if (ngayHenKham == null || ((DateTime)ngayHenKham).Date >= DateTime.Now.Date)
                      {
                          return true;
                      }
                      else
                      {
                          return false;
                      }
                  }
              }).WithMessage(string.Format(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinLichHen.NgayHen.Invalid")));
            RuleFor(o => o.GioHenKham)
               .Must((request, gioHenTu, id) =>
               {
                   if (gioHenTu == null && request.LaDangKyHenKham != true)
                   {
                       return true;
                   }
                   else
                   {
                       if (gioHenTu == null && request.LaDangKyHenKham == true)
                       {
                           return false;
                       }
                       return true;
                   }
               }).WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinLichHen.GioHenTu.Required"));

            RuleFor(o => o.GioHenKham)
              .Must((request, gioHenKham, id) =>
              {
                  if (gioHenKham == null || request.NgayHenKham == null)
                  {
                      return true;
                  }
                  else
                  {
                      var date = ((DateTime)request.NgayHenKham).AddSeconds((int)gioHenKham);
                      if (request.Id > 0)
                      {
                          var yeuCauTiepNhan = yeuCauTiepNhanService.GetById(request.Id);
                          if ((yeuCauTiepNhan.GioHenKham == gioHenKham && yeuCauTiepNhan.NgayHenKham == request.NgayHenKham) || date > DateTime.Now)
                          {
                              return true;
                          }
                          else
                          {
                              return false;
                          }
                      }
                      else
                      {
                          if (date > DateTime.Now)
                          {
                              return true;
                          }
                          else
                          {
                              return false;
                          }
                      }
                  }
              }).WithMessage(string.Format(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinLichHen.GioHenKham.Invalid")));

            var soThuTuMoiNhat = ResourceHelper.GetSoThuTuTiepNhan();
            RuleFor(o => o.ThoiDiemTiepNhan)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinTiepNhan.NgayTiepNhan.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinTiepNhan.NgayTiepNhan.Required"));
            RuleFor(o => o.SoThuTu)
                .NotEmpty().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinTiepNhan.SoThuTu.Required"))
                .NotNull().WithMessage(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinTiepNhan.SoThuTu.Required"));
            RuleFor(o => o.SoThuTu)
               .Must((request, soThuTu, id) =>
               {
                   if (soThuTu == null || !yeuCauTiepNhanService.KiemTraTrungSoThuTu((int)soThuTu, request.Id))
                   {
                       return true;
                   }
                   else
                   {
                       if (soThuTuMoiNhat == soThuTu)
                       {
                           ResourceHelper.CreateSoThuTuTiepNhan();
                           soThuTuMoiNhat = ResourceHelper.GetSoThuTuTiepNhan();
                       }
                       return false;
                   }
               }).WithMessage(string.Format(localizationService.GetResource("TiepNhanNguoiBenh.ThongTinTiepNhan.SoThuTu.Invalid"), soThuTuMoiNhat));
        }
    }
}
