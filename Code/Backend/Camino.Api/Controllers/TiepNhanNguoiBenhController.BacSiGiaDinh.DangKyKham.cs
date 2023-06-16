using Camino.Api.Auth;
using Camino.Api.Infrastructure.Mapper;
using Camino.Api.Models;
using Camino.Api.Models.TiepNhanNguoiBenh.BacSiGiaDinh.DangKyKhams;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNguoiBenhs.NguoiBenhs;
using Camino.Core.Domain.TiepNhans;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.Helpers;
using Camino.Services.Localization;
using Camino.Services.QuanTris.NhomPhongKhams;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.KhamBenhs.KhamBenhEnum;

namespace Camino.Api.Controllers
{
    public class TiepNhanNguoiBenhBacSiGiaDinhDangKyKhamController : CaminoBaseController
    {
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        private IDichVuKhamBenhService _dichVuKhamBenhService;
        private IUserAgentHelper _userAgentHelper;
        private ILocalizationService _localizationService;
        public TiepNhanNguoiBenhBacSiGiaDinhDangKyKhamController(IYeuCauTiepNhanService yeuCauTiepNhanService,
            IDichVuKhamBenhService dichVuKhamBenhService, IUserAgentHelper userAgentHelper,
            ILocalizationService localizationService)
        {
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
            _dichVuKhamBenhService = dichVuKhamBenhService;
            _userAgentHelper = userAgentHelper;
            _localizationService = localizationService;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] YeuCauTiepNhanQueryInfo queryInfo)
        {
            var gridDataSource = await _yeuCauTiepNhanService.GetDataForGridAsync(queryInfo);
            return Ok(gridDataSource);
        }

        [HttpGet("{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> Get(long id)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(id, o => o.Include(p => p.NhanVienTiepNhan).ThenInclude(p => p.User).Include(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (obj == null)
                return NotFound();
            var data = obj.Map<DangKyKhamViewModel>();
            return Ok(data);
        }

        [HttpPost("TaoDangKyKham")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> TaoDangKyKham([FromBody] DangKyKhamViewModel dangKyKhamViewModel)
        {
            var obj = dangKyKhamViewModel.ToEntity<YeuCauTiepNhan>();

            if (dangKyKhamViewModel.NguoiBenhId == null)
            {
                var objNguoiBenh = dangKyKhamViewModel.ToEntity<NguoiBenh>();
                objNguoiBenh.MaNguoiBenh = ResourceHelper.CreateMaNguoiBenh();
                obj.NguoiBenh = objNguoiBenh;
            }
            obj.MaYeuCauTiepNhan = ResourceHelper.CreateMaYeuCauTiepNhan();
            obj.NhanVienTiepNhanId = _userAgentHelper.GetCurrentUserId();
            if (dangKyKhamViewModel.LaDangKyHenKham == true)
            {
                obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaDen;
                obj.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                {
                    TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaDen
                });
            }
            else
            {
                obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaThucHien;
                obj.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                {
                    TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaThucHien
                });

            }
            if (dangKyKhamViewModel.LaDangKyHenKham != true)
            {
                obj.ThoiDiemNguoiBenhDen = DateTime.Now;
                obj.NhanVienCapNhatNguoiBenhDenId = _userAgentHelper.GetCurrentUserId();
            }
            var dichVuKhamBenhMacDinh = _dichVuKhamBenhService.GetDichVuKhamBenhMacDinh();
            if (dichVuKhamBenhMacDinh != null)
            {
                var yeuCauKhamBenh = new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenh
                {
                    DichVuKhamBenhId = dichVuKhamBenhMacDinh.Id,
                    MaDichVu = dichVuKhamBenhMacDinh.Ma,
                    TenDichVu = dichVuKhamBenhMacDinh.Ten,
                    SoLuong = 1,
                    Gia = dangKyKhamViewModel.TienKham,
                    TrangThai = Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.DoiKham,
                    NhanVienChiDinhId = _userAgentHelper.GetCurrentUserId(),
                    ThoiDiemChiDinh = DateTime.Now,
                    TrangThaiThanhToan = dangKyKhamViewModel.DangKyVaThuTien == true ? Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan : Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.ChuaThanhToan,
                    LyDoKhamBenh = dangKyKhamViewModel.LyDoTiepNhan
                };
                yeuCauKhamBenh.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                {
                    TrangThai = TrangThaiDichVuKhamEnum.DoiKham
                });
                obj.YeuCauKhamBenhs.Add(yeuCauKhamBenh);
            }
            if (dangKyKhamViewModel.DoChiSoSinhTon == true && dangKyKhamViewModel.ChiSoSinhTonViewModel != null)
            {
                obj.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Add(new YeuCauTiepNhanChiSoSinhTon
                {
                    NhietDo = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhietDo,
                    HuyetApTamThu = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamThu,
                    HuyetApTamTruong = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamTruong,
                    NhipTho = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhipTho,
                    Mach = dangKyKhamViewModel.ChiSoSinhTonViewModel.Mach,
                    ChieuCao = dangKyKhamViewModel.ChiSoSinhTonViewModel.ChieuCao,
                    CanNang = dangKyKhamViewModel.ChiSoSinhTonViewModel.CanNang,
                    Bmi = dangKyKhamViewModel.ChiSoSinhTonViewModel.Bmi,
                    SpO2 = dangKyKhamViewModel.ChiSoSinhTonViewModel.SpO2,
                    NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                    ThoiDiemThucHien = DateTime.Now
                });
            }
            await _yeuCauTiepNhanService.AddAsync(obj);
            ResourceHelper.CreateSoThuTuTiepNhan();

            if (dangKyKhamViewModel.DangKyVaThuTien == true)
            {
                var phieuThu = new Core.Domain.ThuNgans.PhieuThus.PhieuThu
                {
                    TienMat = dangKyKhamViewModel.TienKham,
                    NgayThu = DateTime.Now,
                    NoiDungThu = "Thu tiền công khám",
                    SoPhieu = ResourceHelper.CreateSoPhieuThu(),
                    NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                    NguoiBenhId = obj.NguoiBenhId

                };
                phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                {
                    YeuCauTiepNhanId = obj.Id,
                    YeuCauKhamBenhId = obj.YeuCauKhamBenhs.FirstOrDefault()?.Id,
                    SoTienChi = dangKyKhamViewModel.TienKham,
                    NgayChi = DateTime.Now,
                    NoiDungChi = "Chi tiền công khám",
                    SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                    NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                    NguoiBenhId = obj.NguoiBenhId
                });
                obj.PhieuThus.Add(phieuThu);
            }
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpPost("CapNhatDangKyKham")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> CapNhatDangKyKham([FromBody] DangKyKhamViewModel dangKyKhamViewModel)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(dangKyKhamViewModel.Id, o => o.Include(p => p.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans));
            if (obj == null)
                return NotFound();
            dangKyKhamViewModel.ToEntity(obj);
            if (dangKyKhamViewModel.DoChiSoSinhTon == true && dangKyKhamViewModel.ChiSoSinhTonViewModel != null)
            {
                if (!obj.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Any())
                {
                    obj.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.Add(new YeuCauTiepNhanChiSoSinhTon
                    {
                        NhietDo = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhietDo,
                        HuyetApTamThu = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamThu,
                        HuyetApTamTruong = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamTruong,
                        NhipTho = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhipTho,
                        Mach = dangKyKhamViewModel.ChiSoSinhTonViewModel.Mach,
                        ChieuCao = dangKyKhamViewModel.ChiSoSinhTonViewModel.ChieuCao,
                        CanNang = dangKyKhamViewModel.ChiSoSinhTonViewModel.CanNang,
                        Bmi = dangKyKhamViewModel.ChiSoSinhTonViewModel.Bmi,
                        SpO2 = dangKyKhamViewModel.ChiSoSinhTonViewModel.SpO2,
                        NhanVienThucHienId = _userAgentHelper.GetCurrentUserId(),
                        ThoiDiemThucHien = DateTime.Now
                    });
                }
                else
                {
                    var item = obj.YeuCauTiepNhanChiSoSinhTonYeuCauTiepNhans.LastOrDefault();
                    if (item != null)
                    {
                        item.NhietDo = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhietDo;
                        item.HuyetApTamThu = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamThu;
                        item.HuyetApTamTruong = dangKyKhamViewModel.ChiSoSinhTonViewModel.HuyetApTamTruong;
                        item.NhipTho = dangKyKhamViewModel.ChiSoSinhTonViewModel.NhipTho;
                        item.Mach = dangKyKhamViewModel.ChiSoSinhTonViewModel.Mach;
                        item.ChieuCao = dangKyKhamViewModel.ChiSoSinhTonViewModel.ChieuCao;
                        item.CanNang = dangKyKhamViewModel.ChiSoSinhTonViewModel.CanNang;
                        item.Bmi = dangKyKhamViewModel.ChiSoSinhTonViewModel.Bmi;
                        item.SpO2 = dangKyKhamViewModel.ChiSoSinhTonViewModel.SpO2;
                        item.NhanVienThucHienId = _userAgentHelper.GetCurrentUserId();
                        item.ThoiDiemThucHien = DateTime.Now;
                    }
                }
            }
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            return Ok(obj);
        }
        [HttpGet("LaySoThuTuMoiNhat")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public ActionResult<int> LaySoThuTuMoiNhat()
        {
            var soThuTuMoiNhat = ResourceHelper.GetSoThuTuTiepNhan();
            return Ok(soThuTuMoiNhat);
        }

        [HttpPost("CapNhatTrangThaiDen")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> CapNhatTrangThaiDen([FromBody] BaseViewModel baseViewModel)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(baseViewModel.Id);
            if (obj == null)
                return NotFound();
            obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaThucHien;
            obj.ThoiDiemNguoiBenhDen = DateTime.Now;
            obj.NhanVienCapNhatNguoiBenhDenId = _userAgentHelper.GetCurrentUserId();
            obj.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
            {
                TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.ChuaThucHien,
                GhiChu = "Người bệnh đến"
            });
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            var data = obj.Map<DangKyKhamViewModel>();
            return Ok(data);
        }

        [HttpPost("HuyDangKyKham")]
        [ClaimRequirement(SecurityOperation.Update, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> HuyDangKyKham([FromBody] HuyDangKyKhamViewModel huyDangKyKhamViewModel)
        {
            var obj = await _yeuCauTiepNhanService.GetByIdAsync(huyDangKyKhamViewModel.Id, o => o.Include(p => p.YeuCauKhamBenhs)
            .ThenInclude(p => p.YeuCauKhamBenhDonThuocs).ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets)
            .Include(p => p.YeuCauDichVuKyThuats));
            if (obj == null)
                return NotFound();
            obj.TrangThai = YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.HuyThucHien;
            obj.ThoiDiemHuy = DateTime.Now;
            obj.NhanVienHuyId = _userAgentHelper.GetCurrentUserId();
            obj.LyDoHuy = huyDangKyKhamViewModel.LyDoHuy;
            obj.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
            {
                TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.HuyThucHien,
                GhiChu = "Hủy đăng ký khám"
            });
            if (obj.YeuCauKhamBenhs.Any())
            {
                foreach (var yeuCauKhamBenh in obj.YeuCauKhamBenhs)
                {
                    if (yeuCauKhamBenh.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan)
                    {
                        throw new Exception(_localizationService.GetResource("TiepNhan.HuyDangKyKham.YeuCauKhamBenh.DaThanhToan"));
                    }
                    yeuCauKhamBenh.TrangThai = TrangThaiDichVuKhamEnum.HuyKham;
                    yeuCauKhamBenh.YeuCauKhamBenhLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauKhamBenhs.YeuCauKhamBenhLichSuTrangThai
                    {
                        TrangThai = TrangThaiDichVuKhamEnum.HuyKham,
                        GhiChu = "Hủy đăng ký khám"
                    });
                    if (yeuCauKhamBenh.YeuCauKhamBenhDonThuocs.Any())
                    {
                        foreach (var yeuCauKhamBenhDonThuoc in yeuCauKhamBenh.YeuCauKhamBenhDonThuocs)
                        {
                            if (yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Any())
                            {
                                if (yeuCauKhamBenhDonThuoc.YeuCauKhamBenhDonThuocChiTiets.Any(o => o.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan))
                                {
                                    throw new Exception(_localizationService.GetResource("TiepNhan.HuyDangKyKham.YeuCauDonThuoc.DaThanhToan"));
                                }
                            }
                            yeuCauKhamBenhDonThuoc.TrangThai = TrangThaiDonThuocEnum.HuyXuatThuoc;
                        }
                    }
                }
            }
            if (obj.YeuCauDichVuKyThuats.Any())
            {
                foreach (var yeuCauDichVuKyThuat in obj.YeuCauDichVuKyThuats)
                {
                    if (yeuCauDichVuKyThuat.TrangThaiThanhToan == Core.Domain.ThuNgans.ThuNganEnum.TrangThaiThanhToanEnum.DaThanhToan)
                    {
                        throw new Exception(_localizationService.GetResource("TiepNhan.HuyDangKyKham.YeuCauDichVuKyThuat.DaThanhToan"));
                    }
                    yeuCauDichVuKyThuat.TrangThai = TrangThaiDichVuKyThuatEnum.HuyThucHien;
                    yeuCauDichVuKyThuat.YeuCauDichVuKyThuatLichSuTrangThais.Add(new Core.Domain.KhamBenhs.YeuCauDichVuKyThuats.YeuCauDichVuKyThuatLichSuTrangThai
                    {
                        TrangThai = TrangThaiDichVuKyThuatEnum.HuyThucHien,
                        GhiChu = "Hủy đăng ký khám"
                    });
                }
            }
            await _yeuCauTiepNhanService.UpdateAsync(obj);
            return Ok(obj);
        }
    }
}
