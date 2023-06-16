using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.NgheNghieps;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.NgheNghieps;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhNgheNghiepController : CaminoBaseController
    {
        readonly INgheNghiepService _ngheNghiepService;
        public QuanTriNhomHanhChinhNgheNghiepController(INgheNghiepService ngheNghiepService)
        {
            _ngheNghiepService = ngheNghiepService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NgheNghiepQueryInfo queryInfo)
        {
            var data = await _ngheNghiepService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _ngheNghiepService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _ngheNghiepService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _ngheNghiepService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NgheNghiepViewModel>> Get(long id)
        {
            var data = await _ngheNghiepService.GetByIdAsync(id);
            var result = data.Map<NgheNghiepViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NgheNghiepViewModel>> Post([FromBody] NgheNghiepViewModel model)
        {
            var obj = model.ToEntity<NgheNghiep>();
            await _ngheNghiepService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NgheNghiepViewModel>> Put([FromBody] NgheNghiepViewModel model)
        {
            var obj = await _ngheNghiepService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _ngheNghiepService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomHanhChinhNgheNghiep, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _ngheNghiepService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _ngheNghiepService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
