using Camino.Api.Auth;
using Camino.Api.Models.BaoCao;
using Camino.Core.Domain;
using Camino.Core.Domain.BaoCaos;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.BaoCaos;
using Camino.Services.Exports;
using Microsoft.AspNetCore.Mvc;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Controllers
{
    public class BaoCaoBacSiGiaDinhHenKhamController : CaminoBaseController
    {
        private IBaoCaoService _baoCaoService;
        private IExcelService _excelService;
        public BaoCaoBacSiGiaDinhHenKhamController(IBaoCaoService baoCaoService,
            IExcelService excelService)
        {
            _baoCaoService = baoCaoService;
            _excelService = excelService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhHenKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] BaoCaoHenKhamQueryInfo queryInfo)
        {
            var data = await _baoCaoService.GetHenKhamDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("ExportBaoCaoHenKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhHenKham)]
        public async Task<ActionResult> ExportBaoCaoHenKham([FromBody] BaoCaoHenKhamQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            var gridData = await _baoCaoService.GetHenKhamDataForGridAsync(queryInfo);
            var henKhamDatas = gridData.Data.Select(p => (BaoCaoHenKhamGridVo)p).ToList();
            var excelData = henKhamDatas.Map<List<HenKhamExportExcel>>();

            var lstValueObject = new List<(string, string)>();
            lstValueObject.Add((nameof(HenKhamExportExcel.MaNguoiBenh), "MÃ BN"));
            lstValueObject.Add((nameof(HenKhamExportExcel.HoTen), "HỌ TÊN"));
            lstValueObject.Add((nameof(HenKhamExportExcel.GioiTinhHienThi), "GIỚI TÍNH"));
            lstValueObject.Add((nameof(HenKhamExportExcel.NgayThangNamSinh), "NGÀY SINH"));
            lstValueObject.Add((nameof(HenKhamExportExcel.SoDienThoai), "ĐIỆN THOẠI"));
            lstValueObject.Add((nameof(HenKhamExportExcel.DiaChiDayDu), "ĐỊA CHỈ"));
            lstValueObject.Add((nameof(HenKhamExportExcel.NgayHenKhamHienThi), "NGÀY HẸN"));
            lstValueObject.Add((nameof(HenKhamExportExcel.GioHenKhamHienThi), "GIỜ HẸN"));
            lstValueObject.Add((nameof(HenKhamExportExcel.HinhThucHenHienThi), "HÌNH THỨC HẸN"));
            lstValueObject.Add((nameof(HenKhamExportExcel.TrangThaiHienThi), "TRẠNG THÁI"));

            var bytes = _excelService.ExportManagermentView(excelData, lstValueObject, "BÁO CÁO HẸN KHÁM", 0);

            HttpContext.Response.Headers.Add("content-disposition", "attachment; filename=BaoCaoHenKham" + DateTime.Now.Year + ".xls");
            Response.ContentType = "application/vnd.ms-excel";

            return new FileContentResult(bytes, "application/vnd.ms-excel");
        }
        [HttpPost("PrintBaoCaoHenKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhHenKham)]
        public async Task<ActionResult> PrintBaoCaoHenKham([FromBody] BaoCaoHenKhamQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            queryInfo.LazyLoadPage = true;
            var gridDataSource = await _baoCaoService.GetHenKhamDataForGridAsync(queryInfo);
            return Ok(gridDataSource.Data);
        }

    }
}
