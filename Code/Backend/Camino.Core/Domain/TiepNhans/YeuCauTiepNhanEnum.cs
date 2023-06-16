using System.ComponentModel;

namespace Camino.Core.Domain.TiepNhans
{
    public partial class YeuCauTiepNhanEnum
    {
        public enum HinhThucHenEnum
        {
            [Description("Điện thoại")]
            DienThoai = 1,
            [Description("Zalo")]
            Zalo = 2,
            [Description("Facebook")]
            Facebook = 3,
            [Description("Web")]
            Web = 4,
            [Description("Khác")]
            Khac = 5
        }

        public enum TrangThaiYeuCauTiepNhanEnum
        {
            [Description("Đợi khám")]
            ChuaThucHien = 1,
            [Description("Đang khám")]
            DangThucHien = 2,
            [Description("Đã khám")]
            DaThucHien = 3,
            [Description("Hủy khám")]
            HuyThucHien = 4,
            [Description("Hẹn khám")]
            ChuaDen = 5
        }
    }
}
