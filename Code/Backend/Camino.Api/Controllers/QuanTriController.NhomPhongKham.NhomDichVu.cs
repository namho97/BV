using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVus;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuBenhViens;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamNhomDichVuController : CaminoBaseController
    {
        readonly INhomDichVuBenhVienService _nhomThuocService;
        public QuanTriNhomPhongKhamNhomDichVuController(INhomDichVuBenhVienService nhomDichVuService)
        {
            _nhomThuocService = nhomDichVuService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo, long? id)
        {
            var lookup = await _nhomThuocService.GetLookup(queryInfo, id);
            return Ok(lookup);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NhomDichVuQueryInfo queryInfo)
        {
            var data = _nhomThuocService.GetDataTreeView(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuViewModel>> Get(long id)
        {
            var data = await _nhomThuocService.GetByIdAsync(id);
            var result = data.Map<NhomDichVuViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuViewModel>> Post([FromBody] NhomDichVuViewModel model)
        {
            var obj = model.ToEntity<NhomDichVuBenhVien>();
            await _nhomThuocService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamNhomThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuViewModel>> Put([FromBody] NhomDichVuViewModel model)
        {
            var obj = await _nhomThuocService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _nhomThuocService.UpdateAsync(obj);
            return Ok(obj);
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
