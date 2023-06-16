using Camino.Core.DependencyInjection.Attributes;
using Camino.Services.Localization;
using FluentValidation;

namespace Camino.Api.Models.QuanTri.NhomDuocPham.TuongTacThuocs.Validators
{
    [TransientDependency(ServiceType = typeof(IValidator<TuongTacThuocViewModel>))]
    public class TuongTacThuocViewModelValidator : AbstractValidator<TuongTacThuocViewModel>
    {
        public TuongTacThuocViewModelValidator(ILocalizationService localizationService)
        {
            RuleFor(a => a.ThuocHoacHoatChat1Id)
                .NotNull().WithMessage(localizationService.GetResource("TuongTacThuoc.HoatChaT1Id.Required"))
                .NotEmpty().WithMessage(localizationService.GetResource("TuongTacThuoc.HoatChaT1Id.Required"));

            RuleFor(a => a.ThuocHoacHoatChat2Id)
                 .NotNull().WithMessage(localizationService.GetResource("TuongTacThuoc.HoatChaT2Id.Required"))
                 .NotEmpty().WithMessage(localizationService.GetResource("TuongTacThuoc.HoatChaT2Id.Required"));

            RuleFor(a => a.TuongTacHauQua)
                 .NotNull().WithMessage(localizationService.GetResource("TuongTacThuoc.TuongTacHauQua.Required"))
                 .NotEmpty().WithMessage(localizationService.GetResource("TuongTacThuoc.TuongTacHauQua.Required"));

            RuleFor(a => a.MucDoChuYKhiChiDinh)
                 .NotNull().WithMessage(localizationService.GetResource("TuongTacThuoc.MucDoChuYKhiChiDinh.Required"))
                 .NotEmpty().WithMessage(localizationService.GetResource("TuongTacThuoc.MucDoChuYKhiChiDinh.Required"));

            RuleFor(a => a.MucDoTuongTac)
                 .NotNull().WithMessage(localizationService.GetResource("TuongTacThuoc.MucDoTuongTac.Required"))
                 .NotEmpty().WithMessage(localizationService.GetResource("TuongTacThuoc.MucDoTuongTac.Required"));
        }
    }

}
