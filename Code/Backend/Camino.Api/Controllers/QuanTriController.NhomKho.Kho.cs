using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKho.Khos;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.Khos;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomKhos.Khos;
using Microsoft.AspNetCore.Mvc;
using static Camino.Core.Domain.QuanTris.NhomKhos.Khos.EnumKho;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoKhoController : CaminoBaseController
    {
        readonly IKhoService _khoService;
        public QuanTriNhomKhoKhoController(IKhoService khoService)
        {
            _khoService = khoService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] KhoQueryInfo queryInfo)
        {
            var data = await _khoService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _khoService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
       
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoViewModel>> Get(long id)
        {
            var data = await _khoService.GetByIdAsync(id);
            var result = data.Map<KhoViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoViewModel>> Post([FromBody] KhoViewModel model)
        {
            var obj = model.ToEntity<Kho>();
            obj.IsDefault = false; // default
            await _khoService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoViewModel>> Put([FromBody] KhoViewModel model)
        {
            var obj = await _khoService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _khoService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomKhoKho, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _khoService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _khoService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookupLoaiKho")]
        public ActionResult<ICollection<LookupItemVo>> GetLookupLoaiKho([FromBody] LookupQueryInfo queryInfo)
        {
            var datas = Enum.GetValues(typeof(EnumLoaiKho)).Cast<Enum>();
            var models = datas
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
    }
}
