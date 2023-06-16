using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongNhanViens;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongNhanViens;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhonhNhanViens;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongNhanViens;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoaPhongKhoaPhongNhanVienController : CaminoBaseController
    {
        readonly IKhoaPhongNhanVienService _khoaPhongNhanVienService;
        public QuanTriNhomKhoaPhongKhoaPhongNhanVienController(IKhoaPhongNhanVienService khoaPhongNhanVienService)
        {
            _khoaPhongNhanVienService = khoaPhongNhanVienService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            //var lookup = await _khoaPhongNhanVienService.GetLookup(queryInfo);
            var lookup = new List<LookupItemVo>() {
                new LookupItemVo{ KeyId=1,DisplayName="Bác sĩ - Khoa CĐHA - TDCN"},
                new LookupItemVo{ KeyId=2,DisplayName="BS. CKI Lê Xuân Hữu Khoa Nhi"},
            };
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] KhoaPhongNhanVienQueryInfo queryInfo)
        {
            var data = await _khoaPhongNhanVienService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongNhanVienViewModel>> Get(long id)
        {
            var data = await _khoaPhongNhanVienService.GetByIdAsync(id);
            var result = data.Map<KhoaPhongNhanVienViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongNhanVienViewModel>> Post([FromBody] KhoaPhongNhanVienViewModel model)
        {
            var obj = model.ToEntity<KhoaPhongNhanVien>();
            await _khoaPhongNhanVienService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongNhanVienViewModel>> Put([FromBody] KhoaPhongNhanVienViewModel model)
        {
            var obj = await _khoaPhongNhanVienService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _khoaPhongNhanVienService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _khoaPhongNhanVienService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _khoaPhongNhanVienService.DeleteAsync(model);
            return Ok(true);
        }
    }
}
