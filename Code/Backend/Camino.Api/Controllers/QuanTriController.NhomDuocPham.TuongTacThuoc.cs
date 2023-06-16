using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.TuongTacThuocs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams.TuongTacThuocs;
using Microsoft.AspNetCore.Mvc;
using static Camino.Core.Domain.QuanTris.NhomDuocPhams.TuongTacThuocs.EnumMucDoChuYKhiChiDinh;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamTuongTacThuocController : CaminoBaseController
    {
        readonly ITuongTacThuocService _tuongTacThuocService;
        public QuanTriNhomDuocPhamTuongTacThuocController(ITuongTacThuocService tuongTacThuocService)
        {
            _tuongTacThuocService = tuongTacThuocService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _tuongTacThuocService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("GetLookupThuocHoacHoatChat")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupThuocHoacHoatChat([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _tuongTacThuocService.GetLookupThuocHoacHoatChat(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] TuongTacThuocQueryInfo queryInfo)
        {
            var data = await _tuongTacThuocService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TuongTacThuocViewModel>> Get(long id)
        {
            var data = await _tuongTacThuocService.GetByIdAsync(id);
            var result = data.Map<TuongTacThuocViewModel>();

            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TuongTacThuocViewModel>> Post([FromBody] TuongTacThuocViewModel model)
        {
            var obj = model.ToEntity<TuongTacThuoc>();
            await _tuongTacThuocService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<TuongTacThuocViewModel>> Put([FromBody] TuongTacThuocViewModel model)
        {
            var obj = await _tuongTacThuocService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _tuongTacThuocService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _tuongTacThuocService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _tuongTacThuocService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookupMucDoChuYKhiChiDinh")]
        public ActionResult<ICollection<LookupItemVo>> GetLookupMucDoChuYKhiChiDinh()
        {
            var datas = Enum.GetValues(typeof(MucDoChuYKhiChiDinh)).Cast<Enum>();
            var models = datas
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
        [HttpPost("GetLookupMucDoTuongTac")]
        public ActionResult<ICollection<LookupItemVo>> GetLookupMucDoTuongTac()
        {
            var datas = Enum.GetValues(typeof(MucDoTuongTac)).Cast<Enum>();
            var models = datas
                .Select(o => new LookupItemVo
                {
                    DisplayName = o.GetDescription(),
                    KeyId = Convert.ToInt32(o),
                });
            return Ok(models);
        }
     

    }
}
