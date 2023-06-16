using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Helpers;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;
using static Camino.Core.Domain.TiepNhans.YeuCauTiepNhanEnum;

namespace Camino.Core.Domain.BaoCaos
{
    public class BaoCaoDoanhThuGridVo : GridItem
    {
        public DateTime? NgayPhatSinh { get; set; }
        public string? NgayPhatSinhHienThi => NgayPhatSinh?.ApplyFormat();
        public string HoTen { get; set; } = "";
        public TrangThaiThanhToanEnum? TrangThaiThanhToan { get; set; }
        public string? TrangThaiThanhToanHienThi => TrangThaiThanhToan?.GetDescription();
        public LoaiNhomDichVuEnum? LoaiDichVu { get; set; }
        public string? LoaiDichVuHienThi => LoaiDichVu?.GetDescription();
        public string? TenDichVu { get; set; }
        public string? DonViTinh { get; set; }
        public decimal? SoLuong { get; set; }
        public decimal? DonGia { get; set; }
        public decimal? ThanhTien => (SoLuong ?? 0) * (DonGia ?? 0);
        public decimal? DoanhThu { get; set; }
    }
    public class BaoCaoHenKhamGridVo : GridItem
    {
        public string? MaNguoiBenh { get; set; }
        public string? HoTen { get; set; }
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");
        public string? SoDienThoai { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public DateTime? NgayHenKham { get; set; }
        public string? NgayHenKhamHienThi => NgayHenKham?.ApplyFormatDate();
        public int? GioHenKham { get; set; }
        public string? GioHenKhamHienThi => DateTimeHelper.ConvertIntSecondsToTime(GioHenKham ?? 0);
        public HinhThucHenEnum? HinhThucHen { get; set; }
        public string? HinhThucHenHienThi => HinhThucHen != null ? HinhThucHen?.GetDescription() : "";
        public TrangThaiYeuCauTiepNhanEnum? TrangThai { get; set; }
        public string? TrangThaiHienThi => TrangThai != null ? TrangThai?.GetDescription() : "";
    }
    public class BaoCaoKhamBenhGridVo : GridItem
    {
        public string? MaNguoiBenh { get; set; }
        public string? HoTen { get; set; }
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");
        public string? SoDienThoai { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public DateTime? NgayKhamBenh { get; set; }
        public string? NgayKhamBenhHienThi => NgayKhamBenh?.ApplyFormatDate();
        public string? LyDoKhamBenh{ get; set; }
        public string? TongTrang { get; set; }
        public string? TenIcd { get; set; }
        public string? NoiDungChanDoan { get; set; }
        public CachGiaiQuyetEnum? CachGiaiQuyet { get; set; }
        public string? CachGiaiQuyetHienThi => CachGiaiQuyet != null ? CachGiaiQuyet?.GetDescription() : "";
        public string? LoiDan { get; set; }
        public DateTime? NgayTaiKham { get; set; }
        public string? NgayTaiKhamHienThi => NgayTaiKham?.ApplyFormatDate();
        public string? GhiChu { get; set; }

        public TrangThaiDichVuKhamEnum? TrangThai { get; set; }
        public string? TrangThaiHienThi => TrangThai != null ? TrangThai?.GetDescription() : "";
    }
    public class BaoCaoPhatThuocGridVo : GridItem
    {
        public string? MaNguoiBenh { get; set; }
        public string? HoTen { get; set; }
        public LoaiGioiTinh GioiTinh { get; set; }
        public string GioiTinhHienThi => GioiTinh.GetDescription();
        public int? NgaySinh { get; set; }
        public int? ThangSinh { get; set; }
        public int? NamSinh { get; set; }
        public string? NgayThangNamSinh => (NgaySinh != null ? NgaySinh + "/" : "") + (ThangSinh != null ? ThangSinh + "/" : "") + (NamSinh != null ? NamSinh : "");
        public string? SoDienThoai { get; set; }
        public string? TenTinhThanh { get; set; }
        public string? TenQuanHuyen { get; set; }
        public string? TenPhuongXa { get; set; }
        public string? TenKhomAp { get; set; }
        public string? SoNha { get; set; }
        public string? DiaChiDayDu => AddressHelper.ApplyFormatAddress(TenTinhThanh, TenQuanHuyen, TenPhuongXa, TenKhomAp, SoNha);
        public DateTime? NgayPhatThuoc { get; set; }
        public string? NgayPhatThuocHienThi => NgayPhatThuoc?.ApplyFormatDate();
        public string? TenThuoc { get; set; }
        public string? SoDangKy { get; set; }
        public string? DonViTinh { get; set; }
        public decimal? SoLuong { get; set; }
        public decimal? DonGia { get; set; }
        public decimal? ThanhTien => (SoLuong ?? 0) * (DonGia ?? 0);
        public bool? KhongMua { get; set; }
        public decimal? DoanhThu => KhongMua==true?0: ThanhTien;

        public TrangThaiDonThuocEnum? TrangThai { get; set; }
        public string? TrangThaiHienThi => TrangThai != null ? TrangThai?.GetDescription() : "";
    }
}
