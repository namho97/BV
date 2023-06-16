using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.BenhViens;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.BenhViens;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamBenhVienController : CaminoBaseController
    {

        readonly IBenhVienService _benhVienService;
        public QuanTriNhomPhongKhamBenhVienController(IBenhVienService benhVienService)
        {
            _benhVienService = benhVienService;
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] BenhVienQueryInfo queryInfo)
        {
            var data = await _benhVienService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<BenhVienViewModel>> Get(long id)
        {
            var data = await _benhVienService.GetByIdAsync(id);
            var result = data.Map<BenhVienViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<BenhVienViewModel>> Post([FromBody] BenhVienViewModel model)
        {
            var obj = model.ToEntity<BenhVien>();
            await _benhVienService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<BenhVienViewModel>> Put([FromBody] BenhVienViewModel model)
        {
            var obj = await _benhVienService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _benhVienService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _benhVienService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _benhVienService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookup")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _benhVienService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("GetLookupLoaiBenhVien")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamBenhVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupLoaiBenhVien([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _benhVienService.GetLookupLoaiBenhVien(queryInfo);
            return Ok(lookup);
        }

    }
}
