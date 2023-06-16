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
    public class BaoCaoBacSiGiaDinhPhatThuocController : CaminoBaseController
    {
        private IBaoCaoService _baoCaoService;
        private IExcelService _excelService;
        public BaoCaoBacSiGiaDinhPhatThuocController(IBaoCaoService baoCaoService,
            IExcelService excelService)
        {
            _baoCaoService = baoCaoService;
            _excelService = excelService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhPhatThuoc)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] BaoCaoPhatThuocQueryInfo queryInfo)
        {
            var data = await _baoCaoService.GetPhatThuocDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("ExportBaoCaoPhatThuoc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhPhatThuoc)]
        public async Task<ActionResult> ExportBaoCaoPhatThuoc([FromBody] BaoCaoPhatThuocQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            var gridData = await _baoCaoService.GetPhatThuocDataForGridAsync(queryInfo);
            var PhatThuocDatas = gridData.Data.Select(p => (BaoCaoPhatThuocGridVo)p).ToList();
            var excelData = PhatThuocDatas.Map<List<PhatThuocExportExcel>>();

            var lstValueObject = new List<(string, string)>();
            lstValueObject.Add((nameof(PhatThuocExportExcel.MaNguoiBenh), "MÃ BN"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.HoTen), "HỌ TÊN"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.GioiTinhHienThi), "GIỚI TÍNH"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.NgayThangNamSinh), "NGÀY SINH"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.SoDienThoai), "ĐIỆN THOẠI"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.DiaChiDayDu), "ĐỊA CHỈ"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.NgayPhatThuocHienThi), "NGÀY PHÁT SINH"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.TrangThaiHienThi), "TRẠNG THÁI"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.TenThuoc), "TÊN THUỐC"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.SoDangKy), "SỐ ĐĂNG KÝ"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.DonViTinh), "ĐVT"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.SoLuong), "SỐ LƯỢNG"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.DonGia), "ĐƠN GIÁ"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.ThanhTien), "THÀNH TIỀN"));
            lstValueObject.Add((nameof(PhatThuocExportExcel.DoanhThu), "DOANH THU"));

            var bytes = _excelService.ExportManagermentView(excelData, lstValueObject, "BÁO CÁO PHÁT THUỐC", 0);

            HttpContext.Response.Headers.Add("content-disposition", "attachment; filename=BaoCaoPhatThuoc" + DateTime.Now.Year + ".xls");
            Response.ContentType = "application/vnd.ms-excel";

            return new FileContentResult(bytes, "application/vnd.ms-excel");
        }
        [HttpPost("PrintBaoCaoPhatThuoc")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhPhatThuoc)]
        public async Task<ActionResult> PrintBaoCaoPhatThuoc([FromBody] BaoCaoPhatThuocQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            queryInfo.LazyLoadPage = true;
            var gridDataSource = await _baoCaoService.GetPhatThuocDataForGridAsync(queryInfo);
            return Ok(gridDataSource.Data);
        }

    }
}
