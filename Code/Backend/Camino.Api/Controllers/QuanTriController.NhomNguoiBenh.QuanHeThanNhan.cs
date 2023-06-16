using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomNguoiBenh.QuanHeThanNhans;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.QuanHeThanNhans;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomNguoiBenhs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomNguoiBenhQuanHeThanNhanController : CaminoBaseController
    {
        readonly IQuanHeNhanThanService _quanHeThanNhanService;
        public QuanTriNhomNguoiBenhQuanHeThanNhanController(IQuanHeNhanThanService quanHeThanNhanService)
        {
            _quanHeThanNhanService = quanHeThanNhanService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            //var lookup = await _quanHeThanNhanService.GetLookup(queryInfo);
            var lookup = new List<LookupItemVo>() {
                new LookupItemVo{ KeyId=1,DisplayName="Cha"},
                new LookupItemVo{ KeyId=2,DisplayName="Mẹ"},
                new LookupItemVo{ KeyId=3,DisplayName="Ông ngoại"},
                new LookupItemVo{ KeyId=4,DisplayName="Ông nội"},
                new LookupItemVo{ KeyId=5,DisplayName="Chú"}
            };
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] QuanHeThanNhanQueryInfo queryInfo)
        {
            var data = await _quanHeThanNhanService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _quanHeThanNhanService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _quanHeThanNhanService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuanHeThanNhanViewModel>> Get(long id)
        {
            var data = await _quanHeThanNhanService.GetByIdAsync(id);
            var result = data.Map<QuanHeThanNhanViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuanHeThanNhanViewModel>> Post([FromBody] QuanHeThanNhanViewModel model)
        {
            var obj = model.ToEntity<QuanHeNhanThan>();
            await _quanHeThanNhanService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<QuanHeThanNhanViewModel>> Put([FromBody] QuanHeThanNhanViewModel model)
        {
            var obj = await _quanHeThanNhanService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _quanHeThanNhanService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _quanHeThanNhanService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _quanHeThanNhanService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
