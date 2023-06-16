using Camino.Api.Auth;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Domain;
using Camino.Core.Domain.KhamBenhs;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.KhamBenhs;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Controllers
{
    public class KhamBenhBacSiGiaDinhLichSuBacSiKhamController : CaminoBaseController
    {
        private IKhamBenhService _khamBenhService;
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        public KhamBenhBacSiGiaDinhLichSuBacSiKhamController(IKhamBenhService khamBenhService, IYeuCauTiepNhanService yeuCauTiepNhanService)
        {
            _khamBenhService = khamBenhService;
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] LichSuKhamQueryInfo queryInfo)
        {
            var gridDataSource = await _khamBenhService.GetLichSuDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpGet("GetLichSuKhamChiTietThongTinHanhChinh/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetLichSuKhamChiTietThongTinHanhChinh(long id)
        {
            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
           o.Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.TinhThanh)
           .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.QuanHuyen)
           .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.PhuongXa)
           .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.KhomAp)
           .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.NhanVienHuy).ThenInclude(p => p.User));
            if (yeuCauKhamBenh == null || yeuCauKhamBenh.YeuCauTiepNhan == null)
                return NotFound();

            var data = yeuCauKhamBenh.YeuCauTiepNhan.Map<ThongTinHanhChinhViewModel>();
            return Ok(data);
        }
        [HttpGet("GetLichSuKhamChiTietThongTinKhamLamSang/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetLichSuKhamChiTietThongTinKhamLamSang(long id)
        {

            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
            o.Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinKhamLamSangViewModel>();
            return Ok(data);

        }
        [HttpGet("GetLichSuKhamChiTietThongTinCanLamSang/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetLichSuKhamChiTietThongTinCanLamSang(long id)
        {
            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o => o.Include(p => p.YeuCauKhamBenhHinhAnhCanLamSangs));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinCanLamSangViewModel>();
            return Ok(data);

        }
        [HttpGet("GetLichSuKhamChiTietThongTinChanDoanDieuTri/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetLichSuKhamChiTietThongTinChanDoanDieuTri(long id)
        {
            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
            o.Include(p => p.YeuCauKhamBenhDonThuocs)
            .ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets).ThenInclude(p => p.DuocPham).ThenInclude(p => p.DuocPhamGias)
            .Include(p => p.IcdChinh)
            .Include(p => p.BenhVienChuyenDen));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinChanDoanDieuTriViewModel>();
            return Ok(data);

        }
        [HttpPost("GetLichSuKhamChiTietThongTinLichSuKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham
            , DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetLichSuKhamChiTietThongTinLichSuKham([FromBody] QueryInfo queryInfo)
        {
            var gridDataSource = await _khamBenhService.GetLichSuKham1NguoiBenhDataForGridAsync(queryInfo);
            return Ok(gridDataSource);

        }


        [HttpPost("MoKhamLaiLichSuKhamChiTiet")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham)]
        public async Task<ActionResult<dynamic>> MoKhamLaiLichSuKhamChiTiet([FromBody] MoKhamLaiViewModel moKhamLaiViewModel)
        {

            var yeuCauTiepNhan = await _yeuCauTiepNhanService.GetByIdAsync(moKhamLaiViewModel.Id, o => o.Include(p => p.YeuCauKhamBenhs));
            if (yeuCauTiepNhan == null || yeuCauTiepNhan.YeuCauKhamBenhs == null || !yeuCauTiepNhan.YeuCauKhamBenhs.Any())
                return NotFound();
            yeuCauTiepNhan.TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
            yeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
            {
                TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien,
                GhiChu = "Mở khám lại với lý do: " + moKhamLaiViewModel.LyDo
            });
            foreach (var yeuCauKhamBenh in yeuCauTiepNhan.YeuCauKhamBenhs)
            {
                yeuCauKhamBenh.TrangThai = TrangThaiDichVuKhamEnum.DangKham;
                yeuCauKhamBenh.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                {
                    TrangThai = TrangThaiDichVuKhamEnum.DangKham,
                    GhiChu = "Mở khám lại với lý do: " + moKhamLaiViewModel.LyDo
                });

            }
            await _yeuCauTiepNhanService.UpdateAsync(yeuCauTiepNhan);
            return Ok(true);
        }

    }
}
