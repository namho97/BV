using Camino.Api.Auth;
using Camino.Api.Models.Auth;
using Camino.Api.Models.Error;
using Camino.Core.Configuration;
using Camino.Core.Domain;
using Camino.Core.Domain.Messages;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Services.Localization;
using Camino.Services.Messages;
using Camino.Services.QuanTris.NhomCauHinhs;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;

namespace Camino.Api.Controllers
{
    public class AuthController : CaminoBaseController
    {
        private readonly IJwtFactory _iJwtFactory;
        private readonly IUserService _userService;
        private readonly IRoleService _roleService;
        private readonly ICauHinhService _cauHinhService;
        private readonly ILocalizationService _localizationService;
        private readonly IEmailService _emailService;
        private readonly ISmsService _smsService;
        private readonly SmsConfig _smsConfig;
        private readonly IUserMessagingTokenService _userMessagingTokenService;
        private readonly IEncryptionService _encryptionService;
        public AuthController(IUserService userService, IRoleService roleService, IJwtFactory iJwtFactory,
            ILocalizationService localizationService, IUserMessagingTokenService userMessagingTokenService, IEncryptionService encryptionService,
        ISmsService smsService, IEmailService emailService, ICauHinhService cauHinhService, SmsConfig smsConfig)
        {
            _userService = userService;
            _roleService = roleService;
            _iJwtFactory = iJwtFactory;
            _localizationService = localizationService;
            _cauHinhService = cauHinhService;
            _smsService = smsService;
            _emailService = emailService;
            _smsConfig = smsConfig;
            _encryptionService = encryptionService;
            _userMessagingTokenService = userMessagingTokenService;
        }

        private int ThoiGianHetHanMaXacNhan => _cauHinhService.GetSettingByKey("CauHinhHeThong.ThoiGianHetHanMaXacNhan", 180);
        [HttpPost("VerifyUsername")]
        public async Task<IActionResult> VerifyUsername(LoginViewModel loginViewModel)
        {
            var user = await _userService.GetUserByPhoneNumberOrEmail(loginViewModel.UserName, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongUsername"));
            }
            else
            {
                if (user.IsActive != true)
                {
                    throw new ApiException(_localizationService.GetResource("DangNhap.InActive"),
                        (int)HttpStatusCode.Unauthorized);
                }
                else
                {
                    if (string.IsNullOrEmpty(user.Password))
                    {
                        if (user.ExpiredCodeDate > DateTime.Now)
                        {
                            return Ok(user.ExpiredCodeDate);
                        }
                        else
                        {
                            if (CommonHelper.IsPhoneValid(loginViewModel.UserName))
                            {
                                if (!string.IsNullOrEmpty(_smsConfig.PassCodeDault))
                                {
                                    user.PassCode = _smsConfig.PassCodeDault;
                                    user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                    _userService.Update(user);
                                    return Ok(user.ExpiredCodeDate);
                                }
                                else
                                {
                                    var passCode = _encryptionService.RandomPassCode(6);
                                    if (_smsService.SendSmsTaoMatKhau(loginViewModel.UserNameRemoveFormat, passCode))
                                    {
                                        user.PassCode = passCode;
                                        user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                        _userService.Update(user);
                                        return Ok(user.ExpiredCodeDate);
                                    }
                                    else
                                    {
                                        throw new ApiException(
                                            _localizationService.GetResource("DangNhap.SendPassCodeFail"));
                                    }
                                }
                            }
                            else
                            {
                                if (CommonHelper.IsMailValid(loginViewModel.UserName))
                                {
                                    var passCode = _encryptionService.RandomPassCode(6);
                                    if (_emailService.SendEmailTaoMatKhau(loginViewModel.UserName, passCode))
                                    {
                                        user.PassCode = passCode;
                                        user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                        _userService.Update(user);
                                        return Ok(user.ExpiredCodeDate);
                                    }
                                    else
                                    {
                                        throw new ApiException(
                                            _localizationService.GetResource("DangNhap.SendPassCodeFail"));
                                    }
                                }
                                else
                                {
                                    throw new ApiException(
                                        _localizationService.GetResource("DangNhap.WrongUsernameFormat"),
                                        (int)HttpStatusCode.BadRequest);
                                }
                            }
                        }
                    }
                    else
                    {
                        return Ok(null);
                    }
                }
            }
        }

        [HttpPost("SendPassCode")]
        public async Task<IActionResult> SendPassCode(LoginViewModel loginViewModel)
        {
            var user = await _userService.GetUserByPhoneNumberOrEmail(loginViewModel.UserName, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongUsername"));
            }
            else
            {
                if (user.IsActive != true)
                {
                    throw new ApiException(_localizationService.GetResource("DangNhap.InActive"),
                        (int)HttpStatusCode.Unauthorized);
                }
                else
                {
                    if (user.ExpiredCodeDate != null && user.ExpiredCodeDate > DateTime.Now)
                    {
                        return Ok(user.ExpiredCodeDate);
                    }
                    else
                    {
                        if (CommonHelper.IsPhoneValid(loginViewModel.UserName))
                        {
                            if (!string.IsNullOrEmpty(_smsConfig.PassCodeDault))
                            {
                                user.PassCode = _smsConfig.PassCodeDault;
                                user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                _userService.Update(user);
                                return Ok(user.ExpiredCodeDate);
                            }
                            else
                            {
                                var passCode = _encryptionService.RandomPassCode(6);
                                if (_smsService.SendSmsTaoMatKhau(loginViewModel.UserNameRemoveFormat, passCode))
                                {
                                    user.PassCode = passCode;
                                    user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                    _userService.Update(user);
                                    return Ok(user.ExpiredCodeDate);
                                }
                                else
                                {
                                    throw new ApiException(_localizationService.GetResource("DangNhap.SendPassCodeFail"));
                                }
                            }
                        }
                        else
                        {
                            if (CommonHelper.IsMailValid(loginViewModel.UserName))
                            {
                                var passCode = _encryptionService.RandomPassCode(6);
                                if (_emailService.SendEmailTaoMatKhau(loginViewModel.UserName, passCode))
                                {
                                    user.PassCode = passCode;
                                    user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                    _userService.Update(user);
                                    return Ok(user.ExpiredCodeDate);
                                }
                                else
                                {
                                    throw new ApiException(_localizationService.GetResource("DangNhap.SendPassCodeFail"));
                                }
                            }
                            else
                            {
                                throw new ApiException(_localizationService.GetResource("DangNhap.WrongUsernameFormat"), (int)HttpStatusCode.BadRequest);
                            }
                        }
                    }
                }
            }
        }

        [HttpPost("ForgetPassword")]
        public async Task<IActionResult> ForgetPassword(ForgotPasswordViewModel forgotPasswordViewModel)
        {
            if (forgotPasswordViewModel.ForgotPasswordStage != EnumForgotPasswordStage.IsForget)
            {
                throw new ApiException(_localizationService.GetResource("Auth.ForgotPassword.ForgotPasswordStage.Inappropriate"), (int)HttpStatusCode.BadRequest);
            }

            var user = await _userService.GetUserByPhoneNumberOrEmail(forgotPasswordViewModel.UserName, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.AccountNotAvailable"));
            }
            else
            {
                if (user.IsActive != true)
                {
                    throw new ApiException(_localizationService.GetResource("DangNhap.InActive"), (int)HttpStatusCode.Unauthorized);
                }
                else
                {
                    if (forgotPasswordViewModel.UserNameType == EnumUserNameType.IsPhone)
                    {
                        if (user.ExpiredCodeDate != null && user.ExpiredCodeDate > DateTime.Now)
                        {
                            return Ok(user.ExpiredCodeDate);
                        }
                        else
                        {
                            if (!string.IsNullOrEmpty(_smsConfig.PassCodeDault))
                            {
                                user.PassCode = _smsConfig.PassCodeDault;
                                user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                _userService.Update(user);
                                return Ok(user.ExpiredCodeDate);
                            }
                            else
                            {
                                var passCode = _encryptionService.RandomPassCode(6);
                                if (_smsService.SendSmsTaoMatKhau(forgotPasswordViewModel.UserNameRemoveFormat, passCode))
                                {
                                    user.PassCode = passCode;
                                    user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                                    _userService.Update(user);
                                    return Ok(user.ExpiredCodeDate);
                                }
                                else
                                {
                                    throw new ApiException(_localizationService.GetResource("DangNhap.SendPassCodeFail"));
                                }
                            }
                        }
                    }
                    else
                    {
                        if (string.IsNullOrEmpty(forgotPasswordViewModel.Domain))
                        {
                            throw new ApiException(_localizationService.GetResource("Auth.ForgetPassword.SendEmail.InvalidDomain"));
                        }

                        var passCode = _encryptionService.RandomPassCode(6);

                        if (_emailService.SendEmailTaoMatKhauWithHoTen(forgotPasswordViewModel.UserName, passCode, user.HoTen, forgotPasswordViewModel.Domain))
                        {
                            user.PassCode = passCode;
                            user.ExpiredCodeDate = DateTime.Now.AddSeconds(ThoiGianHetHanMaXacNhan);
                            _userService.Update(user);
                            return Ok(user.ExpiredCodeDate);
                        }
                        else
                        {
                            throw new ApiException(_localizationService.GetResource("DangNhap.SendPassCodeFail"));
                        }
                    }
                }
            }
        }

        [HttpPost("VerifyPassCode")]
        public async Task<IActionResult> VerifyPassCode(LoginViewModel loginViewModel)
        {
            var user = await _userService.GetUserByPassCode(loginViewModel.UserName, loginViewModel.PassCode, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }
            if (user.IsActive != true)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.InActive"),
                    (int)HttpStatusCode.Unauthorized);
            }
            if (user.ExpiredCodeDate < DateTime.Now)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.ExpiredPassCode"));
            }
            return Ok(true);
        }

        [HttpPost("VerifyPassCodeForForgottenPassword")]
        public async Task<IActionResult> VerifyPassCodeForForgottenPassword(ForgotPasswordViewModel forgotPasswordViewModel)
        {
            if (forgotPasswordViewModel.ForgotPasswordStage != EnumForgotPasswordStage.IsVerify)
            {
                throw new ApiException(_localizationService.GetResource("Auth.ForgotPassword.ForgotPasswordStage.Inappropriate"), (int)HttpStatusCode.BadRequest);
            }

            var user = await _userService.GetUserByPhoneNumberOrEmail(forgotPasswordViewModel.DecodedEmail, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }
            if (user.IsActive != true)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.InActive"), (int)HttpStatusCode.Unauthorized);
            }

            var base64Data = new
            {
                UserName = user.Email,
                PassCode = user.PassCode
            };

            if (!HashHelper.VerifyHashedHashString(forgotPasswordViewModel.DecodedBase64Data, JsonConvert.SerializeObject(base64Data)))
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }

            if (user.ExpiredCodeDate == null || user.ExpiredCodeDate < DateTime.Now)
            {
                //throw new ApiException(_localizationService.GetResource("DangNhap.ExpiredPassCode"));
                return Ok(false);
            }

            return Ok(true);
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword(ForgotPasswordViewModel forgotPasswordViewModel)
        {
            if (forgotPasswordViewModel.ForgotPasswordStage != EnumForgotPasswordStage.IsReset)
            {
                throw new ApiException(_localizationService.GetResource("Auth.ForgotPassword.ForgotPasswordStage.Inappropriate"), (int)HttpStatusCode.BadRequest);
            }

            var user = await _userService.GetUserByPhoneNumberOrEmail(forgotPasswordViewModel.DecodedEmail, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }
            if (user.IsActive != true)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.InActive"), (int)HttpStatusCode.Unauthorized);
            }

            var base64Data = new
            {
                UserName = user.Email,
                PassCode = user.PassCode
            };

            if (!HashHelper.VerifyHashedHashString(forgotPasswordViewModel.DecodedBase64Data, JsonConvert.SerializeObject(base64Data)))
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }

            if (user.ExpiredCodeDate == null || user.ExpiredCodeDate < DateTime.Now)
            {
                //throw new ApiException(_localizationService.GetResource("DangNhap.ExpiredPassCode"));
                return Ok(false);
            }

            user.Password = _encryptionService.HashPassword(forgotPasswordViewModel.Password);
            user.ExpiredCodeDate = DateTime.Now;

            await _userService.UpdateAsync(user);

            return Ok(true);
        }

        [HttpPost("SetPassword")]
        public async Task<IActionResult> SetPassword(LoginViewModel loginViewModel)
        {
            var user = await _userService.GetUserByPassCode(loginViewModel.UserName, loginViewModel.PassCode, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongPassCode"));
            }

            if (user.IsActive != true)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.InActive"),
                    (int)HttpStatusCode.Unauthorized);
            }
            user.Password = _encryptionService.HashPassword(loginViewModel.Password);
            _userService.Update(user);
            if (!string.IsNullOrEmpty(loginViewModel.FcmToken))
            {
                await _userMessagingTokenService.SetupUserMessagingTokenAsync(user.Id, loginViewModel.FcmToken, DeviceType.Web);
            }

            long[] userRoles = await _userService.GetRoles(user.Id, RegionType.Internal, loginViewModel.UserType);
            if (userRoles.Length == 0)
            {
                throw new ApiException(string.Format(_localizationService.GetResource("DangNhap.NotAllow"), loginViewModel.UserType.GetDescription()));
            }
            var accessUser = new AccessUser()
            {
                AccessToken = _iJwtFactory.GenerateInternalToken(user.Id, userRoles),
                UserName = user.SoDienThoai,
                FullName = user.HoTen,
                Id = user.Id,
                MenuInfo = _roleService.GetMenuInfo(userRoles),
                Permissions = _roleService.GetPermissions(userRoles),
                UserType = loginViewModel.UserType,
                Logo = _cauHinhService.GetSetting("CauHinhPhongKham.Logo")?.Value,
                TenPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.Ten")?.Value,
                DienThoaiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.SoDienThoai")?.Value,
                DiaChiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.DiaChi")?.Value,
                GioKhamPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.GioKham")?.Value,
                LinkDangKyKham = _cauHinhService.GetSetting("CauHinhPhongKham.LinkDangKyKham")?.Value
            };
            return Ok(accessUser);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginViewModel loginViewModel)
        {
            var user = await _userService.GetUserByPhoneNumberOrEmailAndPassword(loginViewModel.UserName, loginViewModel.Password, RegionType.Internal);
            if (user == null)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.WrongUserOrPassword"));//DangNhap.WrongPassword
            }
            if (user != null && string.IsNullOrEmpty(user.Password))
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.AccountNotAvailable"));
            }
            if (user != null && user.IsActive != true)
            {
                throw new ApiException(_localizationService.GetResource("DangNhap.InActive"));
            }
            if (!string.IsNullOrEmpty(loginViewModel.FcmToken))
            {
                await _userMessagingTokenService.SetupUserMessagingTokenAsync(user.Id, loginViewModel.FcmToken, DeviceType.Web);
            }

            long[] userRoles = await _userService.GetRoles(user.Id, RegionType.Internal, loginViewModel.UserType);
            if (userRoles.Length == 0)
            {
                throw new ApiException(string.Format(_localizationService.GetResource("DangNhap.NotAllow"), loginViewModel.UserType.GetDescription()));
            }

            var accessUser = new AccessUser()
            {
                AccessToken = _iJwtFactory.GenerateInternalToken(user.Id, userRoles),
                UserName = user.SoDienThoai,
                FullName = user.HoTen,
                Id = user.Id,
                MenuInfo = _roleService.GetMenuInfo(userRoles),
                Permissions = _roleService.GetPermissions(userRoles),
                UserType = loginViewModel.UserType,
                Logo = _cauHinhService.GetSetting("CauHinhPhongKham.Logo")?.Value,
                TenPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.Ten")?.Value,
                DienThoaiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.SoDienThoai")?.Value,
                DiaChiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.DiaChi")?.Value,
                GioKhamPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.GioKham")?.Value,
                LinkDangKyKham = _cauHinhService.GetSetting("CauHinhPhongKham.LinkDangKyKham")?.Value
            };
            return Ok(accessUser);
        }

        [HttpPost("LoginWithPassCode")]
        public async Task<IActionResult> LoginWithPassCode(LoginPassCodeViewModel loginPassCodeViewModel)
        {
            var user = await _userService.GetUserByPhoneAndPassCode(loginPassCodeViewModel.Phone, loginPassCodeViewModel.PassCode);
            if (user == null)
            {
                throw new ApiException("Invalid PassCode.", (int)HttpStatusCode.Unauthorized);
            }
            if (!string.IsNullOrEmpty(loginPassCodeViewModel.FcmToken))
            {
                await _userMessagingTokenService.SetupUserMessagingTokenAsync(user.Id, loginPassCodeViewModel.FcmToken, DeviceType.Web);
            }

            long[] userRoles = await _userService.GetRoles(user.Id, RegionType.Internal, loginPassCodeViewModel.UserType);
            if (userRoles.Length == 0)
            {
                throw new ApiException(string.Format(_localizationService.GetResource("DangNhap.NotAllow"), loginPassCodeViewModel.UserType.GetDescription()));
            }

            var accessUser = new AccessUser()
            {
                AccessToken = _iJwtFactory.GenerateInternalToken(user.Id, userRoles),
                UserName = user.SoDienThoai,
                FullName = user.HoTen,
                Id = user.Id,
                MenuInfo = _roleService.GetMenuInfo(userRoles),
                Permissions = _roleService.GetPermissions(userRoles),
                UserType = loginPassCodeViewModel.UserType,
                Logo = _cauHinhService.GetSetting("CauHinhPhongKham.Logo")?.Value,
                TenPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.Ten")?.Value,
                DienThoaiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.SoDienThoai")?.Value,
                DiaChiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.DiaChi")?.Value,
                GioKhamPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.GioKham")?.Value,
                LinkDangKyKham = _cauHinhService.GetSetting("CauHinhPhongKham.LinkDangKyKham")?.Value
            };
            return Ok(accessUser);
        }

        [HttpPost("AutoLogin")]
        [ClaimRequirement(SecurityOperation.None, DocumentType.None)]
        public async Task<IActionResult> AutoLogin()
        {
            var user = await _userService.GetCurrentUser();
            if (user == null)
            {
                throw new ApiException("Auto Login Error", (int)HttpStatusCode.Unauthorized);
            }
            UserType? userType = user?.NhanVien?.NhanVienRoles?.FirstOrDefault()?.Role?.UserType;
            if (userType != null)
            {
                long[] userRoles = await _userService.GetRoles(user.Id, RegionType.Internal, (UserType)userType);
                if (userRoles.Length == 0)
                {
                    throw new ApiException(string.Format(_localizationService.GetResource("DangNhap.NotAllow"), ((UserType)userType).GetDescription()));
                }
                var accessUser = new AccessUser()
                {
                    AccessToken = _iJwtFactory.GenerateInternalToken(user.Id, userRoles),
                    UserName = user.SoDienThoai,
                    FullName = user.HoTen,
                    Id = user.Id,
                    MenuInfo = _roleService.GetMenuInfo(userRoles),
                    Permissions = _roleService.GetPermissions(userRoles),
                    UserType = (UserType)userType,
                    Logo = _cauHinhService.GetSetting("CauHinhPhongKham.Logo")?.Value,
                    TenPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.Ten")?.Value,
                    DienThoaiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.SoDienThoai")?.Value,
                    DiaChiPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.DiaChi")?.Value,
                    GioKhamPhongKham = _cauHinhService.GetSetting("CauHinhPhongKham.GioKham")?.Value,
                    LinkDangKyKham = _cauHinhService.GetSetting("CauHinhPhongKham.LinkDangKyKham")?.Value
                };
                return Ok(accessUser);
            }
            throw new ApiException("Auto Login Error", (int)HttpStatusCode.Unauthorized);
        }
    }
}
