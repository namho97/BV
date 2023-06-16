using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.DanTocs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DanTocs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhDanTocController : CaminoBaseController
    {
        readonly IDanTocService _danTocService;
        public QuanTriNhomHanhChinhDanTocController(IDanTocService danTocService)
        {
            _danTocService = danTocService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _danTocService.GetLookup(queryInfo);
            return Ok(lookup);
        }
  
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DanTocQueryInfo queryInfo)
        {
            var data = await _danTocService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _danTocService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _danTocService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DanTocViewModel>> Get(long id)
        {
            var data = await _danTocService.GetByIdAsync(id);
            var result = data.Map<DanTocViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DanTocViewModel>> Post([FromBody] DanTocViewModel model)
        {
            var obj = model.ToEntity<DanToc>();
            await _danTocService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DanTocViewModel>> Put([FromBody] DanTocViewModel model)
        {
            var obj = await _danTocService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _danTocService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomHanhChinhDanToc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _danTocService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _danTocService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
