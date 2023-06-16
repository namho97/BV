using Camino.Api.Auth;
using Camino.Core.Domain;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class QuanTriNhomPhongKhamLyDoTiepNhanController : CaminoBaseController
    {
        [HttpPost("SaveDataFromAutocomplete")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.QuanTriNhomPhongKhamLyDoTiepNhan, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> SaveDataFromAutocomplete([FromBody] SaveAutocompleteVo saveAutocompleteVo)
        {
            return Ok(true);
        }

        [HttpPost("GetLookup")]
        public async Task<ActionResult<ICollection<LookupItemVo>>> GetLookup([FromBody] LookupQueryInfo queryInfo)
        {
            //var lookup = await _lyDoTiepNhanService.GetLookup(queryInfo);
            var lookup = new List<LookupItemVo>() {
                new LookupItemVo{ KeyId=1,DisplayName="Đau bụng"},
                new LookupItemVo{ KeyId=1,DisplayName="Nhức đầu"},
                new LookupItemVo{ KeyId=1,DisplayName="Ho"},
                new LookupItemVo{ KeyId=1,DisplayName="Sốt"},
                new LookupItemVo{ KeyId=1,DisplayName="Dị ứng"}
            };
            return Ok(lookup);
        }
    }
}
