using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.NhaSanXuats;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhaSanXuats;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamNhaSanXuatController : CaminoBaseController
    {
        readonly INhaSanXuatService _nhaSanXuatService;
        public QuanTriNhomDuocPhamNhaSanXuatController(INhaSanXuatService nhaSanXuatService)
        {
            _nhaSanXuatService = nhaSanXuatService;
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _nhaSanXuatService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NhaSanXuatQueryInfo queryInfo)
        {
            var data = await _nhaSanXuatService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _nhaSanXuatService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _nhaSanXuatService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaSanXuatViewModel>> Get(long id)
        {
            var data = await _nhaSanXuatService.GetByIdAsync(id);
            var result = data.Map<NhaSanXuatViewModel>();
            if (result.HieuLuc == true)
            {
                result.HieuLucId = 1;
            }
            else if (result.HieuLuc == false)
            {
                result.HieuLucId = 2;
            }
            else
            {
                result.HieuLucId = null;
            }
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaSanXuatViewModel>> Post([FromBody] NhaSanXuatViewModel model)
        {
            var obj = model.ToEntity<NhaSanXuat>();
            await _nhaSanXuatService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaSanXuatViewModel>> Put([FromBody] NhaSanXuatViewModel model)
        {
            var obj = await _nhaSanXuatService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _nhaSanXuatService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nhaSanXuatService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nhaSanXuatService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
