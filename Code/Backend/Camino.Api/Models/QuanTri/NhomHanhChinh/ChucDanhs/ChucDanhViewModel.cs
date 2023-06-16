namespace Camino.Api.Models.QuanTri.NhomHanhChinh.ChucDanhs
{
    public class ChucDanhViewModel:BaseViewModel
    {
        public string? Ten { get; set; }
        public string? Ma { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
        //public long? NhomChucDanhId { get; set; }
        public string? MoTa { get; set; }
        public bool? IsDefault { get; set; }

        //public string? TenNhomChucDanh { get; set; }

    }
}
