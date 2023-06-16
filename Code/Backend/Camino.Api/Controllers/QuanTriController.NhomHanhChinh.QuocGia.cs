using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.QuocGias;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.QuocGias;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhQuocGiaController : CaminoBaseController
    {

        readonly IQuocGiaService _quocGiaService;
        public QuanTriNhomHanhChinhQuocGiaController(IQuocGiaService quocGiaService)
        {
            _quocGiaService = quocGiaService;
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _quocGiaService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] QuocGiaQueryInfo queryInfo)
        {
            var data = await _quocGiaService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _quocGiaService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _quocGiaService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuocGiaViewModel>> Get(long id)
        {
            var data = await _quocGiaService.GetByIdAsync(id);
            var result = data.Map<QuocGiaViewModel>();
            result.HieuLuc = data.HieuLuc;
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuocGiaViewModel>> Post([FromBody] QuocGiaViewModel model)
        {
            var obj = model.ToEntity<QuocGia>();
            obj.HieuLuc = model.HieuLuc;
            await _quocGiaService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuocGiaViewModel>> Put([FromBody] QuocGiaViewModel model)
        {
            var obj = await _quocGiaService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            obj.HieuLuc = model.HieuLuc;
            await _quocGiaService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomHanhChinhQuocGia, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _quocGiaService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _quocGiaService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
