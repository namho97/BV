using Camino.Core.Domain;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Models.BaoCao
{
    public class KhamBenhExportExcel
    {
        [Width(15)]
        public string? MaNguoiBenh { get; set; }
        [Width(40)]
        public string HoTen { get; set; } = "";
        [Width(20)]
        public string? GioiTinhHienThi { get; set; }
        [Width(20)]
        public string? NgayThangNamSinh { get; set; }
        [Width(20)]
        public string? SoDienThoai { get; set; }
        [Width(20)]
        public string? DiaChiDayDu { get; set; }
        [Width(20)]
        public string? NgayKhamBenhHienThi { get; set; }
        [Width(20)]

        public string? LyDoKhamBenh { get; set; }
        [Width(20)]
        public string? TongTrang { get; set; }
        [Width(20)]
        public string? TenIcd { get; set; }
        [Width(20)]
        public string? NoiDungChanDoan { get; set; }
        [Width(20)]
        public string? CachGiaiQuyetHienThi { get; set; }
        [Width(20)]
        public string? LoiDan { get; set; }
        [Width(20)]
        public string? NgayTaiKhamHienThi { get; set; }
        [Width(20)]
        public string? GhiChu { get; set; }

        [Width(20)]
        public string? TrangThaiHienThi { get; set; }
    }
}
