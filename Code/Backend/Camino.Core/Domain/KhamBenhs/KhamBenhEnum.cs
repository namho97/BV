using System.ComponentModel;

namespace Camino.Core.Domain.KhamBenhs
{
    public partial class KhamBenhEnum
    {
        public enum CachGiaiQuyetEnum
        {
            [Description("KÊ TOA THUỐC")]
            KeToaThuoc = 1,
            [Description("KHÔNG TOA")]
            KhongToa = 2,
            [Description("NHẬP VIỆN")]
            NhapVien = 3
        }
        public enum TrangThaiDichVuKhamEnum
        {
            [Description("Đợi khám")]
            DoiKham = 1,
            [Description("Đang khám")]
            DangKham = 2,
            [Description("Đã khám")]
            DaKham = 3,
            [Description("Hủy khám")]
            HuyKham = 4
        }
        public enum TrangThaiDichVuKyThuatEnum
        {
            [Description("Chưa thực hiện")]
            ChuaThucHien = 1,
            [Description("Đang thực hiện")]
            DangThucHien = 2,
            [Description("Đã thực hiện")]
            DaThucHien = 3,
            [Description("Hủy thực hiện")]
            HuyThucHien = 4
        }
        public enum LoaiDonThuocEnum
        {
            [Description("BHYT")]
            Bhyt = 1,
            [Description("Không BHYT")]
            KhongBhyt = 2
        }
        public enum TrangThaiDonThuocEnum
        {
            [Description("Chưa xuất thuốc")]
            ChuaXuatThuoc = 1,
            [Description("Đã xuất thuốc")]
            DaXuatThuoc = 2,
            [Description("Hủy xuất thuốc")]
            HuyXuatThuoc = 3
        }
        public enum LoaiKetQuaEnum
        {
            [Description("Xét nghiệm")]
            XetNghiem = 1,
            [Description("X-Quang")]
            XQuang = 2,
            [Description("Siêu âm")]
            SieuAm = 3,
            [Description("Điện tim")]
            DienTim = 4,
            [Description("Thủ thuật khác")]
            ThuThuatKhac = 5
        }
    }
}
