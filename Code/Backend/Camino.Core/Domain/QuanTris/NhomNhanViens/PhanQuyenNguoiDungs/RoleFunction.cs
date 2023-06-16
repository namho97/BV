namespace Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    public class RoleFunction : BaseEntity
    {
        public long RoleId { get; set; }
        public SecurityOperation SecurityOperation { get; set; }
        public DocumentType DocumentType { get; set; }
        public virtual Role? Role { get; set; }
    }
}
