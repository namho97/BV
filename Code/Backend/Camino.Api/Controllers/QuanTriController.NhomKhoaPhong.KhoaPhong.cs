using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomKhoaPhong.KhoaPhongs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams.KhoaPhongs;
using Microsoft.AspNetCore.Mvc;
using static Camino.Core.Domain.QuanTris.NhomKhoaPhongs.KhoaPhongs.EnumKhoaPhong;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomKhoaPhongKhoaPhongController : CaminoBaseController
    {
        readonly IKhoaPhongService _khoaPhongService;
        public QuanTriNhomKhoaPhongKhoaPhongController(IKhoaPhongService khoaPhongService)
        {
            _khoaPhongService = khoaPhongService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _khoaPhongService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] KhoaPhongQueryInfo queryInfo)
        {
            var data = await _khoaPhongService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _khoaPhongService.GetByIdAsync(id);
            entity.HieuLuc =!entity.HieuLuc;
            await _khoaPhongService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongViewModel>> Get(long id)
        {
            var data = await _khoaPhongService.GetByIdAsync(id);
            var result = data.Map<KhoaPhongViewModel>();
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongViewModel>> Post([FromBody] KhoaPhongViewModel model)
        {
            var obj = model.ToEntity<KhoaPhong>();
            obj.IsDefault = true;
            await _khoaPhongService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<KhoaPhongViewModel>> Put([FromBody] KhoaPhongViewModel model)
        {
            var obj = await _khoaPhongService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _khoaPhongService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _khoaPhongService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _khoaPhongService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookupLoaiKhoaPhong")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupLoaiKhoaPhong([FromBody] LookupQueryInfo queryInfo)
        {
            var datas = Enum.GetValues(typeof(EnumLoaiKhoaPhong)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemTrangThaiSuDungVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o)
            });
            return Ok(models);
        }
    }
}
