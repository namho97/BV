using System.ComponentModel;

namespace Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus
{
    public partial class NoiDungMauEnum
    {
        public enum LoaiNoiDungMauEnum
        {
            [Description("Tổng trạng")]
            TongTrang = 1,
            [Description("Kết quả Xét Nghiệm")]
            KetQuaXetNghiem = 2,
            [Description("Kết quả X-Quang")]
            KetQuaXQuang = 3,
            [Description("Kết quả Siêu Âm")]
            KetQuaSieuAm = 4,
            [Description("Kết quả Điện Tim")]
            KetQuaDienTim = 5,
            [Description("Kết quả Thủ Thuật Khác")]
            KetQuaThuThuatKhac = 6,
            [Description("Ghi chú hẹn tái khám")]
            GhiChuHenTaiKham = 7,
            [Description("Cách dùng thuốc")]
            CachDungThuoc = 8,
            [Description("Lý do khám bệnh")]
            LyDoKhamBenh = 9,
            [Description("Lời dặn điều trị")]
            LoiDanDieuTri = 10,
            [Description("Lý do nhập viện")]
            LyDoNhapVien = 11,
            [Description("Học vị học hàm")]
            HocViHocHam = 12,
            [Description("Quy cách đóng gói")]
            QuyCachDongGoi = 13
        }
    }
}
