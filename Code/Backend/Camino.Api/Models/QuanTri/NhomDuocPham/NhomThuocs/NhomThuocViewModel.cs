namespace Camino.Api.Models.QuanTri.NhomDuocPham.NhomThuocs
{
    public class NhomThuocViewModel:BaseViewModel
    {
        public string? Ten { get; set; } 
        public long? NhomChaId { get; set; }
        public int CapNhom { get; set; }
    }
}
