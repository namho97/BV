using static Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs.EnumKhoaPhong;

namespace Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongs
{
    public class KhoaPhongViewModel :BaseViewModel
    {
        public string? Ten { get; set; } 

        public string? Ma { get; set; } 

        public EnumLoaiKhoaPhong? LoaiKhoaPhong { get; set; }

        public bool? CoKhamNgoaiTru { get; set; }
        public bool? CoKhamNoiTru { get; set; }

        public bool? HieuLuc { get; set; }

        public bool IsDefault { get; set; }

        public string? MoTa { get; set; }
        public long? SoTienThuTamUng { get; set; }
        public int? SoGiuongKeHoach { get; set; }
    }
}
