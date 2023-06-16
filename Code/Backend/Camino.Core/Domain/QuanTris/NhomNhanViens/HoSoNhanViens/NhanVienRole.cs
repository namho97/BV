using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens
{
    public class NhanVienRole : BaseEntity
    {
        public long NhanVienId { get; set; }
        public long RoleId { get; set; }
        public virtual NhanVien? NhanVien { get; set; }
        public virtual Role? Role { get; set; }
    }
}
