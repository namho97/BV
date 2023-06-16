using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DonViTinhs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DonViTinhs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamDonViTinhController : CaminoBaseController
    {
        readonly IDonViTinhService _donViTinhService;
        public QuanTriNhomDuocPhamDonViTinhController(IDonViTinhService donViTinhService)
        {
            _donViTinhService = donViTinhService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DonViTinhQueryInfo queryInfo)
        {
            var data = await _donViTinhService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _donViTinhService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _donViTinhService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _donViTinhService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DonViTinhViewModel>> Get(long id)
        {
            var data = await _donViTinhService.GetByIdAsync(id);
            var result = data.Map<DonViTinhViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DonViTinhViewModel>> Post([FromBody] DonViTinhViewModel model)
        {
            var obj = model.ToEntity<DonViTinh>();
            await _donViTinhService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DonViTinhViewModel>> Put([FromBody] DonViTinhViewModel model)
        {
            var obj = await _donViTinhService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _donViTinhService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomDuocPhamDonViTinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _donViTinhService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _donViTinhService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
