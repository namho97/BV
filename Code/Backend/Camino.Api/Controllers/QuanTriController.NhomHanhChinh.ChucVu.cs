using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.ChucVus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.ChucVus;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhChucVuController : CaminoBaseController
    {
        readonly IChucVuService _chucVuService;
        public QuanTriNhomHanhChinhChucVuController(IChucVuService chucVuService)
        {
            _chucVuService = chucVuService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _chucVuService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] ChucVuQueryInfo queryInfo)
        {
            var data = await _chucVuService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _chucVuService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _chucVuService.UpdateAsync(entity);
            return NoContent();
        } 
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucVuViewModel>> Get(long id)
        {
            var data = await _chucVuService.GetByIdAsync(id);
            var result = data.Map<ChucVuViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucVuViewModel>> Post([FromBody] ChucVuViewModel model)
        {
            var obj = model.ToEntity<ChucVu>();
            await _chucVuService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ChucVuViewModel>> Put([FromBody] ChucVuViewModel model)
        {
            var obj = await _chucVuService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _chucVuService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomHanhChinhChucVu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _chucVuService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _chucVuService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
