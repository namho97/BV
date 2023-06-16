using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomDuocPham.DuocPhams;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomDuocPhams.DuocPhams;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomDuocPhams;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomDuocPhamDuocPhamController : CaminoBaseController
    {

        readonly IDuocPhamService _duocPhamService;
        public QuanTriNhomDuocPhamDuocPhamController(IDuocPhamService duocPhamService)
        {
            _duocPhamService = duocPhamService;
        }

        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DuocPhamQueryInfo queryInfo)
        {
            var data = await _duocPhamService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuocPhamViewModel>> Get(long id)
        {
            var data = await _duocPhamService.GetByIdAsync(id, s => s.Include(d => d.DuocPhamGias).Include(d => d.DonViTinh)
            .Include(d => d.DuongDung).Include(d => d.NhaSanXuat).Include(d => d.NuocSanXuat));
            var result = data.Map<DuocPhamViewModel>();
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
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuocPhamViewModel>> Post([FromBody] DuocPhamViewModel model)
        {
            var obj = model.ToEntity<DuocPham>();
            await _duocPhamService.AddAsync(obj);



            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuocPhamViewModel>> Put([FromBody] DuocPhamViewModel model)
        {
            var obj = await _duocPhamService.GetByIdAsync(model.Id, s => s.Include(d => d.DuocPhamGias));
            var result = model.ToEntity(obj);
            await _duocPhamService.UpdateAsync(result);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _duocPhamService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _duocPhamService.DeleteAsync(model);
            return Ok(true);
        }
        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<DuocPhamLookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            var lookup = await _duocPhamService.GetLookup(queryInfo);
            return Ok(lookup);
        }

        [HttpPost("CapNhatGia")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomDuocPhamDuocPham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<DuocPhamViewModel>> CapNhatGia([FromBody] DuocPhamGiaViewModel model)
        {
            var obj = await _duocPhamService.GetByIdAsync(model.DuocPhamId, o => o.Include(p => p.DuocPhamGias));
            if (obj == null)
                return NotFound();
            var now = DateTime.Now;
            var giaLast = obj.DuocPhamGias.LastOrDefault(o => (o.TuNgay <= now) && (o.DenNgay == null || o.DenNgay >= now));
            if (giaLast == null)
            {
                obj.DuocPhamGias.Add(new DuocPhamGia
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
                        obj.DuocPhamGias.Add(new DuocPhamGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = now
                        });
                    }
                    else
                    {
                        giaLast.DenNgay = new DateTime(d.Year, d.Month, d.Day, 23, 59, 59);
                        obj.DuocPhamGias.Add(new DuocPhamGia
                        {
                            Gia = (decimal)model.Gia,
                            TuNgay = ((DateTime)model.TuNgay).Date
                        });

                    }
                }
            }

            await _duocPhamService.UpdateAsync(obj);



            return Ok(obj);
        }
    }
}
