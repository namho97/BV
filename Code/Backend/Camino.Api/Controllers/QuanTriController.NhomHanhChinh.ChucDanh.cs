using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.ChucDanhs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucDanhs;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhChucDanhController : CaminoBaseController
    {
        readonly IChucDanhService _chucDanhService;
        public QuanTriNhomHanhChinhChucDanhController(IChucDanhService chucDanhService)
        {
            _chucDanhService = chucDanhService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _chucDanhService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
       [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] ChucDanhQueryInfo queryInfo)
        {
            var data = await _chucDanhService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _chucDanhService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _chucDanhService.UpdateAsync(entity);
            return Ok(entity);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucDanhViewModel>> Get(long id)
        {
            var data = await _chucDanhService.GetByIdAsync(id);
            var result = data.Map<ChucDanhViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucDanhViewModel>> Post([FromBody] ChucDanhViewModel model)
        {
            var obj = model.ToEntity<ChucDanh>();
            obj.IsDefault = true;
            await _chucDanhService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucDanhViewModel>> Put([FromBody] ChucDanhViewModel model)
        {
            var obj = await _chucDanhService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _chucDanhService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _chucDanhService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _chucDanhService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
