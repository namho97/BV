using Camino.Api.Auth;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;

namespace Camino.Api.Models.Auth
{
    public class AccessUser
    {
        public AccessToken AccessToken { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Logo { get; set; }
        public string TenPhongKham { get; set; }
        public string DienThoaiPhongKham { get; set; }
        public string DiaChiPhongKham { get; set; }
        public string GioKhamPhongKham { get; set; }
        public string LinkDangKyKham { get; set; }
        public string BarCodeLinkDangKyKham => BarcodeHelper.GenerateQrCode(LinkDangKyKham, System.Drawing.ColorTranslator.FromHtml("#ffffff"), System.Drawing.ColorTranslator.FromHtml("#000000"));
        public long Id { get; set; }
        public MenuInfo MenuInfo { get; set; }
        public ICollection<CaminoPermission> Permissions { get; set; }
        public UserType UserType { get; set; }
    }
}
