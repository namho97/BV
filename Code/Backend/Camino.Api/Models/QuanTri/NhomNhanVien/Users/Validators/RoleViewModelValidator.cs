using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.Users.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<RoleViewModel>))]
    public class RoleViewModelValidator : AbstractValidator<RoleViewModel>
    {
        public RoleViewModelValidator(ILocalizationService localizationService, IRoleService _roleService)
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage(localizationService.GetResource("Role.Name.Required"))
                .Must((model, input, f) => !_roleService.KiemTraTrungTen(model.Id, input))
                    .WithMessage(localizationService.GetResource("Role.Name.Exists"));


        }
    }
}