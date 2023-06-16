namespace Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    public class RoleFunctionGrid
    {
        public bool IsView { get; set; }
        public bool IsInsert { get; set; }
        public bool IsUpdate { get; set; }
        public bool IsDelete { get; set; }
        public long RoleId { get; set; }
        public DocumentType DocumentType { get; set; }
        public string DocumentName { get; set; }

    }
}
