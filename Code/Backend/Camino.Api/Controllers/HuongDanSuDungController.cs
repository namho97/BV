using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.HuongDanSuDung.BacSiGiaDinh;
using Camino.Core.Domain;
using Camino.Core.Domain.HuongDanSuDungs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.HuongDanSuDungs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class HuongDanSuDungController : CaminoBaseController
    {
        readonly IHuongDanSuDungService _huongDanSuDungService;
        public HuongDanSuDungController(IHuongDanSuDungService huongDanSuDungService)
        {
            _huongDanSuDungService = huongDanSuDungService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] HuongDanSuDungQueryInfo queryInfo)
        {
            var data = await _huongDanSuDungService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<HuongDanSuDungViewModel>> Get(long id)
        {
            var data = await _huongDanSuDungService.GetByIdAsync(id);
            var result = data.Map<HuongDanSuDungViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<HuongDanSuDungViewModel>> Post([FromBody] HuongDanSuDungViewModel model)
        {
            var obj = model.ToEntity<HuongDanSuDung>();
            await _huongDanSuDungService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<HuongDanSuDungViewModel>> Put([FromBody] HuongDanSuDungViewModel model)
        {
            var obj = await _huongDanSuDungService.GetByIdAsync(model.Id);
            var result = model.ToEntity(obj);
            await _huongDanSuDungService.UpdateAsync(result);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _huongDanSuDungService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _huongDanSuDungService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _huongDanSuDungService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.HuongDanSuDungBacSiGiaDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _huongDanSuDungService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _huongDanSuDungService.UpdateAsync(entity);
            return NoContent();
        }
    }
}
