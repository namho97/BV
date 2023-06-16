using Camino.Api.Auth;
using Camino.Core.Domain;
using Camino.Core.Domain.TrangChus;
using Camino.Services.ThuNgans;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class TrangChuBacSiGiaDinhController : CaminoBaseController
    {
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        private IThuNganService _thuNganService;
        public TrangChuBacSiGiaDinhController(IYeuCauTiepNhanService yeuCauTiepNhanService,
            IThuNganService thuNganService)
        {
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
            _thuNganService = thuNganService;

        }
        [HttpPost("GetDataLichHenKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public ActionResult GetDataLichHenKham([FromBody] TrangChuQueryInfo queryInfo)
        {
            var data = _yeuCauTiepNhanService.GetDataLichHenKham(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetDataLichHenKhamTheoNgay")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public async Task<ActionResult<GridDataSource>> GetDataLichHenKhamTheoNgay([FromBody] LichHenKhamTheoNgayQueryInfo queryInfo)
        {
            var gridDataSource = await _yeuCauTiepNhanService.GetDataLichHenKhamTheoNgay(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpPost("GetDataDoanhThuGanDay")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public ActionResult GetDataDoanhThuGanDay([FromBody] TrangChuQueryInfo queryInfo)
        {
            var data = _thuNganService.GetDataDoanhThuGanDay(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetDataDoanhThuTheoNgay")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public async Task<ActionResult<GridDataSource>> GetDataDoanhThuTheoNgay([FromBody] DoanhThuTheoNgayQueryInfo queryInfo)
        {
            var gridDataSource = await _thuNganService.GetDataDoanhThuTheoNgay(queryInfo);
            return Ok(gridDataSource);
        }

        [HttpPost("GetDataTinhTrangKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public ActionResult GetDataTinhTrangKham([FromBody] TrangChuQueryInfo queryInfo)
        {
            var data = _yeuCauTiepNhanService.GetDataTinhTrangKham(queryInfo);
            return Ok(data);
        }
        [HttpPost("GetDataTinhTrangKhamTheoNgay")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public async Task<ActionResult<GridDataSource>> GetDataTinhTrangKhamTheoNgay([FromBody] TinhTrangKhamNgayQueryInfo queryInfo)
        {
            var gridDataSource = await _yeuCauTiepNhanService.GetDataTinhTrangKhamTheoNgay(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpPost("GetDataChiTietTiepNhan")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TrangChuBacSiGiaDinh)]
        public ActionResult GetDataChiTietTiepNhan([FromBody] TrangChuQueryInfo queryInfo)
        {
            var data = _yeuCauTiepNhanService.GetDataChiTietTiepNhan(queryInfo);
            return Ok(data);
        }
    }
}
