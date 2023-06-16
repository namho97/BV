using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.TrieuChungs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.TrieuChungs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamTrieuChungController : CaminoBaseController
    {
        readonly ITrieuChungService _trieuChungService;
        public QuanTriNhomPhongKhamTrieuChungController(ITrieuChungService trieuChungService)
        {
            _trieuChungService = trieuChungService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo,long? id)
        {
            var lookup = await _trieuChungService.GetLookup(queryInfo,id);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamTrieuChung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] TrieuChungQueryInfo queryInfo)
        {
            var data = _trieuChungService.GetDataTreeView(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamTrieuChung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TrieuChungViewModel>> Get(long id)
        {
            var data = await _trieuChungService.GetByIdAsync(id);
            var result = data.Map<TrieuChungViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamTrieuChung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TrieuChungViewModel>> Post([FromBody] TrieuChungViewModel model)
        {
            if (model.TrieuChungChaId == null)
            {
                model.CapNhom = 0;
            }
            if (model.TrieuChungChaId != null)
            {
                var capNhomCha = await _trieuChungService.GetCapNhom(model.TrieuChungChaId);
                foreach (var item in capNhomCha)
                {
                    model.CapNhom = item.CapNhom;
                }
            }
            model.CapNhom = (int)model.CapNhom + 1;
            var obj = model.ToEntity<TrieuChung>();
            await _trieuChungService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamTrieuChung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TrieuChungViewModel>> Put([FromBody] TrieuChungViewModel model)
        {
            var getTrieuChung = new TrieuChung();
            var trieuChung = await _trieuChungService.GetByIdAsync(model.Id);
            if (model.TrieuChungChaId == null)
            {
                model.CapNhom = 1;
            }
            else
            {
                getTrieuChung = await _trieuChungService.GetByIdAsync(model.TrieuChungChaId.Value);
                model.CapNhom = getTrieuChung.CapNhom + 1;
            }
            if (model.TrieuChungChaId == model.Id)
            {
                model.TrieuChungChaId = null;
            }
            model.ToEntity(trieuChung);
            foreach (var item in trieuChung.TrieuChungs)
            {
                item.CapNhom = trieuChung.CapNhom + 1;
            }
            await _trieuChungService.UpdateAsync(trieuChung);
            return Ok(trieuChung);
            //var obj = await _trieuChungService.GetByIdAsync(model.Id);
            //model.ToEntity(obj);
            //await _trieuChungService.UpdateAsync(obj);
            //return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamTrieuChung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _trieuChungService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _trieuChungService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
