using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.Users.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<UserViewModel>))]
    public class UserViewModelValidator : AbstractValidator<UserViewModel>
    {
        public UserViewModelValidator(ILocalizationService localizationService, IUserService _userService)
        {
            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage(localizationService.GetResource("User.Phone.Required"))
                 .NotNull().WithMessage(localizationService.GetResource("User.Phone.Required"))
              .MustAsync(async (request, sdt, id) =>
               {
                   var val = await _userService.CheckIsExistPhone(sdt.RemoveFormatPhone(), RegionType.Internal, request.Id);
                   return val;
               }).WithMessage(localizationService.GetResource("User.Phone.Exists"));



            RuleFor(x => x.Email)
          .EmailAddress().When(email => email.Email != "").WithMessage(localizationService.GetResource("User.Email.WrongEmail"))

           .MustAsync(async (request, email, id) =>
           {
               var val = await _userService.CheckIsExistEmail(email, RegionType.Internal, request.Id);
               return val;
           }).WithMessage(localizationService.GetResource("User.Email.Exists"));

        }
    }
}
