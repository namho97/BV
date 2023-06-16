namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds
{
    public class IcdQueryInfo : QueryInfo
    {

        public string Ma { get; set; } = "";
        public string TenTiengViet { get; set; } = "";
        public string TenTiengAnh { get; set; } = "";


        public int? GioiTinh { get; set; }



        public int? ManTinh { get; set; }


        public int? BenhThuongGap { get; set; }


        public int? BenhNam { get; set; }


        public int? KhongBaoHiem { get; set; }

        public int? NgoaiDinhSuat { get; set; }

        public int? HieuLuc { get; set; }
    }
}
