namespace Camino.Api.Models.QuanTri.NhomKho.ViTriDuocPhamVatTus
{
    public class ViTriDeDuocPhamVaTuViewModel :BaseViewModel
    {
        public long? KhoId { get; set; }
        public string? Ten { get; set; } 
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
