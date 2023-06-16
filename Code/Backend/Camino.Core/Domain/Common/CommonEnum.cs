using System.ComponentModel;

namespace Camino.Core.Domain.Common
{
    public partial class CommonEnum
    {
        public enum TrangThaiSuDungEnum
        {
            [Description("Đang sử dụng")]
            DangSuDung = 1,
            [Description("Ngưng sử dụng")]
            NgungSuDung = 2
        }
    }
}
