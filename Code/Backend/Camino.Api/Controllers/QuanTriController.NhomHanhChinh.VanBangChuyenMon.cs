using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.VanBangChuyenMons;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.VanBangChuyenMons;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhVanBangChuyenMonController : CaminoBaseController
    {
        readonly IVanBangChuyenMonService _vanBangChuyenMonService;
        public QuanTriNhomHanhChinhVanBangChuyenMonController(IVanBangChuyenMonService vanBangChuyenMonService)
        {
            _vanBangChuyenMonService = vanBangChuyenMonService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _vanBangChuyenMonService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon,DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] VanBangChuyenMonQueryInfo queryInfo)
        {
            var data = await _vanBangChuyenMonService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View,  DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _vanBangChuyenMonService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _vanBangChuyenMonService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View,  DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<VanBangChuyenMonViewModel>> Get(long id)
        {
            var data = await _vanBangChuyenMonService.GetByIdAsync(id);
            var result = data.Map<VanBangChuyenMonViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add,  DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<VanBangChuyenMonViewModel>> Post([FromBody] VanBangChuyenMonViewModel model)
        {
            var obj = model.ToEntity<VanBangChuyenMon>();
            await _vanBangChuyenMonService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update,  DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<VanBangChuyenMonViewModel>> Put([FromBody] VanBangChuyenMonViewModel model)
        {
            var obj = await _vanBangChuyenMonService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _vanBangChuyenMonService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete,  DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _vanBangChuyenMonService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _vanBangChuyenMonService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
