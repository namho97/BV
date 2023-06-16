using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;

namespace Camino.Api.Models.Auth
{
    public class LoginViewModel
    {
        public string UserName { get; set; } = "";
        public string UserNameRemoveFormat => !string.IsNullOrEmpty(UserName) ? UserName.RemoveFormatPhone() : "";
        public string Password { get; set; } = "";
        public string? PassCode { get; set; }
        public string? FcmToken { get; set; }
        public UserType UserType { get; set; }
    }
    public class LoginPassCodeViewModel
    {
        public string Phone { get; set; }
        public string PassCode { get; set; }
        public string FcmToken { get; set; }
        public UserType UserType { get; set; }
    }
}
