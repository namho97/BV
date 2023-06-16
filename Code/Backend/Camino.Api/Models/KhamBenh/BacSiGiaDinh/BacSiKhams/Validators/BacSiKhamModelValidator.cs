using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<BacSiKhamViewModel>))]
    public class BacSiKhamViewModelValidator : AbstractValidator<BacSiKhamViewModel>
    {

        public BacSiKhamViewModelValidator(ILocalizationService localizationService)
        {
        }
    }
}
