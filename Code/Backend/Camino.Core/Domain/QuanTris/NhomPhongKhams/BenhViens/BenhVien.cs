using Camino.Core.Domain.KhamBenhs.YeuCauKhamBenhs;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.LoaiBenhViens;

namespace Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens
{
    public class BenhVien : BaseEntity
    {
        public string? Ma { get; set; }
        public string Ten { get; set; } = "";
        public string? TenVietTat { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DiaChi { get; set; }
        public long? LoaiBenhVienId { get; set; }
        public int? HangBenhVien { get; set; }
        public int? TuyenChuyenMonKyThuat { get; set; }
        public bool? HieuLuc { get; set; }
        public virtual LoaiBenhVien? LoaiBenhVien { get; set; }

        private ICollection<YeuCauKhamBenh>? _yeuCauKhamBenhs;
        public virtual ICollection<YeuCauKhamBenh> YeuCauKhamBenhs
        {
            get => _yeuCauKhamBenhs ??= new List<YeuCauKhamBenh>();
            protected set => _yeuCauKhamBenhs = value;
        }
    }
}
