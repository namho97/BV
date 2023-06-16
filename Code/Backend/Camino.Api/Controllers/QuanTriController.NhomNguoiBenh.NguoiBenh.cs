using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomNguoiBenh.NguoiBenh;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomCauHinhs;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomNguoiBenhNguoiBenhController : CaminoBaseController
    {
        private INguoiBenhService _nguoiBenhService;
        private readonly ICauHinhService _cauHinhService;
        public QuanTriNhomNguoiBenhNguoiBenhController(INguoiBenhService nguoiBenhService, ICauHinhService cauHinhService)
        {
            _nguoiBenhService = nguoiBenhService;
            _cauHinhService = cauHinhService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NguoiBenhQueryInfo queryInfo)
        {
            var gridDataSource = await _nguoiBenhService.GetDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NguoiBenhViewModel>> Get(long id)
        {
            var data = await _nguoiBenhService.GetByIdAsync(id);
            var result = data.Map<NguoiBenhViewModel>();
            var ngheNghiepId = _nguoiBenhService.GetNgheNghiepId(data.NgheNghiep);
            result.NgheNghiepId = ngheNghiepId;

            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NguoiBenhViewModel>> Post([FromBody] NguoiBenhViewModel model)
        {
            var obj = model.ToEntity<NguoiBenh>();
            obj.MaNguoiBenh = ResourceHelper.CreateMaNguoiBenh();
            await _nguoiBenhService.AddAsync(obj);

            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NguoiBenhViewModel>> Put([FromBody] NguoiBenhViewModel model)
        {
            var obj = await _nguoiBenhService.GetByIdAsync(model.Id);
            model.ToEntity(obj);
            await _nguoiBenhService.UpdateAsync(obj);

            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nguoiBenhService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nguoiBenhService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpGet("GetBarCodeLinkDangKyKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> GetBarCodeLinkDangKyKham(long id)
        {
            var nguoiBenh = await _nguoiBenhService.GetByIdAsync(id);
            var linkDangKyKham = _cauHinhService.GetSetting("CauHinhPhongKham.LinkDangKyKham")?.Value;
            if (nguoiBenh == null)
            {
                return Ok(BarcodeHelper.GenerateQrCode(linkDangKyKham, System.Drawing.ColorTranslator.FromHtml("#ffffff"), System.Drawing.ColorTranslator.FromHtml("#000000")));
            }
            else
            {

                //Encode 2 lần để tránh case url có dấu +
                var code = EncryptHelper.EncryptText(nguoiBenh.MaNguoiBenh, EncryptHelper.Key);
                code = Convert.ToBase64String(Encoding.UTF8.GetBytes(code));
                return Ok(BarcodeHelper.GenerateQrCode(linkDangKyKham + "?code=" + code, System.Drawing.ColorTranslator.FromHtml("#ffffff"), System.Drawing.ColorTranslator.FromHtml("#000000")));
            }
        }

    }
}
