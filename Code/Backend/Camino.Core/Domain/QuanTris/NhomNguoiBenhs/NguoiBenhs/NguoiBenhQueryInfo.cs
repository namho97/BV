using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs
{
    public class NguoiBenhQueryInfo : QueryInfo
    {

        public string? Ma { get; set; }
        public string? HoTen { get; set; }
        public List<LoaiGioiTinh>? GioiTinhs { get; set; }
        public string? SoDienThoai { get; set; }
        public string? SoChungMinhThu { get; set; }
        public string? DiaChi { get; set; }
        public string? NgayThangNamSinh { get; set; }

        public int? NgaySinh => NgayThangNamSinh != null && NgayThangNamSinh.Split("/").Count() == 3 ? Convert.ToInt32(NgayThangNamSinh.Split("/")[0]) : null;
        public int? ThangSinh => NgayThangNamSinh != null && NgayThangNamSinh.Split("/").Count() == 3 ? Convert.ToInt32(NgayThangNamSinh.Split("/")[1]) : null;
        public int? NamSinh => NgayThangNamSinh != null && NgayThangNamSinh.Split("/").Count() == 3 ? Convert.ToInt32(NgayThangNamSinh.Split("/")[2]) :
                                                                                                         NgayThangNamSinh != null && NgayThangNamSinh.Split("/").Count() == 1 ? Convert.ToInt32(NgayThangNamSinh.Split("/")[0]) : null;


    }
}
