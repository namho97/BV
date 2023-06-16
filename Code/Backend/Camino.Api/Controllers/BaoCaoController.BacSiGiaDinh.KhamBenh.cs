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
    public class BaoCaoBacSiGiaDinhKhamBenhController : CaminoBaseController
    {
        private IBaoCaoService _baoCaoService;
        private IExcelService _excelService;
        public BaoCaoBacSiGiaDinhKhamBenhController(IBaoCaoService baoCaoService,
            IExcelService excelService)
        {
            _baoCaoService = baoCaoService;
            _excelService = excelService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhKhamBenh)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] BaoCaoKhamBenhQueryInfo queryInfo)
        {
            var data = await _baoCaoService.GetKhamBenhDataForGridAsync(queryInfo);
            return Ok(data);
        }

        [HttpPost("ExportBaoCaoKhamBenh")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhKhamBenh)]
        public async Task<ActionResult> ExportBaoCaoKhamBenh([FromBody] BaoCaoKhamBenhQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            var gridData = await _baoCaoService.GetKhamBenhDataForGridAsync(queryInfo);
            var KhamBenhDatas = gridData.Data.Select(p => (BaoCaoKhamBenhGridVo)p).ToList();
            var excelData = KhamBenhDatas.Map<List<KhamBenhExportExcel>>();

            var lstValueObject = new List<(string, string)>();
            lstValueObject.Add((nameof(KhamBenhExportExcel.MaNguoiBenh), "MÃ BN"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.HoTen), "HỌ TÊN"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.GioiTinhHienThi), "GIỚI TÍNH"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.NgayThangNamSinh), "NGÀY SINH"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.SoDienThoai), "ĐIỆN THOẠI"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.DiaChiDayDu), "ĐỊA CHỈ"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.NgayKhamBenhHienThi), "NGÀY KHÁM"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.TrangThaiHienThi), "TRẠNG THÁI"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.LyDoKhamBenh), "LÝ DO KHÁM BỆNH"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.TongTrang), "TỔNG TRẠNG"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.TenIcd), "ICD"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.NoiDungChanDoan), "NỘI DUNG CHẨN ĐOÁN"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.CachGiaiQuyetHienThi), "CÁCH GIẢI QUYẾT"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.LoiDan), "LỜI DẶN"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.NgayTaiKhamHienThi), "NGÀY TÁI KHÁM"));
            lstValueObject.Add((nameof(KhamBenhExportExcel.GhiChu), "GHI CHU"));

            var bytes = _excelService.ExportManagermentView(excelData, lstValueObject, "BÁO CÁO KHÁM BỆNH", 0);

            HttpContext.Response.Headers.Add("content-disposition", "attachment; filename=BaoCaoKhamBenh" + DateTime.Now.Year + ".xls");
            Response.ContentType = "application/vnd.ms-excel";

            return new FileContentResult(bytes, "application/vnd.ms-excel");
        }
        [HttpPost("PrintBaoCaoKhamBenh")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.BaoCaoBacSiGiaDinhKhamBenh)]
        public async Task<ActionResult> PrintBaoCaoKhamBenh([FromBody] BaoCaoKhamBenhQueryInfo queryInfo)
        {
            queryInfo.LoadAll = true;
            queryInfo.LazyLoadPage = true;
            var gridDataSource = await _baoCaoService.GetKhamBenhDataForGridAsync(queryInfo);
            return Ok(gridDataSource.Data);
        }

    }
}
