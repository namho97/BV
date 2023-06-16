using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Api.Models.QuanTri.NhomNhanVien.Users
{
    public class RoleViewModel : BaseViewModel
    {
        public RoleViewModel()
        {
            //RoleFunctions = new List<RoleFunctionViewModel>();
            //RoleFunctionGrids = new List<RoleFunctionGrid>();

            RoleFunctionGrids = new List<RoleFunctionDetailItemVo>();
        }
        public string Name { get; set; }
        public UserType UserType { get; set; }
        public bool IsDefault { get; set; }
        public bool? LaQuyenHeThong { get; set; }
        public bool IsCheckAll { get; set; }
        //public List<RoleFunctionViewModel> RoleFunctions { get; set; }
        //public List<RoleFunctionGrid> RoleFunctionGrids { get; set; }
        public List<RoleFunctionDetailItemVo> RoleFunctionGrids { get; set; }

        public bool IsCheckRoleDefaultOnCreate { get; set; }
    }
}