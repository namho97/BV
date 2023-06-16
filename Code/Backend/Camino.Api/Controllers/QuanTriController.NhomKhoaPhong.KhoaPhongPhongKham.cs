using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongPhongKhams;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.KhoaPhongPhongKhams;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongPhongKhams;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongPhongKhams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoaPhongKhoaPhongPhongKhamController : CaminoBaseController
    {
        readonly IKhoaPhongPhongKhamService _khoaPhongPhongKhamService;
        public QuanTriNhomKhoaPhongKhoaPhongPhongKhamController(IKhoaPhongPhongKhamService khoaPhongPhongKhamService)
        {
            _khoaPhongPhongKhamService = khoaPhongPhongKhamService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _khoaPhongPhongKhamService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] KhoaPhongPhongKhamQueryInfo queryInfo)
        {
            var data = await _khoaPhongPhongKhamService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _khoaPhongPhongKhamService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _khoaPhongPhongKhamService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongPhongKhamViewModel>> Get(long id)
        {
            var data = await _khoaPhongPhongKhamService.GetByIdAsync(id,s=>s.Include(d=>d.KhoaPhong));
            var result = data.Map<KhoaPhongPhongKhamViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongPhongKhamViewModel>> Post([FromBody] KhoaPhongPhongKhamViewModel model)
        {
            var obj = model.ToEntity<KhoaPhongPhongKham>();
            await _khoaPhongPhongKhamService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongPhongKhamViewModel>> Put([FromBody] KhoaPhongPhongKhamViewModel model)
        {
            var obj = await _khoaPhongPhongKhamService.GetByIdAsync(model.Id,s=>s.Include(d=>d.KhoaPhong));
            model.ToEntity(obj);
            await _khoaPhongPhongKhamService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _khoaPhongPhongKhamService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _khoaPhongPhongKhamService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
