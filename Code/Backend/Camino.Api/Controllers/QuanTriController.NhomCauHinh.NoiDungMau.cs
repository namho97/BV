using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomCauHinh.NoiDungMaus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomCauHinhs;
using Microsoft.AspNetCore.Mvc;
using static Camino.Core.Domain.QuanTris.NhomCauHinhs.NoiDungMaus.NoiDungMauEnum;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomCauHinhNoiDungMauController : CaminoBaseController
    {
        readonly INoiDungMauService _noiDungMauService;
        public QuanTriNhomCauHinhNoiDungMauController(INoiDungMauService noiDungMauService)
        {
            _noiDungMauService = noiDungMauService;
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhNoiDungMau)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NoiDungMauQueryInfo queryInfo)
        {
            var data = await _noiDungMauService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhNoiDungMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NoiDungMauViewModel>> Get(long id)
        {
            var data = await _noiDungMauService.GetByIdAsync(id);
            var result = data.Map<NoiDungMauViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomCauHinhNoiDungMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NoiDungMauViewModel>> Post([FromBody] NoiDungMauViewModel model)
        {
            var obj = model.ToEntity<NoiDungMau>();
            await _noiDungMauService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomCauHinhNoiDungMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NoiDungMauViewModel>> Put([FromBody] NoiDungMauViewModel model)
        {
            var obj = await _noiDungMauService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _noiDungMauService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomCauHinhNoiDungMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _noiDungMauService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _noiDungMauService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] NoiDungMauLookupQueryInfo queryInfo)
        {
            var lookup = await _noiDungMauService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("GetLoaiLookup")]
        public ActionResult<ICollection<LookupItemVo>> GetLoaiLookup()
        {
            var datas = Enum.GetValues(typeof(LoaiNoiDungMauEnum)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o),
            });
            return Ok(models);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhNoiDungMau, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteNoiDungMauVo saveAutocompleteVo)
        {
            var data = _noiDungMauService.GetNoiDungMau(saveAutocompleteVo.Loai, saveAutocompleteVo.Value);
            if (data != null)
            {
                return Ok(false);
            }
            _noiDungMauService.Add(new NoiDungMau
            {
                Loai = saveAutocompleteVo.Loai,
                NoiDung = saveAutocompleteVo.Value
            });
            return Ok(true);
        }

    }
}
