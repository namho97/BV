using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.Icds;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.Icds;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamIcdController : CaminoBaseController
    {

        readonly IIcdService _icdService;
        public QuanTriNhomPhongKhamIcdController(IIcdService icdService)
        {
            _icdService = icdService;
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] IcdQueryInfo queryInfo)
        {
            var data = await _icdService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<IcdViewModel>> Get(long id)
        {
            var data = await _icdService.GetByIdAsync(id);
            var result = data.Map<IcdGetViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<IcdViewModel>> Post([FromBody] IcdViewModel model)
        {
            var obj = model.ToEntity<Icd>();
            await _icdService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<IcdViewModel>> Put([FromBody] IcdViewModel model)
        {
            var obj = await _icdService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _icdService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _icdService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _icdService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup =  _icdService.GetLookup(queryInfo);
            return Ok(lookup);
        }

        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamIcd, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _icdService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _icdService.UpdateAsync(entity);
            return NoContent();
        }
    }
}
