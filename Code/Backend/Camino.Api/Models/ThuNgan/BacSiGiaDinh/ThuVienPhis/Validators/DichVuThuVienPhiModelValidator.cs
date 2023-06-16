using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.ThuNgan.BacSiGiaDinh.ThuVienPhis.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<ThongTinThuVienPhiViewModel>))]
    public class DichVuThuVienPhiModelValidator : AbstractValidator<ThongTinThuVienPhiViewModel>
    {

        public DichVuThuVienPhiModelValidator(ILocalizationService localizationService, IValidator<DichVuViewModel> dichVuValidator)
        {


            //RuleForEach(x => x.DichVus).SetValidator(dichVuValidator);
        }
    }
}
