using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKho.ViTriDuocPhamVatTus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomKhos.ViTriDeDuocPhamVatTus;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoViTriDeDuocPhamVatTuController : CaminoBaseController
    {
        readonly IViTriDeDuocPhamVatTuService _viTriDeDuocPhamVatTuService;
        public QuanTriNhomKhoViTriDeDuocPhamVatTuController(IViTriDeDuocPhamVatTuService viTriDeDuocPhamVatTuService)
        {
            _viTriDeDuocPhamVatTuService = viTriDeDuocPhamVatTuService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _viTriDeDuocPhamVatTuService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] ViTriDeDuocPhamVatTuQueryInfo queryInfo)
        {
            var data = await _viTriDeDuocPhamVatTuService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhChucDanh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _viTriDeDuocPhamVatTuService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _viTriDeDuocPhamVatTuService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ViTriDeDuocPhamVaTuViewModel>> Get(long id)
        {
            var data = await _viTriDeDuocPhamVatTuService.GetByIdAsync(id);
            var result = data.Map<ViTriDeDuocPhamVaTuViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ViTriDeDuocPhamVaTuViewModel>> Post([FromBody] ViTriDeDuocPhamVaTuViewModel model)
        {
            var obj = model.ToEntity<ViTriDeDuocPhamVatTu>();
            await _viTriDeDuocPhamVatTuService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ViTriDeDuocPhamVaTuViewModel>> Put([FromBody] ViTriDeDuocPhamVaTuViewModel model)
        {
            var obj = await _viTriDeDuocPhamVatTuService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _viTriDeDuocPhamVatTuService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _viTriDeDuocPhamVatTuService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _viTriDeDuocPhamVatTuService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
