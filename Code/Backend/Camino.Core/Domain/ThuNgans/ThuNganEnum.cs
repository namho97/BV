using System.ComponentModel;

namespace Camino.Core.Domain.ThuNgans
{
    public partial class ThuNganEnum
    {
        public enum HinhThucThanhToanEnum
        {
            [Description("Tiền mặt")]
            TienMat = 1,
            [Description("Chuyển khoản")]
            ChuyenKhoan = 2,
            [Description("POS")]
            POS = 3
        }
        public enum TrangThaiThanhToanEnum
        {
            [Description("Chưa thanh toán")]
            ChuaThanhToan = 1,
            [Description("Đã thanh toán")]
            DaThanhToan = 2
        }
        public enum LoaiNhomDichVuEnum
        {
            [Description("Khám bệnh")]
            YeuCauKhamBenh = 1,
            [Description("Dịch vụ kỹ thuật")]
            YeuCauDichVuKyThuat = 2,
            [Description("Thuốc")]
            YeuCauDonThuocChiTiet = 3
        }
    }
}
