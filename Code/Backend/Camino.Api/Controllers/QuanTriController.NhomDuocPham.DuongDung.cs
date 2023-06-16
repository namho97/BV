using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DuongDungs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuongDungs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamDuongDungController : CaminoBaseController
    {
        readonly IDuongDungService _duongDungService;
        public QuanTriNhomDuocPhamDuongDungController(IDuongDungService duongDungService)
        {
            _duongDungService = duongDungService;
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _duongDungService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DuongDungQueryInfo queryInfo)
        {
            var data = await _duongDungService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _duongDungService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _duongDungService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuongDungViewModel>> Get(long id)
        {
            var data = await _duongDungService.GetByIdAsync(id);
            var result = data.Map<DuongDungViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuongDungViewModel>> Post([FromBody] DuongDungViewModel model)
        {
            var obj = model.ToEntity<DuongDung>();
            await _duongDungService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuongDungViewModel>> Put([FromBody] DuongDungViewModel model)
        {
            var obj = await _duongDungService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _duongDungService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomDuocPhamDuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _duongDungService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _duongDungService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
