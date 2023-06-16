namespace Camino.Api.Models.HuongDanSuDung.BacSiGiaDinh
{
    public class HuongDanSuDungViewModel :BaseViewModel
    {
        public string Ten { get; set; } = "";
        public int? SoThuTu { get; set; }
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public long? HieuLucId { get; set; }
    }
}
