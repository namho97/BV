using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKyThuats;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamDichVuKyThuatController : CaminoBaseController
    {
        private IDichVuKyThuatService _dichVuKyThuatService;
        public QuanTriNhomPhongKhamDichVuKyThuatController(IDichVuKyThuatService dichVuKyThuatService)
        {
            _dichVuKyThuatService = dichVuKyThuatService;
        }

        [HttpPost("GetLookup")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<ICollection<DichVuKyThuatLookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var data = await _dichVuKyThuatService.GetLookup(queryInfo);
            return Ok(data);
        }
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            _dichVuKyThuatService.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats.DichVuKyThuat
            {
                Ten = saveAutocompleteVo.Value,
                HieuLuc = true
            });
            return Ok(true);
        }

        [HttpPost("CapNhatGia")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> CapNhatGia([FromBody] DichVuKyThuatGiaViewModel model)
        {
            var obj = _dichVuKyThuatService.GetDichVuKyThuatByTen(model.Ten);
            if (obj == null)
            {
                obj = new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats.DichVuKyThuat
                {
                    Ten = model.Ten,
                    HieuLuc = true
                };
                _dichVuKyThuatService.Add(obj);
            }

            if (obj == null)
                return NotFound();
            var now = DateTime.Now;
            var giaLast = obj.DichVuKyThuatGias.LastOrDefault(o => (o.TuNgay <= now) && (o.DenNgay == null || o.DenNgay >= now));
            if (giaLast == null)
            {
                obj.DichVuKyThuatGias.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias.DichVuKyThuatGia
                {
                    Gia = (decimal)model.Gia,
                    TuNgay = ((DateTime)model.TuNgay).Date
                });
            }
            else
            {
                if (giaLast.Gia != model.Gia)
                {
                    var d = ((DateTime)model.TuNgay).AddDays(-1);
                    if (giaLast.TuNgay > new DateTime(d.Year, d.Month, d.Day, 23, 59, 59))
                    {
                        if (giaLast.TuNgay > now)
                        {
                            giaLast.DenNgay = giaLast.TuNgay;

                        }
                        else
                        {
                            giaLast.DenNgay = now.AddMinutes(-1);

                        }
                        obj.DichVuKyThuatGias.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias.DichVuKyThuatGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = now
                        });
                    }
                    else
                    {
                        giaLast.DenNgay = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);
                        obj.DichVuKyThuatGias.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias.DichVuKyThuatGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = ((DateTime)model.TuNgay).Date
                        });

                    }
                }
            }

            await _dichVuKyThuatService.UpdateAsync(obj);



            return Ok(obj);
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DichVuKyThuatQueryInfo queryInfo)
        {
            var data = await _dichVuKyThuatService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKyThuatViewModel>> Get(long id)
        {
            var data = await _dichVuKyThuatService.GetByIdAsync(id, s => s.Include(d => d.DichVuKyThuatGias));
            var result = data.Map<DichVuKyThuatViewModel>();
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

            if (result.MacDinh == true)
            {
                result.MacDinhId = 1;
            }
            else if (result.MacDinh == false)
            {
                result.MacDinhId = 2;
            }
            else
            {
                result.MacDinhId = null;
            }
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKyThuatViewModel>> Post([FromBody] DichVuKyThuatViewModel model)
        {
            var obj = model.ToEntity<DichVuKyThuat>();
            await _dichVuKyThuatService.AddAsync(obj);



            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKyThuatViewModel>> Put([FromBody] DichVuKyThuatViewModel model)
        {
            var obj = await _dichVuKyThuatService.GetByIdAsync(model.Id, s => s.Include(d => d.DichVuKyThuatGias));
            var result = model.ToEntity(obj);
            await _dichVuKyThuatService.UpdateAsync(result);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _dichVuKyThuatService.GetByIdAsync(id, s => s.Include(d => d.DichVuKyThuatGias));
            if (model == null)
                return NoContent();
            await _dichVuKyThuatService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _dichVuKyThuatService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _dichVuKyThuatService.UpdateAsync(entity);
            return NoContent();
        }
    }
}
