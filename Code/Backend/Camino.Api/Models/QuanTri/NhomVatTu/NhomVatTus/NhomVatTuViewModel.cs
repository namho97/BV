namespace Camino.Api.Models.QuanTri.NhomVatTu.NhomVatTus
{
    public class NhomVatTuViewModel:BaseViewModel
    {
        public string? Ma { get; set; } 
        public string? Ten { get; set; } 
        public long? NhomVatTuChaId { get; set; }
        public int CapNhom { get; set; }
    }
}
