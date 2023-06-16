using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models.QuanTri.NhomHanhChinh.DonViHanhChinhs;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomHanhChinhs.DonViHanhChinhs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.QuanTris.NhomHanhChinhs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomHanhChinhDonViHanhChinhController : CaminoBaseController
    {
        readonly IDonViHanhChinhService _donViHanhChinhService;
        public QuanTriNhomHanhChinhDonViHanhChinhController(IDonViHanhChinhService donViHanChinhService)
        {
            _donViHanhChinhService = donViHanChinhService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] DonViHanhChinhQueryInfo queryInfo)
        {
            var data = await _donViHanhChinhService.GetDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh)]
        public async Task<ActionResult<DonViHanhChinhViewModel>> Get(long id)
        {
            var data = await _donViHanhChinhService.GetByIdAsync(id, a => a.Include(b => b.TrucThuocDonViHanhChinh)
                                                                            .ThenInclude(b => b.TrucThuocDonViHanhChinh)
                                                                            .ThenInclude(b => b.TrucThuocDonViHanhChinh));
            var result = data.Map<DonViHanhChinhViewModel>();
            if (data.CapHanhChinh == CapHanhChinh.QuanHuyen)
                result.TrucThuocThanhPhoId = data.TrucThuocDonViHanhChinhId;
            if (data.CapHanhChinh == CapHanhChinh.PhuongXa)
            {
                result.TrucThuocQuanHuyenId = data.TrucThuocDonViHanhChinhId;
                result.TrucThuocThanhPhoId = data.TrucThuocDonViHanhChinh?.TrucThuocDonViHanhChinhId;
            }
            if (data.CapHanhChinh == CapHanhChinh.KhomAp)
            {
                result.TrucThuocPhuongXaId = data.TrucThuocDonViHanhChinhId;
                result.TrucThuocQuanHuyenId = data.TrucThuocDonViHanhChinh?.TrucThuocDonViHanhChinhId;
                result.TrucThuocThanhPhoId = data.TrucThuocDonViHanhChinh?.TrucThuocDonViHanhChinh?.TrucThuocDonViHanhChinhId;
            }
            return Ok(result);
        }
        [HttpPost]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh)]
        public async Task<ActionResult<long>> Post([FromBody] DonViHanhChinhViewModel model)
        {
            model.TrucThuocDonViHanhChinhId = model.TrucThuocPhuongXaId.HasValue ? model.TrucThuocPhuongXaId :
                 model.TrucThuocQuanHuyenId.HasValue ? model.TrucThuocQuanHuyenId :
                 model.TrucThuocThanhPhoId.HasValue ? model.TrucThuocThanhPhoId : null;

            var obj = model.ToEntity<DonViHanhChinh>();
            obj.TenDonViHanhChinh = model.Ten;

            await _donViHanhChinhService.AddAsync(obj);
            return Ok(obj);
        }
        [HttpPut]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh)]
        public async Task<ActionResult> Put([FromBody] DonViHanhChinhViewModel model)
        {
            var obj = await _donViHanhChinhService.GetByIdAsync(model.Id);

            model.TrucThuocDonViHanhChinhId = model.TrucThuocPhuongXaId.HasValue ? model.TrucThuocPhuongXaId :
                model.TrucThuocQuanHuyenId.HasValue ? model.TrucThuocQuanHuyenId :
                model.TrucThuocThanhPhoId.HasValue ? model.TrucThuocThanhPhoId : null;

            model.ToEntity(obj);
            obj.TenDonViHanhChinh = model.Ten;
            await _donViHanhChinhService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpDelete("{id}")]
        [ClaimRequirement(SecurityOperation.Delete, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh)]
        public async Task<ActionResult> Delete(int id)
        {
            var model = await _donViHanhChinhService.GetByIdAsync(id);
            if (model == null)
                return NoContent();
            await _donViHanhChinhService.DeleteAsync(model);
            return Ok(true);
        }

        [HttpPost("GetTinhThanhLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetTinhThanhLookup([FromBody] DonViHanhChinhLookupQueryInfo model)
        {
            var lookup = await _donViHanhChinhService.GetTinhThanhLookup(model);
            return Ok(lookup);
        }

        [HttpPost("GetQuanHuyenLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetQuanHuyenLookup([FromBody] DonViHanhChinhLookupQueryInfo model)
        {
            var lookup = await _donViHanhChinhService.GetQuanHuyenLookup(model, model != null && model.TinhThanhId != null ? (long)model.TinhThanhId : 0);
            return Ok(lookup);
        }

        [HttpPost("GetPhuongXaLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetPhuongXaLookup([FromBody] DonViHanhChinhLookupQueryInfo model)
        {
            var lookup = await _donViHanhChinhService.GetPhuongXaLookup(model, model != null && model.QuanHuyenId != null ? (long)model.QuanHuyenId : 0, model != null && model.TinhThanhId != null ? (long)model.TinhThanhId : 0);
            return Ok(lookup);
        }

        [HttpPost("GetKhomApLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetKhomApLookup([FromBody] DonViHanhChinhLookupQueryInfo model)
        {
            var lookup = await _donViHanhChinhService.GetKhomApLookup(model, model != null && model.PhuongXaId != null ? (long)model.PhuongXaId : 0, model != null && model.QuanHuyenId != null ? (long)model.QuanHuyenId : 0, model != null && model.TinhThanhId != null ? (long)model.TinhThanhId : 0);
            return Ok(lookup);
        }
    }
}
