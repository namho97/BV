using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomVatTu.NhomVatTus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomVatTus.NhomVatTus;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomVatTus.NhomVatTus;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomVatTuVatTuController : CaminoBaseController
    {
        readonly INhomVatTuService _nhomVatTuService;
        public QuanTriNhomVatTuVatTuController(INhomVatTuService nhomVatTuService)
        {
            _nhomVatTuService = nhomVatTuService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo, long? id)
        {
            var lookup = await _nhomVatTuService.GetLookup(queryInfo, id);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomVatTuVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public ActionResult<GridDataSource> GetDataForGridAsync([FromBody] NhomVatTuQueryInfo queryInfo)
        {
            var data = _nhomVatTuService.GetDataTreeView(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomVatTuVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomVatTuViewModel>> Get(long id)
        {
            var data = await _nhomVatTuService.GetByIdAsync(id);
            var result = data.Map<NhomVatTuViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomVatTuVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomVatTuViewModel>> Post([FromBody] NhomVatTuViewModel model)
        {
            if (model.NhomVatTuChaId == null)
            {
                model.CapNhom = 0;
            }
            if (model.NhomVatTuChaId != null)
            {
                var capNhomCha = await _nhomVatTuService.GetCapNhom(model.NhomVatTuChaId);
                foreach (var item in capNhomCha)
                {
                    model.CapNhom = item.CapNhom;
                }
            }
            model.CapNhom = (int)model.CapNhom + 1;
            var obj = model.ToEntity<NhomVatTu>();
            await _nhomVatTuService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomVatTuVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomVatTuViewModel>> Put([FromBody] NhomVatTuViewModel model)
        {
            var getTrieuChung = new NhomVatTu();
            var trieuChung = await _nhomVatTuService.GetByIdAsync(model.Id);
            if (model.NhomVatTuChaId == null)
            {
                model.CapNhom = 1;
            }
            else
            {
                getTrieuChung = await _nhomVatTuService.GetByIdAsync(model.NhomVatTuChaId.Value);
                model.CapNhom = getTrieuChung.CapNhom + 1;
            }
            if (model.NhomVatTuChaId == model.Id)
            {
                model.NhomVatTuChaId = null;
            }
            model.ToEntity(trieuChung);
            foreach (var item in trieuChung.NhomVatTus)
            {
                item.CapNhom = trieuChung.CapNhom + 1;
            }
            await _nhomVatTuService.UpdateAsync(trieuChung);
            return Ok(trieuChung);
            //var obj = await _nhomVatTuService.GetByIdAsync(model.Id);
            //model.ToEntity(obj);
            //await _nhomVatTuService.UpdateAsync(obj);
            //return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomVatTuVatTu, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nhomVatTuService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nhomVatTuService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
