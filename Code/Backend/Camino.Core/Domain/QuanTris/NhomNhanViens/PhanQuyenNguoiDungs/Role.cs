using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;

namespace Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    public class Role : BaseEntity
    {
        public string Name { get; set; } = null!;
        public UserType UserType { get; set; }
        public bool IsDefault { get; set; }
        public bool? LaQuyenHeThong { get; set; }

        private ICollection<RoleFunction>? _roleFunctions;
        public virtual ICollection<RoleFunction> RoleFunctions
        {
            get => _roleFunctions ??= new List<RoleFunction>();
            protected set => _roleFunctions = value;
        }

        private ICollection<NhanVienRole>? _nhanVienRoles;
        public virtual ICollection<NhanVienRole> NhanVienRoles
        {
            get => _nhanVienRoles ??= new List<NhanVienRole>();
            protected set => _nhanVienRoles = value;
        }
    }
}
