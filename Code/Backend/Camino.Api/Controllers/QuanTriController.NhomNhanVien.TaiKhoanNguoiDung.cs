using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.Error;
using Camino.Api.Models.TaiKhoans;
using Camino.Core.Domain;
using Camino.Services.Helpers;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomNhanVienTaiKhoanNguoiDungController : CaminoBaseController
    {
        private readonly IUserAgentHelper _userAgentHelper;
        private readonly IUserService _userService;
        private readonly IEncryptionService _encryptionService;
        private readonly ILocalizationService _localizationService;
        public QuanTriNhomNhanVienTaiKhoanNguoiDungController(IUserAgentHelper userAgentHelper, IUserService userService, IEncryptionService encryptionService, ILocalizationService localizationService)
        {
            _userAgentHelper = userAgentHelper;
            _userService = userService;
            _encryptionService = encryptionService;
            _localizationService = localizationService;
        }
        [HttpGet("GetThongTinTaiKhoan")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung)]
        public async Task<ActionResult> GetThongTinTaiKhoan()
        {
            var currentUserId = _userAgentHelper.GetCurrentUserId();
            var model = new TaiKhoanViewModel();
            var user = await _userService.GetByIdAsync(currentUserId, s => s.Include(a => a.NhanVien));
            model = user.ToModel(model);
            if (user.NgaySinh != null)
            {
                model.NgaySinh = user.NgaySinh;
                model.ThangSinh = user.ThangSinh;
                model.NamSinh = user.NamSinh;
            }
            return Ok(model);

        }


        [HttpPut("CapNhatThongTin")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung)]
        public async Task<ActionResult> CapNhatThongTin([FromBody] TaiKhoanViewModel model)
        {
            var currentUserId = _userAgentHelper.GetCurrentUserId();
            var user = await _userService.GetByIdAsync(currentUserId);
            model.ToEntity(user);
            user.NamSinh = model.NamSinh;
            user.ThangSinh = model.NgayThangNamSinh?.Month;
            user.NgaySinh = model.NgayThangNamSinh?.Day;
            await _userService.UpdateAsync(user);
            return NoContent();

        }
        [HttpPut("DoiMatKhau")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung)]
        public async Task<ActionResult> DoiMatKhau([FromBody] DoiMatKhauViewModel model)
        {
            var currentUserId = _userAgentHelper.GetCurrentUserId();
            var user = await _userService.GetByIdAsync(currentUserId);
            if (user.Password == null || !_encryptionService.VerifyHashedPassword(user.Password, model.MatKhauCu))
            {
                throw new ApiException("Mật khẩu cũ không đúng.");
            }
            user.Password = _encryptionService.HashPassword(model.MatKhauMoi);
            await _userService.UpdateAsync(user);
            return NoContent();
        }
    }
}
