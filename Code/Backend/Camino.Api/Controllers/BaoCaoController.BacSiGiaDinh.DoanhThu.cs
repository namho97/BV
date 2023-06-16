using Camino.Api.Auth;
using Camino.Api.Models.BaoCao;
using Camino.Core.Domain;
using Camino.Core.Domain.BaoCaos;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.BaoCaos;
using Camino.Services.Exports;
using Microsoft.AspNetCore.Mvc;

namespace Camino.Api.Controllers
{
    public class BaoCaoBacSiGiaDinhDoanhThuController : CaminoBaseController
    {
        private IBaoCaoService _baoCaoService;
        private IExcelService _excelService;
        public BaoCaoBacSiGiaDinhDoanhThuController(IBaoCaoService baoCaoService, IExcelService excelService)
        {
            _baoCaoService = baoCaoService;
            _excelService = excelService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhDoanhThu)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] BaoCaoDoanhThuQueryInfo queryInfo)
        {
            var gridDataSource = await _baoCaoService.GetDoanhThuDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }

        [HttpPost("ExportBaoCaoDoanhThu")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhDoanhThu)]
        public async Task<ActionResult> ExportBaoCaoDoanhThu([FromBody] BaoCaoDoanhThuQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            var gridDataSource = await _baoCaoService.GetDoanhThuDataForGridAsync(queryInfo);
            var data = gridDataSource.Data.Select(p => (BaoCaoDoanhThuGridVo)p).ToList();
            var excelData = data.Map<List<DoanhThuExportExcel>>();

            var lstValueObject = new List<(string, string)>();
            lstValueObject.Add((nameof(DoanhThuExportExcel.NgayPhatSinhHienThi), "NGÀY PHÁT SINH"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.HoTen), "HỌ TÊN"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.TrangThaiThanhToanHienThi), "TRẠNG THÁI THANH TOÁN"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.LoaiDichVuHienThi), "LOẠI DỊCH VỤ"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.TenDichVu), "TÊN DỊCH VỤ"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.DonViTinh), "ĐVT"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.SoLuong), "SỐ LƯỢNG"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.DonGia), "ĐƠN GIÁ"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.ThanhTien), "THÀNH TIỀN"));
            lstValueObject.Add((nameof(DoanhThuExportExcel.DoanhThu), "DOANH THU"));

            var bytes = _excelService.ExportManagermentView(excelData, lstValueObject, "BÁO CÁO DOANH THU", 0);

            HttpContext.Response.Headers.Add("content-disposition", "attachment; filename=BaoCaoDoanhThu" + DateTime.Now.Year + ".xls");
            Response.ContentType = "application/vnd.ms-excel";

            return new FileContentResult(bytes, "application/vnd.ms-excel");
        }

        [HttpPost("PrintBaoCaoDoanhThu")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhDoanhThu)]
        public async Task<ActionResult> PrintBaoCaoDoanhThu([FromBody] BaoCaoDoanhThuQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            queryInfo.LazyLoadPage = true;
            var gridDataSource = await _baoCaoService.GetDoanhThuDataForGridAsync(queryInfo);
            return Ok(gridDataSource.Data);
        }
    }
}
