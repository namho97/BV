namespace Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams
{
    public class DuocPhamGia : BaseEntity
    {
        public long DuocPhamId { get; set; }
        public decimal Gia { get; set; }
        public DateTime? TuNgay { get; set; }
        public DateTime? DenNgay { get; set; }

        public virtual DuocPham DuocPham { get; set; }

    }
}
