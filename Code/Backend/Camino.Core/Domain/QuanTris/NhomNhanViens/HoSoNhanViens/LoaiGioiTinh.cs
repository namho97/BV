using System.ComponentModel;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public enum LoaiGioiTinh
    {
        [Description("Nam")]
        GioiTinhNam = 1,
        [Description("Nữ")]
        GioiTinhNu = 2,
        [Description("Chưa xác định")]
        ChuaXacDinh = 3
    }
}
