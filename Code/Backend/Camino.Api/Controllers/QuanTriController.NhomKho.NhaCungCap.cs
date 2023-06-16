using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKho.NhaCungCaps;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.NhaCungCaps;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomKhos.NhaCungCaps;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoNhaCungCapController : CaminoBaseController
    {
        readonly INhaCungCapService _nhaCungCapService;
        public QuanTriNhomKhoNhaCungCapController(INhaCungCapService nhaCungCapService)
        {
            _nhaCungCapService = nhaCungCapService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _nhaCungCapService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoNhaCungCap, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NhaCungCapQueryInfo queryInfo)
        {
            var data = await _nhaCungCapService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoNhaCungCap, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaCungCapViewModel>> Get(long id)
        {
            var data = await _nhaCungCapService.GetByIdAsync(id);
            var result = data.Map<NhaCungCapViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoNhaCungCap, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaCungCapViewModel>> Post([FromBody] NhaCungCapViewModel model)
        {
            var obj = model.ToEntity<NhaCungCap>();
            await _nhaCungCapService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoNhaCungCap, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhaCungCapViewModel>> Put([FromBody] NhaCungCapViewModel model)
        {
            var obj = await _nhaCungCapService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _nhaCungCapService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoNhaCungCap, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nhaCungCapService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nhaCungCapService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
