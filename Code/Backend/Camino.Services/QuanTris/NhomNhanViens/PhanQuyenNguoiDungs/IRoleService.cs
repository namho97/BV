using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;

namespace Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    public interface IRoleService : IMasterFileService<Role>
    {
        bool VerifyAccess(long[] roleIds, DocumentType[] documentTypes, SecurityOperation securityOperation);
        MenuInfo GetMenuInfo(long[] roleIds);
        ICollection<CaminoPermission> GetPermissions(long[] roleIds);
        Task<ICollection<LookupItemVo>> GetLookupAsync();

        #region CRUD

        Task<GridDataSource> GetDataForGridAsync(RoleQueryInfo queryInfo);
        Task<GridDataSource> GetTotalPageForGridAsync(RoleQueryInfo queryInfo);

        Task UpdateRoleFunctionForRole(List<RoleFunction> roleFunctions, long roleId);

        Task AddPermissionForRole(List<RoleFunction> roleFunctions, long roleId);

        bool KiemTraTrungTen(long roleId, string? ten);
        #endregion CRUD
        Task<Role> GetRoleWithUserType(UserType userType);


        #region Xử lý thông tin chi tiết role function theo user
        List<RoleFunctionDetailItemVo> GetAllAvailableRoleFunctions(UserType userType, long? roleId = null, List<RoleFunction>? lstRoleFunctionByRoleId = null);


        #endregion
    }
}
