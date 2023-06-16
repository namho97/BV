using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Core.Configuration;
using Camino.Core.Domain;
using Camino.Core.Domain.KhamBenhs;
using Camino.Core.Domain.KhamBenhs.YeuCauDichVuKyThuats;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.Helpers;
using Camino.Services.KhamBenhs;
using Camino.Services.QuanTris.NhomDuocPhams;
using Camino.Services.QuanTris.NhomPhongKhams;
using Camino.Services.ThuNgans;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Controllers
{
    public class KhamBenhBacSiGiaDinhBacSiKhamController : CaminoBaseController
    {
        private IKhamBenhService _khamBenhService;
        private IUserAgentHelper _userAgentHelper;
        readonly ResourcePathConfig _resourcePathConfig;
        private IDuocPhamService _duocPhamService;
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        private IThuNganService _thuNganService;
        private IDichVuKyThuatService _dichVuKyThuatService;
        public KhamBenhBacSiGiaDinhBacSiKhamController(IKhamBenhService khamBenhService, IUserAgentHelper userAgentHelper,
            ResourcePathConfig resourcePathConfig, IYeuCauTiepNhanService yeuCauTiepNhanService,
            IDuocPhamService duocPhamService, IThuNganService thuNganService, IDichVuKyThuatService dichVuKyThuatService)
        {
            _khamBenhService = khamBenhService;
            _userAgentHelper = userAgentHelper;
            _resourcePathConfig = resourcePathConfig;
            _duocPhamService = duocPhamService;
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
            _thuNganService = thuNganService;
            _dichVuKyThuatService = dichVuKyThuatService;
        }
        [HttpPost("GetHangDoiDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetHangDoiDataForGridAsync([FromBody] HangDoiQueryInfo queryInfo)
        {
            var gridDataSource = await _khamBenhService.GetHangDoiDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }
        #region Chi tiết người bệnh đang khám
        [HttpGet("GetNguoiBenhDangKhamThongTinHanhChinh/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetNguoiBenhDangKhamThongTinHanhChinh(long id)
        {
            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
            o.Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.TinhThanh)
            .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.QuanHuyen)
            .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.PhuongXa)
            .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.KhomAp));
            if (yeuCauKhamBenh == null || yeuCauKhamBenh.YeuCauTiepNhan == null)
                return NotFound();

            var data = yeuCauKhamBenh.YeuCauTiepNhan.Map<ThongTinHanhChinhViewModel>();
            return Ok(data);
        }
        [HttpGet("GetNguoiBenhDangKhamThongTinKhamLamSang/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetNguoiBenhDangKhamThongTinKhamLamSang(long id)
        {

            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
            o.Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinKhamLamSangViewModel>();
            return Ok(data);

        }
        [HttpGet("GetNguoiBenhDangKhamThongTinCanLamSang/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetNguoiBenhDangKhamThongTinCanLamSang(long id)
        {

            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o => o.Include(p => p.YeuCauKhamBenhHinhAnhCanLamSangs));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinCanLamSangViewModel>();
            return Ok(data);

        }
        [HttpGet("GetNguoiBenhDangKhamThongTinChanDoanDieuTri/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetNguoiBenhDangKhamThongTinChanDoanDieuTri(long id)
        {

            var yeuCauKhamBenh = await _khamBenhService.GetByIdAsync(id, o =>
            o.Include(p => p.YeuCauKhamBenhDonThuocs)
            .ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets).ThenInclude(p => p.DuocPham).ThenInclude(p => p.DuocPhamGias)
            .Include(p => p.IcdChinh)
            .Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.YeuCauDichVuKyThuats).ThenInclude(p => p.DichVuKyThuat).ThenInclude(p => p.DichVuKyThuatGias)
            .Include(p => p.BenhVienChuyenDen));
            if (yeuCauKhamBenh == null)
                return NotFound();

            var data = yeuCauKhamBenh.Map<ThongTinChanDoanDieuTriViewModel>();
            return Ok(data);

        }
        [HttpPost("GetNguoiBenhDangKhamThongTinLichSuKham")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<GridDataSource>> GetNguoiBenhDangKhamThongTinLichSuKham([FromBody] QueryInfo queryInfo)
        {
            var gridDataSource = await _khamBenhService.GetLichSuKham1NguoiBenhDataForGridAsync(queryInfo);
            return Ok(gridDataSource);

        }

        [HttpPost("LuuKhamLamSang")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> LuuKhamLamSang([FromBody] ThongTinKhamLamSangViewModel thongTinKhamLamSangViewModel)
        {
            var obj = await _khamBenhService.GetByIdAsync(thongTinKhamLamSangViewModel.Id, o =>
           o.Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (obj == null || obj.YeuCauTiepNhan == null)
                return NotFound();

            thongTinKhamLamSangViewModel.ToEntity(obj);
            if (thongTinKhamLamSangViewModel.HoanThanhKham == true)
            {
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham;
                obj.NhanVienHoanThanhKhamId = _userAgentHelper.GetCurrentUserId();
                obj.ThoiDiemHoanThanh = DateTime.Now;
                obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                {
                    TrangThai = TrangThaiDichVuKhamEnum.DaKham,
                    GhiChu = "Hoàn thành từ bác sĩ khám"
                });
                var thongTinVienPhi = _thuNganService.GetThongTinVienPhi(obj.YeuCauTiepNhanId);
                if (thongTinVienPhi != null && thongTinVienPhi.TongChuaThu <= 0 && obj.YeuCauTiepNhan != null)
                {
                    obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien;
                    obj.YeuCauTiepNhan.ThoiDiemHoanThanh = DateTime.Now;
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien,
                        GhiChu = "Hoàn thành từ bác sĩ khám"
                    });
                }
            }
            else
            {
                if (obj.TrangThai != KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham)
                {
                    obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                    {
                        TrangThai = TrangThaiDichVuKhamEnum.DangKham
                    });
                }
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham;
                if (obj.YeuCauTiepNhan.TrangThai != YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien)
                {
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien
                    });
                }
                obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
            }

            if (thongTinKhamLamSangViewModel.ChiSoSinhTon != null && obj.YeuCauTiepNhan != null)
            {
                if (!obj.YeuCauTiepNhan.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Any())
                {
                    obj.YeuCauTiepNhan.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Add(new YeuCauTiepNhanChiSoSinhTon
                    {
                        NhietDo = thongTinKhamLamSangViewModel.ChiSoSinhTon.NhietDo,
                        HuyetApTamThu = thongTinKhamLamSangViewModel.ChiSoSinhTon.HuyetApTamThu,
                        HuyetApTamTruong = thongTinKhamLamSangViewModel.ChiSoSinhTon.HuyetApTamTruong,
                        NhipTho = thongTinKhamLamSangViewModel.ChiSoSinhTon.NhipTho,
                        Mach = thongTinKhamLamSangViewModel.ChiSoSinhTon.Mach,
                        ChieuCao = thongTinKhamLamSangViewModel.ChiSoSinhTon.ChieuCao,
                        CanNang = thongTinKhamLamSangViewModel.ChiSoSinhTon.CanNang,
                        Bmi = thongTinKhamLamSangViewModel.ChiSoSinhTon.Bmi,
                        SpO2 = thongTinKhamLamSangViewModel.ChiSoSinhTon.SpO2,
                        NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                        ThoiDiemThucHien = DateTime.Now
                    });
                }
                else
                {
                    var item = obj.YeuCauTiepNhan.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.LastOrDefault();
                    if (item != null)
                    {
                        item.NhietDo = thongTinKhamLamSangViewModel.ChiSoSinhTon.NhietDo;
                        item.HuyetApTamThu = thongTinKhamLamSangViewModel.ChiSoSinhTon.HuyetApTamThu;
                        item.HuyetApTamTruong = thongTinKhamLamSangViewModel.ChiSoSinhTon.HuyetApTamTruong;
                        item.NhipTho = thongTinKhamLamSangViewModel.ChiSoSinhTon.NhipTho;
                        item.Mach = thongTinKhamLamSangViewModel.ChiSoSinhTon.Mach;
                        item.ChieuCao = thongTinKhamLamSangViewModel.ChiSoSinhTon.ChieuCao;
                        item.CanNang = thongTinKhamLamSangViewModel.ChiSoSinhTon.CanNang;
                        item.Bmi = thongTinKhamLamSangViewModel.ChiSoSinhTon.Bmi;
                        item.SpO2 = thongTinKhamLamSangViewModel.ChiSoSinhTon.SpO2;
                        item.NhanVienThucHienId = _userAgentHelper.GetCurrentUserId();
                        item.ThoiDiemThucHien = DateTime.Now;
                    }
                }
            }
            await _khamBenhService.UpdateAsync(obj);
            return Ok(thongTinKhamLamSangViewModel);
        }
        [HttpPost("LuuCanLamSang")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> LuuCanLamSang([FromBody] ThongTinCanLamSangViewModel thongTinCanLamSangViewModel)
        {
            var obj = await _khamBenhService.GetByIdAsync(thongTinCanLamSangViewModel.Id, o => o.Include(p => p.YeuCauKhamBenhHinhAnhCanLamSangs).Include(p => p.YeuCauTiepNhan));
            if (obj == null || obj.YeuCauTiepNhan == null)
                return NotFound();

            thongTinCanLamSangViewModel.ToEntity(obj);

            if (thongTinCanLamSangViewModel.HoanThanhKham == true)
            {
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham;
                obj.NhanVienHoanThanhKhamId = _userAgentHelper.GetCurrentUserId();
                obj.ThoiDiemHoanThanh = DateTime.Now;
                obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                {
                    TrangThai = TrangThaiDichVuKhamEnum.DaKham,
                    GhiChu = "Hoàn thành từ bác sĩ khám"
                });
                var thongTinVienPhi = _thuNganService.GetThongTinVienPhi(obj.YeuCauTiepNhanId);
                if (thongTinVienPhi != null && thongTinVienPhi.TongChuaThu <= 0 && obj.YeuCauTiepNhan != null)
                {
                    obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien;
                    obj.YeuCauTiepNhan.ThoiDiemHoanThanh = DateTime.Now;
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien,
                        GhiChu = "Hoàn thành từ bác sĩ khám"
                    });
                }
            }
            else
            {
                if (obj.TrangThai != KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham)
                {
                    obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                    {
                        TrangThai = TrangThaiDichVuKhamEnum.DangKham
                    });
                }
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham;
                if (obj.YeuCauTiepNhan.TrangThai != YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien)
                {
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien
                    });
                }
                obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
            }
            if (obj.YeuCauKhamBenhHinhAnhCanLamSangs != null && obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any())
            {
                foreach (var item in obj.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.XetNghiem))
                {
                    if (thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem == null ||
                        !thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                        CommonHelper.DeleteFile($"{_resourcePathConfig.SiteFolder}{item.DuongDan}");
                    }
                }
                foreach (var item in obj.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.XQuang))
                {
                    if (thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang == null ||
                        !thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                        CommonHelper.DeleteFile($"{_resourcePathConfig.SiteFolder}{item.DuongDan}");
                    }
                }
                foreach (var item in obj.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.SieuAm))
                {
                    if (thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm == null ||
                        !thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                        CommonHelper.DeleteFile($"{_resourcePathConfig.SiteFolder}{item.DuongDan}");
                    }
                }
                foreach (var item in obj.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.DienTim))
                {
                    if (thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim == null ||
                        !thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                        CommonHelper.DeleteFile($"{_resourcePathConfig.SiteFolder}{item.DuongDan}");
                    }
                }
                foreach (var item in obj.YeuCauKhamBenhHinhAnhCanLamSangs.Where(o => o.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.ThuThuatKhac))
                {
                    if (thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac == null ||
                        !thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                        CommonHelper.DeleteFile($"{_resourcePathConfig.SiteFolder}{item.DuongDan}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem != null && thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem.
                        Where(o => o.Id == 0 || !obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any(p => p.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.XetNghiem && p.Id == o.Id)))
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.XetNghiem,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang != null && thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang.
                        Where(o => o.Id == 0 || !obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any(p => p.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.XQuang && p.Id == o.Id)))
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.XQuang,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm != null && thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm.
                        Where(o => o.Id == 0 || !obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any(p => p.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.SieuAm && p.Id == o.Id)))
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.SieuAm,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim != null && thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim.
                        Where(o => o.Id == 0 || !obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any(p => p.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.DienTim && p.Id == o.Id)))
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.DienTim,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac != null && thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac.
                        Where(o => o.Id == 0 || !obj.YeuCauKhamBenhHinhAnhCanLamSangs.Any(p => p.LoaiKetQua == KhamBenhEnum.LoaiKetQuaEnum.ThuThuatKhac && p.Id == o.Id)))
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.ThuThuatKhac,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
            }
            else
            {
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem != null && thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaXetNghiem)
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.XetNghiem,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang != null && thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaXQuang)
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.XQuang,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm != null && thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaSieuAm)
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.SieuAm,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim != null && thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaDienTim)
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.DienTim,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }
                if (thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac != null && thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac.Any())
                {
                    foreach (var item in thongTinCanLamSangViewModel.TaiLieuKetQuaThuThuatKhac)
                    {
                        obj.YeuCauKhamBenhHinhAnhCanLamSangs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhHinhAnhCanLamSangs.YeuCauKhamBenhHinhAnhCanLamSang
                        {
                            LoaiKetQua = KhamBenhEnum.LoaiKetQuaEnum.ThuThuatKhac,
                            Ten = item.Ten,
                            TenGuid = item.TenGuid,
                            DuongDan = $"{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}",
                            LoaiTapTin = item.LoaiTapTin,
                            KichThuoc = item.KichThuoc
                        });
                        CommonHelper.MoveFile($"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.FileTempFolder}\\{item.TenGuid}", $"{_resourcePathConfig.SiteFolder}{_resourcePathConfig.CanLamSangFolder}\\{item.TenGuid}");
                    }
                }

            }
            await _khamBenhService.UpdateAsync(obj);
            var data = obj.Map<ThongTinCanLamSangViewModel>();
            return Ok(data);
        }
        [HttpPost("LuuChanDoanDieuTri")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> LuuChanDoanDieuTri([FromBody] ThongTinChanDoanDieuTriViewModel thongTinChanDoanDieuTriViewModel)
        {
            var obj = await _khamBenhService.GetByIdAsync(thongTinChanDoanDieuTriViewModel.Id, o =>
            o.Include(p => p.YeuCauKhamBenhDonThuocs).ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets)
            .Include(p => p.BenhVienChuyenDen).Include(p => p.IcdChinh).Include(p => p.YeuCauTiepNhan).ThenInclude(p => p.YeuCauDichVuKyThuats));
            if (obj == null || obj.YeuCauTiepNhan == null)
                return NotFound();

            thongTinChanDoanDieuTriViewModel.ToEntity(obj);


            if (thongTinChanDoanDieuTriViewModel.HoanThanhKham == true)
            {
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham;
                obj.NhanVienHoanThanhKhamId = _userAgentHelper.GetCurrentUserId();
                obj.ThoiDiemHoanThanh = DateTime.Now;
                obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                {
                    TrangThai = TrangThaiDichVuKhamEnum.DaKham,
                    GhiChu = "Hoàn thành từ bác sĩ khám"
                });
                var thongTinVienPhi = _thuNganService.GetThongTinVienPhi(obj.YeuCauTiepNhanId);
                if (thongTinVienPhi != null && thongTinVienPhi.TongChuaThu <= 0 && obj.YeuCauTiepNhan != null)
                {
                    obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien;
                    obj.YeuCauTiepNhan.ThoiDiemHoanThanh = DateTime.Now;
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien,
                        GhiChu = "Hoàn thành từ bác sĩ khám"
                    });
                }
            }
            else
            {
                if (obj.TrangThai != KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham)
                {
                    obj.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                    {
                        TrangThai = TrangThaiDichVuKhamEnum.DangKham
                    });
                }
                obj.TrangThai = KhamBenhEnum.TrangThaiDichVuKhamEnum.DangKham;
                if (obj.YeuCauTiepNhan.TrangThai != YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien)
                {
                    obj.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                    {
                        TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien
                    });
                }
                obj.YeuCauTiepNhan.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
            }
            var yeuCauKhamBenhDonThuoc = obj.YeuCauKhamBenhDonThuocs.Where(o => o.TrangThai != KhamBenhEnum.TrangThaiDonThuocEnum.HuyXuatThuoc).FirstOrDefault();
            if (yeuCauKhamBenhDonThuoc != null)
            {
                foreach (var item in yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets)
                {
                    if (thongTinChanDoanDieuTriViewModel.ToaThuocs == null ||
                        !thongTinChanDoanDieuTriViewModel.ToaThuocs.Any(o => o.Id == item.Id))
                    {
                        item.WillDelete = true;
                    }
                }
                if (thongTinChanDoanDieuTriViewModel.ToaThuocs != null && thongTinChanDoanDieuTriViewModel.ToaThuocs.Any())
                {
                    foreach (var item in thongTinChanDoanDieuTriViewModel.ToaThuocs.
                        Where(o => o.Id == 0 || !yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Any(p => p.Id == o.Id)))
                    {
                        var duocPham = await _duocPhamService.GetByIdAsync((long)item.DuocPhamId, o => o.Include(p => p.DuocPhamGias));
                        if (duocPham != null)
                        {
                            yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets.YeuCauKhamBenhDonThuocChiTiet
                            {
                                SoThuTu = item.SoThuTu,
                                DuocPhamId = (long)item.DuocPhamId,
                                Ten = duocPham.Ten,
                                Ma = duocPham.Ma,
                                Gia = item.Gia ?? 0,
                                TenTiengAnh = duocPham.TenTiengAnh,
                                SoDangKy = duocPham.SoDangKy,
                                NhaSanXuatId = duocPham.NhaSanXuatId,
                                NuocSanXuatId = duocPham.NuocSanXuatId,
                                QuyCach = duocPham.QuyCach,
                                TieuChuan = duocPham.TieuChuan,
                                HoatChat = item.HoatChat,
                                HamLuong = item.HamLuong,
                                DonViTinh = item.DonViTinh,
                                DuongDung = item.DuongDung,
                                SoLuong = (decimal)item.SoLuong,
                                GhiChu = item.CachDung,
                                SoNgayDung = item.SoNgayDung,
                                SoLuongSang = item.SoLuongSang,
                                SoLuongTrua = item.SoLuongTrua,
                                SoLuongChieu = item.SoLuongChieu,
                                SoLuongToi = item.SoLuongToi,
                                TrangThaiThanhToan = Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan
                            });
                        }
                    }
                    foreach (var item in yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Where(o => thongTinChanDoanDieuTriViewModel.ToaThuocs.Any(p => p.Id > 0 && p.Id == o.Id)))
                    {
                        var thuocViewModel = thongTinChanDoanDieuTriViewModel.ToaThuocs.FirstOrDefault(o => o.Id == item.Id);
                        if (thuocViewModel != null)
                        {
                            var duocPham = await _duocPhamService.GetByIdAsync((long)thuocViewModel.DuocPhamId, o => o.Include(p => p.DuocPhamGias));
                            if (duocPham != null)
                            {
                                item.SoThuTu = thuocViewModel.SoThuTu;
                                item.DuocPhamId = (long)thuocViewModel.DuocPhamId;
                                item.Ten = duocPham.Ten;
                                item.Ma = duocPham.Ma;
                                item.Gia = thuocViewModel.Gia ?? 0;
                                item.TenTiengAnh = duocPham.TenTiengAnh;
                                item.SoDangKy = duocPham.SoDangKy;
                                item.NhaSanXuatId = duocPham.NhaSanXuatId;
                                item.NuocSanXuatId = duocPham.NuocSanXuatId;
                                item.QuyCach = duocPham.QuyCach;
                                item.TieuChuan = duocPham.TieuChuan;
                                item.HoatChat = thuocViewModel.HoatChat;
                                item.HamLuong = thuocViewModel.HamLuong;
                                item.DonViTinh = thuocViewModel.DonViTinh;
                                item.DuongDung = thuocViewModel.DuongDung;
                                item.SoLuong = (decimal)thuocViewModel.SoLuong;
                                item.GhiChu = thuocViewModel.CachDung;
                                item.SoNgayDung = thuocViewModel.SoNgayDung;
                                item.SoLuongSang = thuocViewModel.SoLuongSang;
                                item.SoLuongTrua = thuocViewModel.SoLuongTrua;
                                item.SoLuongChieu = thuocViewModel.SoLuongChieu;
                                item.SoLuongToi = thuocViewModel.SoLuongToi;
                            }
                        }
                    }
                }
            }
            else
            {
                obj.YeuCauKhamBenhDonThuocs.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocs.YeuCauKhamBenhDonThuoc
                {
                    ToaThuocMauId = thongTinChanDoanDieuTriViewModel.ToaThuocMauId,
                    LoaiDonThuoc = LoaiDonThuocEnum.KhongBhyt,
                    BacSiKeDonId = _userAgentHelper.GetCurrentUserId(),
                    ThoiDiemKeDon = DateTime.Now,
                    TrangThai = TrangThaiDonThuocEnum.ChuaXuatThuoc
                });
                yeuCauKhamBenhDonThuoc = obj.YeuCauKhamBenhDonThuocs.Where(o => o.TrangThai != KhamBenhEnum.TrangThaiDonThuocEnum.HuyXuatThuoc).FirstOrDefault();
                if (thongTinChanDoanDieuTriViewModel.ToaThuocs != null && thongTinChanDoanDieuTriViewModel.ToaThuocs.Any())
                {
                    foreach (var item in thongTinChanDoanDieuTriViewModel.ToaThuocs)
                    {

                        var duocPham = await _duocPhamService.GetByIdAsync((long)item.DuocPhamId, o => o.Include(p => p.DuocPhamGias));
                        if (duocPham != null)
                        {
                            yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhDonThuocChiTiets.YeuCauKhamBenhDonThuocChiTiet
                            {
                                SoThuTu = item.SoThuTu,
                                DuocPhamId = (long)item.DuocPhamId,
                                Ten = duocPham.Ten,
                                Ma = duocPham.Ma,
                                Gia = item.Gia ?? 0,
                                TenTiengAnh = duocPham.TenTiengAnh,
                                SoDangKy = duocPham.SoDangKy,
                                NhaSanXuatId = duocPham.NhaSanXuatId,
                                NuocSanXuatId = duocPham.NuocSanXuatId,
                                QuyCach = duocPham.QuyCach,
                                TieuChuan = duocPham.TieuChuan,
                                HoatChat = item.HoatChat,
                                HamLuong = item.HamLuong,
                                DonViTinh = item.DonViTinh,
                                DuongDung = item.DuongDung,
                                SoLuong = (decimal)item.SoLuong,
                                GhiChu = item.CachDung,
                                SoNgayDung = item.SoNgayDung,
                                SoLuongSang = item.SoLuongSang,
                                SoLuongTrua = item.SoLuongTrua,
                                SoLuongChieu = item.SoLuongChieu,
                                SoLuongToi = item.SoLuongToi,
                                TrangThaiThanhToan = Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan
                            });
                        }
                    }
                }

            }
            if (yeuCauKhamBenhDonThuoc != null && !yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Any())
            {
                obj.YeuCauKhamBenhDonThuocs.Remove(yeuCauKhamBenhDonThuoc);
            }



            if (thongTinChanDoanDieuTriViewModel.ThucHienThemDichVuTinhPhi == true && thongTinChanDoanDieuTriViewModel.DichVuKyThuatKhacs != null
                && thongTinChanDoanDieuTriViewModel.DichVuKyThuatKhacs.Any())
            {
                foreach (var item in thongTinChanDoanDieuTriViewModel.DichVuKyThuatKhacs.Where(o => o.Id > 0))
                {
                    var yeuCauDichVuKyThuat = obj.YeuCauTiepNhan?.YeuCauDichVuKyThuats.FirstOrDefault(o => o.Id == item.Id);
                    if (yeuCauDichVuKyThuat == null)
                    {
                        //Kiểm tra tên DV nếu có thì dùng mã dv này, nếu ko thì tạo mới dv
                        var dichVuKyThuat = _dichVuKyThuatService.GetDichVuKyThuatByTen(item.TenDichVuKhac);
                        if (dichVuKyThuat == null)
                        {
                            dichVuKyThuat = new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats.DichVuKyThuat
                            {
                                Ten = item.TenDichVuKhac,
                                HieuLuc = true
                            };
                            dichVuKyThuat.DichVuKyThuatGias.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias.DichVuKyThuatGia
                            {
                                Gia = (decimal)item.DonGiaDichVuKhac,
                                TuNgay = DateTime.Now
                            });
                            _dichVuKyThuatService.Add(dichVuKyThuat);
                        }
                        obj.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Add(new YeuCauDichVuKyThuat
                        {
                            DichVuKyThuatId = dichVuKyThuat.Id,
                            MaDichVu = dichVuKyThuat.Ma,
                            TenDichVu = item.TenDichVuKhac,
                            Gia = item.DonGiaDichVuKhac,
                            TrangThai = TrangThaiDichVuKyThuatEnum.DaThucHien,
                            NhanVienChiDinhId = _userAgentHelper.GetCurrentUserId(),
                            ThoiDiemChiDinh = DateTime.Now,
                            NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                            ThoiDiemThucHien = DateTime.Now,
                            TrangThaiThanhToan = Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan,
                            SoLuong = item.SoLuongDichVuKhac
                        });
                    }
                    else
                    {
                        yeuCauDichVuKyThuat.TenDichVu = item.TenDichVuKhac;
                        yeuCauDichVuKyThuat.SoLuong = item.SoLuongDichVuKhac;
                        yeuCauDichVuKyThuat.Gia = item.DonGiaDichVuKhac;
                    }
                }
                foreach (var item in thongTinChanDoanDieuTriViewModel.DichVuKyThuatKhacs.Where(o => o.Id == 0))
                {

                    //Kiểm tra tên DV nếu có thì dùng mã dv này, nếu ko thì tạo mới dv
                    var dichVuKyThuat = _dichVuKyThuatService.GetDichVuKyThuatByTen(item.TenDichVuKhac);
                    if (dichVuKyThuat == null)
                    {
                        dichVuKyThuat = new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuats.DichVuKyThuat
                        {
                            Ten = item.TenDichVuKhac,
                            HieuLuc = true
                        };
                        dichVuKyThuat.DichVuKyThuatGias.Add(new Core.Domain.QuanTris.NhomPhongKhams.DichVuKyThuatGias.DichVuKyThuatGia
                        {
                            Gia = (decimal)item.DonGiaDichVuKhac,
                            TuNgay = DateTime.Now
                        });
                        _dichVuKyThuatService.Add(dichVuKyThuat);
                    }
                    obj.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Add(new YeuCauDichVuKyThuat
                    {
                        DichVuKyThuatId = dichVuKyThuat.Id,
                        MaDichVu = dichVuKyThuat.Ma,
                        TenDichVu = item.TenDichVuKhac,
                        Gia = item.DonGiaDichVuKhac,
                        TrangThai = TrangThaiDichVuKyThuatEnum.DaThucHien,
                        NhanVienChiDinhId = _userAgentHelper.GetCurrentUserId(),
                        ThoiDiemChiDinh = DateTime.Now,
                        NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                        ThoiDiemThucHien = DateTime.Now,
                        TrangThaiThanhToan = Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan,
                        SoLuong = item.SoLuongDichVuKhac
                    });
                }
                foreach (var item in obj.YeuCauTiepNhan?.YeuCauDichVuKyThuats.Where(o => o.Id > 0 && o.TrangThaiThanhToan != Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan && !thongTinChanDoanDieuTriViewModel.DichVuKyThuatKhacs.Any(p => p.Id == o.Id)))
                {
                    item.WillDelete = true;
                }
            }
            else
            {
                if (obj.YeuCauTiepNhan != null && obj.YeuCauTiepNhan.YeuCauDichVuKyThuats.All(o => o.TrangThaiThanhToan != Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan))
                {
                    foreach (var item in obj.YeuCauTiepNhan.YeuCauDichVuKyThuats)
                    {
                        item.WillDelete = true;
                    }
                }
            }
            await _khamBenhService.UpdateAsync(obj);
            var data = obj.Map<ThongTinChanDoanDieuTriViewModel>();
            return Ok(data);
        }

        [HttpPost("BenhNhanVangNguoiBenhDangKham")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> BenhNhanVangNguoiBenhDangKham([FromBody] BaseViewModel baseViewModel)
        {

            //var benhNhanTiepTheo = new ThongTinHanhChinhViewModel() { Id = 2, SoThuTu = 2, TinhTrang = "CHỜ KHÁM", MaTiepNhan = "2204050032", MaNguoiBenh = "22052612", HoTen = "TRẦN HOÀI NAM", GioiTinh = LoaiGioiTinh.GioiTinhNu, NamSinh = 1988, ThangSinh = 11, NgaySinh = 5, SoDienThoai = "0856781221", DiaChiDayDu = "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", TiepNhanLuc = DateTime.Now, NgheNghiep = "Công nhân", CanCuocCongDan = "123456789012" };
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(baseViewModel.Id);
            if (obj == null)
                return NotFound();
            obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaDen;
            obj.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
            {
                TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaDen,
                GhiChu = "Người bệnh vắng"
            });
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            return Ok(obj);
        }
        #endregion Chi tiết người bệnh đang khám

        [HttpGet("GetNguoiBenhTiepTheo")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham)]
        public async Task<ActionResult<dynamic>> GetNguoiBenhTiepTheo()
        {
            return Ok(2);
        }

    }
}
