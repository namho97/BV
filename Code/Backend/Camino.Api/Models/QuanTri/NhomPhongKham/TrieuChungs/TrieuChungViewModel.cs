namespace Camino.Api.Models.QuanTri.NhomPhongKham.TrieuChungs
{
    public class TrieuChungViewModel:BaseViewModel
    {
        public string Ten { get; set; } = "";
        public long? TrieuChungChaId { get; set; }
        public int CapNhom { get; set; }
    }
}
