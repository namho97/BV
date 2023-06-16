using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomNhanVien.NhanViens;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Services.QuanTris.NhomNhanViens.HoSoNhanViens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomNhanVienHoSoNhanVienController : CaminoBaseController
    {
        readonly INhanVienService _nhanVienService;
        readonly IUserService _userService;
        private readonly IEncryptionService _encryptionService;
        public QuanTriNhomNhanVienHoSoNhanVienController(INhanVienService nhanVienService, IUserService userService, IEncryptionService encryptionService)
        {
            _nhanVienService = nhanVienService;
            _userService = userService;
            _encryptionService = encryptionService;
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NhanVienQueryInfo queryInfo)
        {
            var data = await _nhanVienService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }


        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult<NhanVienViewModel>> Get(long id)
        {
            var data = await _nhanVienService.GetByIdAsync(id, s => s.Include(a => a.User).Include(a => a.NhanVienRoles));
            if (data == null)
            {
                return NotFound();
            }
            var model = data.ToModel<NhanVienViewModel>();
            if (data.User != null && data.User.NgaySinh != null)
            {
                model.NgaySinh = data.User.NgaySinh;
                model.ThangSinh = data.User.ThangSinh;
                model.NamSinh = data.User.NamSinh;
                model.NgayThangNamSinh = data.User.NgayThangNamSinh;
            }
            model.RoleId = data.NhanVienRoles.Select(x => x.RoleId).FirstOrDefault();

            return Ok(model);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult<long>> Post([FromBody] NhanVienViewModel model)
        {
            var nhanVien = model.ToEntity<NhanVien>();
            nhanVien.User.SoDienThoai = model.SoDienThoai.RemoveFormatPhone();
            nhanVien.User.Region = RegionType.Internal;
            nhanVien.User.IsActive = true;
            nhanVien.User.Password = _encryptionService.HashPassword(model.MatKhau);
            nhanVien.User.NamSinh = model.NamSinh;
            nhanVien.User.ThangSinh = model.NgayThangNamSinh?.Month;
            nhanVien.User.NgaySinh = model.NgayThangNamSinh?.Day;
            nhanVien.User.IsDefault = false;
            nhanVien.NhanVienRoles.Add(new NhanVienRole
            {
                RoleId = (long)model.RoleId
            });
            await _nhanVienService.AddAsync(nhanVien);
            return Ok(nhanVien.Id);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult> Put([FromBody] NhanVienViewModel model)
        {
            var nhanVien = await _nhanVienService.GetByIdAsync(model.Id, s => s.Include(a => a.User).Include(a => a.NhanVienRoles));
            model.ToEntity(nhanVien);
            nhanVien.User.NamSinh = model.NamSinh;
            nhanVien.User.ThangSinh = model.NgayThangNamSinh?.Month;
            nhanVien.User.NgaySinh = model.NgayThangNamSinh?.Day;

            if (!nhanVien.NhanVienRoles.Any(o => o.RoleId == model.RoleId))
            {
                foreach (var role in nhanVien.NhanVienRoles)
                {
                    role.WillDelete = true;
                }
                nhanVien.NhanVienRoles.Add(new NhanVienRole
                {
                    RoleId = (long)model.RoleId
                });
            }
            await _nhanVienService.UpdateAsync(nhanVien);
            return Ok(nhanVien);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult> Delete(int id)
        {
            var data = await _userService.GetByIdAsync(id, s => s.Include(a => a.NhanVien)
                .ThenInclude(a => a.NhanVienRoles)
                .Include(a => a.NhanVien));
            await _userService.DeleteAsync(data);
            return NoContent();
        }
        [HttpPost("DoiMatKhau")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNhanVienHoSoNhanVien)]
        public async Task<ActionResult<long>> DoiMatKhau([FromBody] NhanVienDoiMatKhauViewModel model)
        {
            var nhanVien = await _nhanVienService.GetByIdAsync(model.Id, s => s.Include(a => a.User));
            if (nhanVien == null)
            {
                return NotFound();
            }
            nhanVien.User.Password = _encryptionService.HashPassword(model.MatKhau);
            await _nhanVienService.UpdateAsync(nhanVien);
            return Ok(nhanVien);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo lookupQueryInfo)
        {
            var lookup = await _nhanVienService.GetLookup(lookupQueryInfo);
            return Ok(lookup);
        }
    }
}
