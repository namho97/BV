namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus
{
    public class ToaThuocMauQueryInfo : QueryInfo
    {
        public string Ten { get; set; }
        public long? IcdId { get; set; }
        public long? BacSiId { get; set; }
        public bool? HieuLuc { get; set; }
    }
}
