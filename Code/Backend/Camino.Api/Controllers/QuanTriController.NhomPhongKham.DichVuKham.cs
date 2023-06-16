using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DuocPhams;
using Camino.Api.Models.QuanTri.NhomPhongKham.DichVuKhams;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhGias;
using Camino.Core.Domain.QuanTris.NhomPhongKhams.DichVuKhamBenhs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomPhongKhams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamDichVuKhamController : CaminoBaseController
    {
        private IDichVuKhamBenhService _dichVuKhamBenhService;
        public QuanTriNhomPhongKhamDichVuKhamController(IDichVuKhamBenhService dichVuKhamBenhService)
        {
            _dichVuKhamBenhService = dichVuKhamBenhService;


        }
        [HttpGet("GetDichVuKhamBenhMacDinh")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuocPhamViewModel>> GetDichVuKhamBenhMacDinh()
        {
            var obj = _dichVuKhamBenhService.GetDichVuKhamBenhMacDinh();
            if (obj == null)
                return NotFound();
            var now = DateTime.Now;
            var result = new DichVuKhamMacDinhViewModel
            {
                Id = obj.Id,
                Ten = obj.Ten,
                Gia = obj.DichVuKhamBenhGias?.LastOrDefault(o => (o.TuNgay <= now) && (o.DenNgay == null || o.DenNgay >= now))?.Gia ?? 0

            };
            return Ok(result);
        }
        [HttpPost("CapNhatGia")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> CapNhatGia([FromBody] DichVuKhamGiaViewModel model)
        {
            DichVuKhamBenh obj;
            if (model.DichVuKhamId == null)
            {
                obj = _dichVuKhamBenhService.GetDichVuKhamBenhMacDinh();
            }
            else
            {
                obj = _dichVuKhamBenhService.GetById((long)model.DichVuKhamId, o => o.Include(p => p.DichVuKhamBenhGias));
            }
            if (obj == null)
                return NotFound();
            var now = DateTime.Now;
            var giaLast = obj.DichVuKhamBenhGias.LastOrDefault(o => (o.TuNgay <= now) && (o.DenNgay == null || o.DenNgay >= now));
            if (giaLast == null)
            {
                obj.DichVuKhamBenhGias.Add(new DichVuKhamBenhGia
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
                        obj.DichVuKhamBenhGias.Add(new DichVuKhamBenhGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = now
                        });
                    }
                    else
                    {
                        giaLast.DenNgay = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);
                        obj.DichVuKhamBenhGias.Add(new DichVuKhamBenhGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = ((DateTime)model.TuNgay).Date
                        });

                    }
                }
            }

            await _dichVuKhamBenhService.UpdateAsync(obj);



            return Ok(obj);
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DichVuKhamQueryInfo queryInfo)
        {
            var data = await _dichVuKhamBenhService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("GetDataChildForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataChildForGridAsync([FromBody] DichVuKhamQueryInfo queryInfo)
        {
            var data = await _dichVuKhamBenhService.GetDataChildForGridAsync(queryInfo);
            return Ok(data);
        }


        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKhamViewModel>> Get(long id)
        {
            var data = await _dichVuKhamBenhService.GetByIdAsync(id, s => s.Include(d => d.DichVuKhamBenhGias));
            var result = data.Map<DichVuKhamViewModel>();
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
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKhamViewModel>> Post([FromBody] DichVuKhamViewModel model)
        {
            var obj = model.ToEntity<DichVuKhamBenh>();
            await _dichVuKhamBenhService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DichVuKhamViewModel>> Put([FromBody] DichVuKhamViewModel model)
        {
            var obj = await _dichVuKhamBenhService.GetByIdAsync(model.Id, s => s.Include(d => d.DichVuKhamBenhGias));
            var result = model.ToEntity(obj);
            await _dichVuKhamBenhService.UpdateAsync(result);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _dichVuKhamBenhService.GetByIdAsync(id, s => s.Include(d => d.DichVuKhamBenhGias));
            if (model == null)
                return NoContent();
            await _dichVuKhamBenhService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("KichHoatHieuLuc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamDichVuKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> KichHoatHieuLuc(long id)
        {
            var entity = await _dichVuKhamBenhService.GetByIdAsync(id);
            entity.HieuLuc = entity.HieuLuc == null ? true : !entity.HieuLuc;
            await _dichVuKhamBenhService.UpdateAsync(entity);
            return NoContent();
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<DuocPhamLookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _dichVuKhamBenhService.GetLookup(queryInfo);
            return Ok(lookup);
        }

    }
}
