using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.NhomDichVuThuongDungs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.EnumBoPhan;
using static Camino.Core.Domain.QuanTris.NhomPhongKhams.NhomDichVuThuongDungs.LoaiGoiDichVu;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamNhomDichVuThuongDungController : CaminoBaseController
    {
        readonly INhomDichVuThuongDungService _nhomDichVuThuongDungService;
        public QuanTriNhomPhongKhamNhomDichVuThuongDungController(INhomDichVuThuongDungService nhomDichVuThuongDungService)
        {
            _nhomDichVuThuongDungService = nhomDichVuThuongDungService;
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _nhomDichVuThuongDungService.GetLookup(queryInfo);
            return Ok(lookup);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NhomDichVuThuongDungQueryInfo queryInfo)
        {
            var data = await _nhomDichVuThuongDungService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _nhomDichVuThuongDungService.GetByIdAsync(id);
            entity.HieuLuc = !entity.HieuLuc;
            await _nhomDichVuThuongDungService.UpdateAsync(entity);
            return NoContent();
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuThuongDungViewModel>> Get(long id)
        {
            //var data = await _nhomDichVuThuongDungService.GetByIdAsync(id);
            //var result = data.Map<NhomDichVuThuongDungViewModel>();

            var goiDv= await _nhomDichVuThuongDungService.GetByIdAsync(id, w => w.Include(e => e.GoiDichVuChiTietDichVuKhamBenhs)
                                         .ThenInclude(e => e.DichVuKhamBenh)
                                         .Include(e => e.GoiDichVuChiTietDichVuKhamBenhs).ThenInclude(e => e.DichVuKhamBenhGia)
                                         .Include(e => e.GoiDichVuChiTietDichVuKyThuats).ThenInclude(e => e.DichVuKyThuat)
                                         .Include(e => e.GoiDichVuChiTietDichVuKyThuats).ThenInclude(e => e.DichVuKyThuatGia));
            if (goiDv == null)
            {
                return NotFound();
            }

            var goiDvMarketingViewModel = goiDv.ToModel<NhomDichVuThuongDungViewModel>();

            #region DV Khám
            goiDvMarketingViewModel.GoiDichVuChiTietDichVuKhamBenhs = new List<GoiDichVuChiTietDichVuKhamBenhViewModel>();
            foreach (var khamBenhEntity in goiDv.GoiDichVuChiTietDichVuKhamBenhs)
            {
                var khamBenhViewModel = new GoiDichVuChiTietDichVuKhamBenhViewModel
                {
                    Id = khamBenhEntity.Id,
                    SoLan = khamBenhEntity.SoLan,
                    DichVuKhamBenhGiaId = khamBenhEntity.DichVuKhamBenhGiaId,
                    DichVuKhamBenhId = khamBenhEntity.DichVuKhamBenhId,
                    GhiChu = khamBenhEntity.GhiChu,
                    GoiDichVuId = goiDv.Id,
                    MaDV = khamBenhEntity.DichVuKhamBenh.Ma,
                    TenDV = khamBenhEntity.DichVuKhamBenh.Ten,
                    DonGia = khamBenhEntity.DichVuKhamBenh.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ?
                             khamBenhEntity.DichVuKhamBenh.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia
                             : 0,
                    LoaiDichVu = LoaiNhomDichVuEnum.YeuCauKhamBenh // dv khám
                };
                goiDvMarketingViewModel.GoiDichVuChiTietDichVuKhamBenhs.Add(khamBenhViewModel);
            }
            #endregion DV Khám

            #region DV Khám
            goiDvMarketingViewModel.GoiDichVuChiTietDichVuKyThuats = new List<GoiDichVuChiTietDichVuKyThuatViewModel>();

            foreach (var kyThuatEntity in goiDv.GoiDichVuChiTietDichVuKyThuats)
            {
                var kyThuatViewModel = new GoiDichVuChiTietDichVuKyThuatViewModel
                {
                    Id = kyThuatEntity.Id,
                    SoLan = kyThuatEntity.SoLan,
                    DichVuKyThuatGiaId = kyThuatEntity.DichVuKyThuatGiaId,
                    DichVuKyThuatId = kyThuatEntity.DichVuKyThuatId,
                    GhiChu = kyThuatEntity.GhiChu,
                    GoiDichVuId = goiDv.Id,
                    MaDV = kyThuatEntity.DichVuKyThuat.Ma,
                    TenDV = kyThuatEntity.DichVuKyThuat.Ten,
                    DonGia = kyThuatEntity.DichVuKyThuat.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)) != null ?
                             kyThuatEntity.DichVuKyThuat.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= DateTime.Now) && (o.DenNgay == null || o.DenNgay >= DateTime.Now)).Gia
                             : 0,
                    LoaiDichVu = LoaiNhomDichVuEnum.YeuCauDichVuKyThuat // dv kt
                };
                goiDvMarketingViewModel.GoiDichVuChiTietDichVuKyThuats.Add(kyThuatViewModel);
            }
            #endregion

            return Ok(goiDvMarketingViewModel);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuThuongDungViewModel>> Post([FromBody] NhomDichVuThuongDungViewModel model)
        {
            var obj = model.ToEntity<GoiDichVu>();
            await _nhomDichVuThuongDungService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<NhomDichVuThuongDungViewModel>> Put([FromBody] NhomDichVuThuongDungViewModel model)
        {
            var obj = await _nhomDichVuThuongDungService.GetByIdAsync(model.Id,
                w => w.Include(e => e.GoiDichVuChiTietDichVuKhamBenhs)
                    .Include(e => e.GoiDichVuChiTietDichVuKyThuats));
             model.ToEntity(obj);
            await _nhomDichVuThuongDungService.UpdateAsync(obj);
            return Ok(obj);

        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _nhomDichVuThuongDungService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _nhomDichVuThuongDungService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookupBoPhan")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupBoPhan([FromBody] LookupQueryInfo queryInfo)
        {
            var datas = Enum.GetValues(typeof(BoPhan)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemTrangThaiSuDungVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o)
            });
            return Ok(models);
        }
        [HttpPost("GetLookupEnumLoaiGoiDichVu")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookupEnumLoaiGoiDichVu([FromBody] LookupQueryInfo queryInfo)
        {
            var datas = Enum.GetValues(typeof(EnumLoaiGoiDichVu)).Cast<Enum>();
            var models = datas.Select(o => new LookupItemTrangThaiSuDungVo
            {
                DisplayName = o.GetDescription(),
                KeyId = Convert.ToInt32(o)
            });
            return Ok(models);
        }
    }
}
