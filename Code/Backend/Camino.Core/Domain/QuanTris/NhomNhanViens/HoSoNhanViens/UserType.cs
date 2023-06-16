using System.ComponentModel;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public enum UserType
    {
        [Description("Tất cả")]
        TatCa = 0,
        [Description("Bác sĩ gia đình")]
        BacSiGiaDinh = 1,
        [Description("Phòng khám đa khoa")]
        PhongKhamDaKhoa = 2,
    }
}
