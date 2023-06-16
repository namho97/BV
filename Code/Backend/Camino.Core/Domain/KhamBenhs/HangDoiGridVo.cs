using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.KhamBenhs
{
    public class HangDoiGridVo : GridItem
    {
        public long YeuCauTiepNhanId { get; set; }
        public int? SoThuTu { get; set; }
        public string HoTen { get; set; } = "";
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");

        public TrangThaiDichVuKhamEnum TrangThai { get; set; }
        public TrangThaiYeuCauTiepNhanEnum? TrangThaiYeuCauTiepNhan { get; set; }
        public string TrangThaiHienThi => TrangThaiYeuCauTiepNhan == TrangThaiYeuCauTiepNhanEnum.ChuaDen ? "HẸN KHÁM" : TrangThai.GetDescription().ToUpper();

    }
}
