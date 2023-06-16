using Camino.Api.Auth;
using Camino.Core.Domain;
using Camino.Core.Domain.ThuNgans;
using Camino.Services.ThuNgans;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class ThuNganBacSiGiaDinhLichSuThuVienPhiController : CaminoBaseController
    {
        private IThuNganService _thuNganService;
        public ThuNganBacSiGiaDinhLichSuThuVienPhiController(IThuNganService thuNganService)
        {
            _thuNganService = thuNganService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NguoiBenhDaThuQueryInfo queryInfo)
        {
            var gridDataSource = await _thuNganService.GetNguoiBenhDaThuDataForGrid(queryInfo);
            return Ok(gridDataSource);
        }

    }
}
