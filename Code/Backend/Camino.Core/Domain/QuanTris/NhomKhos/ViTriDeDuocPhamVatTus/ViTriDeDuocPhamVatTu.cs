using Camino.Core.Domain.QuanTris.NhomKhos.Khos;


namespace Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus
{
    public class ViTriDeDuocPhamVatTu : BaseEntity
    {
        public long KhoId { get; set; }
        public string Ten { get; set; } = "";
        public string? MoTa { get; set; }
        public bool? HieuLuc { get; set; }
        public virtual Kho? Kho { get; set; }
    }
}
