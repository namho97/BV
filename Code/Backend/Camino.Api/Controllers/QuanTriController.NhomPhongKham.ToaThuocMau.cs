using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomToaThuocMau.ToaThuocMaus;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.ToaThuocMaus;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomDuocPhams;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamToaThuocMauController : CaminoBaseController
    {
        readonly IToaThuocMauService _toaThuocMauService;
        private readonly ILocalizationService _localizationService;
        readonly IDuocPhamService _duocPhamService;
        public QuanTriNhomPhongKhamToaThuocMauController(IToaThuocMauService toaThuocMauService, ILocalizationService localizationService, IDuocPhamService duocPhamService)
        {
            _toaThuocMauService = toaThuocMauService;
            _localizationService = localizationService;
            _duocPhamService = duocPhamService;
        }


        [HttpPost("GetToaMauChiTietDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetToaMauChiTietDataForGridAsync([FromBody] QueryInfo queryInfo)
        {
            var gridDataSource = await _toaThuocMauService.GetToaMauChiTietDataForGridAsync(queryInfo.QueryId);
            return Ok(gridDataSource);
        }


        [HttpPost("GetLookup")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var data = await _toaThuocMauService.GetLookup(queryInfo);
            return Ok(data);
        }


        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] ToaThuocMauQueryInfo queryInfo)
        {
            var data = await _toaThuocMauService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _toaThuocMauService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _toaThuocMauService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ToaThuocMauViewModel>> Get(long id)
        {
            var data = await _toaThuocMauService.GetByIdAsync(id, s => s.Include(d => d.Icd).Include(f => f.BacSi).Include(d => d.ToaThuocMauChiTiets));
            var result = data.Map<ToaThuocMauViewModel>();
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
            // get thông tin dược phẩm 
            var dpIds = result.ToaThuocMauChiTiets.Select(d => d.DuocPhamId.GetValueOrDefault()).ToList();
            var infoDuocPhams = _duocPhamService.GetThongTinDuocPham(dpIds);

            foreach (var item in result.ToaThuocMauChiTiets)
            {
                var thongtin = infoDuocPhams.Where(d => d.Id == item.DuocPhamId).First();

                item.HamLuong = thongtin.HamLuong;
                item.HoatChat = thongtin.HoatChat;
                item.DuongDung = thongtin.DuongDung;
                item.DonViTinh = thongtin.DonViTinh;
                item.HamLuong = thongtin.HamLuong;
                item.Gia = thongtin.Gia;
            }
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ToaThuocMauViewModel>> Post([FromBody] ToaThuocMauViewModel model)
        {
            if (!model.ToaThuocMauChiTiets.Any())
            {
                throw new Models.Error.ApiException(_localizationService.GetResource("ToaThuocMau.ToaThuocMauChiTiets.Required"));

            }
            var obj = model.ToEntity<ToaThuocMau>();
            await _toaThuocMauService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ToaThuocMauViewModel>> Put([FromBody] ToaThuocMauViewModel model)
        {
            if (!model.ToaThuocMauChiTiets.Any())
            {
                throw new Models.Error.ApiException(_localizationService.GetResource("ToaThuocMau.ToaThuocMauChiTiets.Required"));
            }

            var obj = await _toaThuocMauService.GetByIdAsync(model.Id, s => s.Include(d => d.Icd).Include(f => f.BacSi).Include(d => d.ToaThuocMauChiTiets));
            model.ToEntity(obj);
            await _toaThuocMauService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _toaThuocMauService.GetByIdAsync(id, s => s.Include(d => d.Icd).Include(f => f.BacSi).Include(d => d.ToaThuocMauChiTiets));
            if (model == null)
                return NoContent();
            await _toaThuocMauService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetToaMauDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamToaThuocMau, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetToaMauDataForGridAsync([FromBody] ToaThuocMauQueryInfo queryInfo)
        {
            var data = await _toaThuocMauService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

    }
}
