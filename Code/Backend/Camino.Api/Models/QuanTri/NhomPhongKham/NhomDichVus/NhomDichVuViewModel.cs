namespace Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVus
{
    public class NhomDichVuViewModel :BaseViewModel
    {
        public string? Ma { get; set; } 

        public string? Ten { get; set; }

        public string? MoTa { get; set; }

        public long? NhomDichVuBenhVienChaId { get; set; }
        public bool IsDefault { get; set; } = false;
    }
}
