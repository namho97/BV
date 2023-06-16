using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomCauHinh.CauHinhs;
using Camino.Core.Domain;
using Camino.Core.Domain.CauHinhs;
using Camino.Core.Helpers;
using Camino.Services.QuanTris.NhomCauHinhs;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomCauHinhThongSoMacDinhController : CaminoBaseController
    {
        readonly ICauHinhService _cauHinhService;
        public QuanTriNhomCauHinhThongSoMacDinhController(ICauHinhService cauHinhService)
        {
            _cauHinhService = cauHinhService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhThongSoMacDinh)]
        public ActionResult<GridDataSource> GetDataForGridAsync([FromBody] CauHinhQueryInfo queryInfo)
        {
            var data = _cauHinhService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = _cauHinhService.getListLoaiCauHinh();
            return Ok(lookup);
        }
        [HttpPost("GetLookupLoaiCauHinh")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupLoaiCauHinh([FromBody] LookupQueryInfo queryInfo)
        {
            var listEnum = EnumHelper.GetListEnum<DataType>().Select(item => new LookupItemVo()
            {
                DisplayName = item.GetDescription(),
                KeyId = Convert.ToInt32(item)
            }).ToList();
            return listEnum;
        }




        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhThongSoMacDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<CauhinhViewModel>> Get(long id)
        {
            var cauhinh = await _cauHinhService.GetByIdAsync(id);
            if (cauhinh == null)
            {
                return NotFound();
            }

            var model = cauhinh.ToModel<CauhinhViewModel>();
            if (model != null && !string.IsNullOrEmpty(model.Value) && model.DataType == 10)
            {
                var queryString = JsonConvert.DeserializeObject<List<CauHinhDanhSachChiTiet>>(model.Value);
                model.CauHinhDanhSachChiTiets = queryString;
            }
            return Ok(model);
        }

        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomCauHinhThongSoMacDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<CauhinhViewModel>> Post([FromBody] CauhinhViewModel model)
        {
            var obj = model.ToEntity<CauHinh>();
            if (model != null && model.CauHinhDanhSachChiTiets.Count() > 0)
            {
                obj.Value = JsonConvert.SerializeObject(model.CauHinhDanhSachChiTiets);
            }
            await _cauHinhService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomCauHinhThongSoMacDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult> Put([FromBody] CauhinhViewModel model)
        {
            var cauhinh = await _cauHinhService.GetByIdAsync(model.Id);
            var entity = model.ToEntity(cauhinh);

            var length = model.Value.Length;
            if (model != null && model.CauHinhDanhSachChiTiets.Count() > 0)
            {
                entity.Value = JsonConvert.SerializeObject(model.CauHinhDanhSachChiTiets);
            }
            await _cauHinhService.UpdateAsync(entity);
            return Ok(true);
        }

        [HttpPost("GetCauHinhByName")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomCauHinhThongSoMacDinh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public ActionResult<string> GetCauHinhByName([FromForm] string key)
        {
            var cauhinh = _cauHinhService.GetSetting(key);
            if (cauhinh == null)
            {
                return NotFound();
            }

            return Ok(cauhinh.Value);
        }


    }
}
