using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.Error;
using Camino.Api.Models.QuanTri.NhomNhanVien.Users;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Services.Helpers;
using Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomNhanVienPhanQuyenNguoiDungController : CaminoBaseController
    {
        private readonly IRoleService _roleService;
        private readonly IUserAgentHelper _userAgentHelper;

        public QuanTriNhomNhanVienPhanQuyenNguoiDungController(IRoleService roleService, IUserAgentHelper userAgentHelper)
        {
            _roleService = roleService;
            _userAgentHelper = userAgentHelper;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] DropDownListRequestModel model)
        {
            var lookup = await _roleService.GetLookupAsync();
            return Ok(lookup);
        }



        #region CRUD

        //[HttpPost("GetDataForGridDanhSachChucNang")]
        //[ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        //public async Task<ActionResult<GridDataSource>> GetDataForGridDanhSachChucNang([FromBody] QueryInfo queryInfo)
        //{
        //    var gridData = await _documentTypeService.GetDataForGridAsync(queryInfo);
        //    return Ok(gridData);
        //}

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] RoleQueryInfo queryInfo)
        {
            var gridData = await _roleService.GetDataForGridAsync(queryInfo);
            return Ok(gridData);
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost("GetTotalPageForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        public async Task<ActionResult<GridDataSource>> GetTotalPageForGridAsync([FromBody] RoleQueryInfo queryInfo)
        {
            var gridData = await _roleService.GetTotalPageForGridAsync(queryInfo);
            return Ok(gridData);
        }


        /// <summary>
        ///     Get role
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleViewModel>> Get(long id)
        {
            var viewModel = new RoleViewModel();
            List<RoleFunction>? lstRoleFunctions = null;
            if (id != 0)
            {
                var result = await _roleService.GetByIdAsync(id, s => s.Include(u => u.RoleFunctions));
                if (result == null)
                {
                    return NotFound();
                }
                viewModel = result.ToModel<RoleViewModel>();
                lstRoleFunctions = result.RoleFunctions.ToList();
            }

            viewModel.RoleFunctionGrids = _roleService.GetAllAvailableRoleFunctions(_userAgentHelper.GetCurrentUserType(), id, lstRoleFunctions);


            ////Chỉ hiển thị document type trong nội bộ
            //AddDefaultPermission(r);
            //foreach (var roleFunction in r.RoleFunctions.Where(o => (int)o.DocumentType <= 1000))
            //{
            //    if (r.RoleFunctionGrids.Any(p => p.DocumentType == roleFunction.DocumentType))
            //    {
            //        var roleFunctionGrid = r.RoleFunctionGrids.Find(p => p.DocumentType == roleFunction.DocumentType);
            //        roleFunctionGrid.DocumentType = roleFunctionGrid.DocumentType;
            //        roleFunctionGrid.DocumentName = roleFunctionGrid.DocumentType.GetDescription();
            //        AddPermissionForRoleFunctionGirds(roleFunctionGrid, roleFunction.SecurityOperation);
            //    }
            //    else
            //    {
            //        var roleFunctionToAdd = new RoleFunctionGrids
            //        {
            //            RoleId = roleFunction.RoleId,
            //            DocumentType = roleFunction.DocumentType,
            //            DocumentName = roleFunction.DocumentType.GetDescription(),
            //        };
            //        AddPermissionForRoleFunctionGirds(roleFunctionToAdd, roleFunction.SecurityOperation);
            //        r.RoleFunctionGrids.Add(roleFunctionToAdd);
            //    }
            //}
            ////check all ?
            //r.IsCheckAll = (r.RoleFunctions.Any() && r.RoleFunctions.Count(p => p.SecurityOperation == SecurityOperation.Add ||
            //                                p.SecurityOperation == SecurityOperation.Delete
            //                                || p.SecurityOperation == SecurityOperation.Update ||
            //                                p.SecurityOperation == SecurityOperation.View) >=
            //                (r.RoleFunctionGrids.Count * 4));

            if (viewModel.IsDefault == true)
            {
                viewModel.IsCheckRoleDefaultOnCreate = true;
            }



            return Ok(viewModel);
        }

        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        public async Task<ActionResult<RoleViewModel>> Post([FromBody] RoleViewModel roleViewModel)
        {
            var lstRoleFunction = GetListRoleFuntion(roleViewModel);
            if (lstRoleFunction.All(p => p.SecurityOperation != SecurityOperation.View))
            {
                throw new ApiException("Phải chọn ít nhất một quyền xem", (int)HttpStatusCode.BadRequest);
            }
            var role = roleViewModel.ToEntity<Role>();
            _roleService.Add(role);
            //add permission for role
            await _roleService.AddPermissionForRole(lstRoleFunction, role.Id);
            var actionName = nameof(Get);
            return CreatedAtAction(actionName, new { id = role.Id }, role.ToModel<RoleViewModel>());
        }

        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        public async Task<ActionResult> Put([FromBody] RoleViewModel roleViewModel)
        {
            var result = await _roleService.GetByIdAsync(roleViewModel.Id);
            if (result == null || result.IsDefault || result.LaQuyenHeThong.GetValueOrDefault())
            {
                return NotFound();
            }


            var lstRoleFunction = GetListRoleFuntion(roleViewModel);
            if (lstRoleFunction.All(p => p.SecurityOperation != SecurityOperation.View))
            {
                throw new ApiException("Phải chọn ít nhất một quyền xem", (int)HttpStatusCode.BadRequest);
            }
            roleViewModel.ToEntity(result);

            await _roleService.UpdateRoleFunctionForRole(lstRoleFunction, result.Id).ConfigureAwait(false);

            await _roleService.UpdateAsync(result);
            return NoContent();
        }

        //[HttpGet("GetRoleFunctionForAdd")]
        //public ActionResult<RoleViewModel> GetRoleFunctionForAdd()
        //{
        //    var roleViewModel = new RoleViewModel();
        //    AddDefaultPermission(roleViewModel);
        //    return Ok(roleViewModel.RoleFunctionGrids);
        //}


        /// <summary>
        ///     Xoa role
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung)]
        public async Task<ActionResult> Delete(long id)
        {
            var role = await _roleService.GetByIdAsync(id, x => x.Include(a => a.RoleFunctions));
            if (role == null || role.IsDefault || role.LaQuyenHeThong.GetValueOrDefault())
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(role);
            return NoContent();
        }
        #endregion CRUD

        #region Private Class


        private List<RoleFunction> GetListRoleFuntion(RoleViewModel roleViewModel)
        {
            var listRoleFunction = new List<RoleFunction>();
            foreach (var roleFunction in roleViewModel.RoleFunctionGrids.Where(x => x.IsDocumentType))
            {
                foreach (var quyen in roleFunction.Quyens)
                {
                    if (quyen.Disabled != true && quyen.Value)
                    {
                        listRoleFunction.Add(new RoleFunction
                        {
                            DocumentType = (DocumentType)roleFunction.Id,
                            SecurityOperation = quyen.SecurityOperation,
                            RoleId = roleViewModel.Id
                        });
                    }
                }
            }

            listRoleFunction = listRoleFunction.OrderBy(x => x.DocumentType).ThenBy(x => x.SecurityOperation).ToList();

            return listRoleFunction;
        }
        #endregion Private Class

        [HttpPost("GetRoleTypeAsync")]
        public ActionResult<ICollection<LookupItemVo>> GetRoleTypeAsync()
        {
            var values = ((UserType[])Enum.GetValues(typeof(UserType))).ToList();

            var data = values.Select(s => new LookupItemVo()
            {
                KeyId = (values.IndexOf(s) + 1),
                DisplayName = s.GetDescription()
            }).ToList();
            data.Insert(0, new LookupItemVo
            {
                KeyId = 0,
                DisplayName = "Tất cả"
            });
            return Ok(data);
        }

        [HttpDelete("DeleteRoleNhanVien/{id}")]
        public async Task<ActionResult> DeleteRoleNhanVien(long id)
        {
            var model = await _roleService.GetByIdAsync(id, a => a.Include(b => b.RoleFunctions).Include(s => s.NhanVienRoles));
            if (model == null)
                throw new ApiException("Quyền này không tồn tại. Vui lòng thử lại.", (int)HttpStatusCode.BadRequest);
            if (model.NhanVienRoles.Any(a => a.RoleId == id))
                throw new ApiException("Không được xóa quyền này. Vì quyền này đã gán cho người dùng.");

            await _roleService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
