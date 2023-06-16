using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.ThuNgan.BacSiGiaDinh.ThuVienPhis.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<DichVuViewModel>))]
    public class DichVuModelValidator : AbstractValidator<DichVuViewModel>
    {

        public DichVuModelValidator(ILocalizationService localizationService)
        {


            //RuleFor(o => o.ThanhTien)
            //    .NotEmpty().WithMessage(localizationService.GetResource("ThuNgan.SoTien.Required"))
            //    .NotNull().WithMessage(localizationService.GetResource("ThuNgan.SoTien.Required"));

            //RuleFor(o => o.ThanhTien)
            //   .Must((request, soTien, id) =>
            //   {
            //       if (request!=null && soTien != ((request.MienGiam ?? 0)+ (request.DaThu ?? 0)+ (request.ChuaThu ?? 0)))
            //       {
            //           return false;
            //       }
            //       return true;
            //   }).WithMessage(localizationService.GetResource("ThuNgan.SoTien.Invalid"));

            RuleFor(o => o.MienGiam)
               .Must((request, mienGiam, id) =>
               {
                   if (request != null && mienGiam > request.ThanhTien)
                   {
                       return false;
                   }
                   return true;
               }).WithMessage(localizationService.GetResource("ThuNgan.MienGiam.Invalid"));
        }
    }
}
