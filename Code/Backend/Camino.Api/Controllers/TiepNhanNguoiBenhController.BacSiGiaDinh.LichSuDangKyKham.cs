using Camino.Api.Auth;
using Camino.Api.Models;
using Camino.Api.Models.TiepNhanNguoiBenh.BacSiGiaDinh.DangKyKhams;
using Camino.Core.Domain;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Controllers
{
    public class TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKhamController : CaminoBaseController
    {
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        public TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKhamController(IYeuCauTiepNhanService yeuCauTiepNhanService)
        {
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] YeuCauTiepNhanQueryInfo queryInfo)
        {
            var gridDataSource = await _yeuCauTiepNhanService.GetLichSuDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham)]
        public async Task<ActionResult<dynamic>> Get(long id)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(id, o => o.Include(p => p.NhanVienTiepNhan).ThenInclude(p => p.User).Include(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (obj == null)
                return NotFound();
            var data = obj.Map<DangKyKhamViewModel>();
            return Ok(data);
        }

        [HttpPost("MoKhamLaiLichSuDangKyKhamChiTiet")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham)]
        public async Task<ActionResult<dynamic>> MoKhamLaiLichSuDangKyKhamChiTiet([FromBody] BaseViewModel baseViewModel)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(baseViewModel.Id, o => o.Include(p => p.YeuCauKhamBenhs));
            if (obj == null) return NotFound();
            obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
            if (obj.YeuCauKhamBenhs.Any())
            {
                foreach (var yeuCauKhamBenh in obj.YeuCauKhamBenhs)
                {
                    yeuCauKhamBenh.TrangThai = TrangThaiDichVuKhamEnum.DangKham;
                }
            }
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            return Ok(obj);
        }

    }
}
