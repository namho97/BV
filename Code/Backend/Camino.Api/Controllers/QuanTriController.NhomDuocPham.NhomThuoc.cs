using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.NhomThuocs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.NhomThuocs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams.NhomThuocs;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamNhomThuocController : CaminoBaseController
    {
        readonly INhomThuocService _nhomThuocService;
        public QuanTriNhomDuocPhamNhomThuocController(INhomThuocService nhomThuocService)
        {
            _nhomThuocService = nhomThuocService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo, long? id)
        {
            var lookup = await _nhomThuocService.GetLookup(queryInfo, id);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public ActionResult<GridDataSource> GetDataForGridAsync([FromBody] NhomThuocQueryInfo queryInfo)
        {
            var data =  _nhomThuocService.GetDataTreeView(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomThuocViewModel>> Get(long id)
        {
            var data = await _nhomThuocService.GetByIdAsync(id);
            var result = data.Map<NhomThuocViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomThuocViewModel>> Post([FromBody] NhomThuocViewModel model)
        {
            if (model.NhomChaId == null)
            {
                model.CapNhom = 0;
            }
            if (model.NhomChaId != null)
            {
                var capNhomCha = await _nhomThuocService.GetCapNhom(model.NhomChaId);
                foreach (var item in capNhomCha)
                {
                    model.CapNhom = item.CapNhom;
                }
            }
            model.CapNhom = (int)model.CapNhom + 1;
            var obj = model.ToEntity<NhomThuoc>();
            await _nhomThuocService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomThuocViewModel>> Put([FromBody] NhomThuocViewModel model)
        {
            var getTrieuChung = new NhomThuoc();
            var trieuChung = await _nhomThuocService.GetByIdAsync(model.Id);
            if (model.NhomChaId == null)
            {
                model.CapNhom = 1;
            }
            else
            {
                getTrieuChung = await _nhomThuocService.GetByIdAsync(model.NhomChaId.Value);
                model.CapNhom = getTrieuChung.CapNhom + 1;
            }
            if (model.NhomChaId == model.Id)
            {
                model.NhomChaId = null;
            }
            model.ToEntity(trieuChung);
            foreach (var item in trieuChung.NhomThuocs)
            {
                item.CapNhom = trieuChung.CapNhom + 1;
            }
            await _nhomThuocService.UpdateAsync(trieuChung);
            return Ok(trieuChung);
            //var obj = await _nhomThuocService.GetByIdAsync(model.Id);
            //model.ToEntity(obj);
            //await _nhomThuocService.UpdateAsync(obj);
            //return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nhomThuocService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nhomThuocService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
