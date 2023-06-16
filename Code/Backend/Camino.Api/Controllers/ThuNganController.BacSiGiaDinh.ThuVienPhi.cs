using Camino.Api.Auth;
using Camino.Api.Models.KhamBenh.BacSiGiaDinh.BacSiKhams;
using Camino.Api.Models.ThuNgan.BacSiGiaDinh.ThuVienPhis;
using Camino.Core.Domain;
using Camino.Core.Domain.ThuNgans;
using Camino.Core.Helpers;
using Camino.Core.Infrastructure.Mapper;
using Camino.Services.Helpers;
using Camino.Services.ThuNgans;
using Camino.Services.TiepNhans;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Camino.Core.Domain.ThuNgans.ThuNganEnum;

namespace Camino.Api.Controllers
{
    public class ThuNganBacSiGiaDinhThuVienPhiController : CaminoBaseController
    {
        private IThuNganService _thuNganService;
        private IYeuCauTiepNhanService _yeuCauTiepNhanService;
        private IUserAgentHelper _userAgentHelper;
        public ThuNganBacSiGiaDinhThuVienPhiController(IThuNganService thuNganService, IYeuCauTiepNhanService yeuCauTiepNhanService,
             IUserAgentHelper userAgentHelper)
        {
            _thuNganService = thuNganService;
            _yeuCauTiepNhanService = yeuCauTiepNhanService;
            _userAgentHelper = userAgentHelper;
        }
        [HttpPost("GetDataForGridAsync")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi)]
        public async Task<ActionResult<GridDataSource>> GetDataForGridAsync([FromBody] NguoiBenhChuaThuQueryInfo queryInfo)
        {
            var gridDataSource = await _thuNganService.GetNguoiBenhChuaThuDataForGrid(queryInfo);
            return Ok(gridDataSource);
        }
        [HttpGet("GetChiTietVienPhi/{id}")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> GetChiTietVienPhi(long id)
        {
            var thongTinVienPhiVo = _thuNganService.GetThongTinVienPhi(id);
            var yeuCauTiepNhan = _yeuCauTiepNhanService.GetById(id, o => o.Include(p => p.TinhThanh).Include(p => p.QuanHuyen).Include(p => p.PhuongXa).Include(p => p.KhomAp));
            var data = new ThongTinThuVienPhiViewModel()
            {
                Id = id,
                ThongTinHanhChinh = yeuCauTiepNhan.Map<ThongTinHanhChinhViewModel>(),
                TongCong = thongTinVienPhiVo.TongCong,
                TongDaThu = thongTinVienPhiVo.TongDaThu,
                TongChuaThu = thongTinVienPhiVo.TongChuaThu
            };
            return Ok(data);
        }
        [HttpPost("GetDichVuChuaThuDataForGrid")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi)]
        public async Task<ActionResult<GridDataSource>> GetDichVuChuaThuDataForGrid([FromBody] QueryInfo queryInfo)
        {
            var gridDataSource = await _thuNganService.GetDichVuChuaThuDataForGrid(queryInfo.QueryId);
            return Ok(gridDataSource);
        }

        [HttpPost("LuuChiTietVienPhi")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> LuuChiTietVienPhi([FromBody] ThongTinThuVienPhiViewModel dichVuThuVienPhiViewModel)
        {
            return Ok(dichVuThuVienPhiViewModel);
        }

        [HttpPost("ThuTien")]
        [ClaimRequirement(SecurityOperation.Add, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> ThuTien([FromBody] ThuVienPhiViewModel thuVienPhiViewModel)
        {
            var yeuCauTiepNhan = _yeuCauTiepNhanService.GetById(thuVienPhiViewModel.YeuCauTiepNhanId,
                o => o.Include(p => p.YeuCauKhamBenhs).ThenInclude(p => p.YeuCauKhamBenhDonThuocs).ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets)
                .Include(p => p.YeuCauDichVuKyThuats));
            if (yeuCauTiepNhan == null)
                return NotFound();
            var phieuThu = new Core.Domain.ThuNgans.PhieuThus.PhieuThu
            {
                NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                TienMat = thuVienPhiViewModel.TienMat,
                ChuyenKhoan = thuVienPhiViewModel.ChuyenKhoan,
                POS = thuVienPhiViewModel.Pos,
                NgayThu = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                NoiDungThu = thuVienPhiViewModel.NoiDungThu,
                SoPhieu = ResourceHelper.CreateSoPhieuThu(),
                NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()

            };
            if (thuVienPhiViewModel.ThuNhanh == true)
            {
                var yeuCauKhamBenhs = yeuCauTiepNhan.YeuCauKhamBenhs.Where(o => o.TrangThaiThanhToan == TrangThaiThanhToanEnum.ChuaThanhToan);
                if (yeuCauKhamBenhs != null && yeuCauKhamBenhs.Any())
                {
                    foreach (var yeuCauKhamBenh in yeuCauKhamBenhs)
                    {
                        yeuCauKhamBenh.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                        yeuCauKhamBenh.SoTienBenhNhanDaChi = (yeuCauKhamBenh.SoLuong ?? 1) * (yeuCauKhamBenh.Gia ?? 0);
                        phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                        {
                            NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                            YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                            YeuCauKhamBenhId = yeuCauKhamBenh.Id,
                            SoTienChi = (yeuCauKhamBenh.SoLuong ?? 1) * (yeuCauKhamBenh.Gia ?? 0),
                            NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                            NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                            SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                            NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                        });

                    }
                }
                var yeuCauDichVuKyThuats = yeuCauTiepNhan.YeuCauDichVuKyThuats.Where(o => o.TrangThaiThanhToan == TrangThaiThanhToanEnum.ChuaThanhToan);
                if (yeuCauDichVuKyThuats != null && yeuCauDichVuKyThuats.Any())
                {
                    foreach (var yeuCauDichVuKyThuat in yeuCauDichVuKyThuats)
                    {
                        yeuCauDichVuKyThuat.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                        yeuCauDichVuKyThuat.SoTienBenhNhanDaChi = (yeuCauDichVuKyThuat.SoLuong ?? 1) * (yeuCauDichVuKyThuat.Gia ?? 0);
                        phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                        {
                            NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                            YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                            YeuCauDichVuKyThuatId = yeuCauDichVuKyThuat.Id,
                            SoTienChi = (yeuCauDichVuKyThuat.SoLuong ?? 1) * (yeuCauDichVuKyThuat.Gia ?? 0),
                            NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                            NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                            SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                            NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                        });

                    }
                }
                var yeuCauKhamBenhDonThuocChiTiets = yeuCauTiepNhan.YeuCauKhamBenhs.SelectMany(o => o.YeuCauKhamBenhDonThuocs.SelectMany(p => p.YeuCauKhamBenhDonThuocChiTiets.Where(o => o.TrangThaiThanhToan == TrangThaiThanhToanEnum.ChuaThanhToan)));
                if (yeuCauKhamBenhDonThuocChiTiets != null && yeuCauKhamBenhDonThuocChiTiets.Any())
                {
                    foreach (var yeuCauKhamBenhDonThuocChiTiet in yeuCauKhamBenhDonThuocChiTiets)
                    {
                        if (yeuCauKhamBenhDonThuocChiTiet.YeuCauKhamBenhDonThuoc != null)
                        {
                            yeuCauKhamBenhDonThuocChiTiet.YeuCauKhamBenhDonThuoc.TrangThai = Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.DaXuatThuoc;
                        }                        
                        yeuCauKhamBenhDonThuocChiTiet.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                        yeuCauKhamBenhDonThuocChiTiet.SoTienBenhNhanDaChi = yeuCauKhamBenhDonThuocChiTiet.SoLuong * (yeuCauKhamBenhDonThuocChiTiet.Gia ?? 0);
                        phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                        {
                            NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                            YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                            YeuCauKhamBenhDonThuocChiTietId = yeuCauKhamBenhDonThuocChiTiet.Id,
                            SoTienChi = (yeuCauKhamBenhDonThuocChiTiet.SoLuong) * (yeuCauKhamBenhDonThuocChiTiet.Gia ?? 0),
                            NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                            NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                            SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                            NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                        });

                    }
                }

            }
            else
            {
                if (thuVienPhiViewModel.DichVus != null)
                {
                    if (thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauKhamBenh) != null &&
                        thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauKhamBenh).Any())
                    {
                        foreach (var yeuCauKhamBenh in thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauKhamBenh))
                        {
                            phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                            {
                                NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                                YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                                YeuCauKhamBenhId = yeuCauKhamBenh.Id,
                                SoTienChi = yeuCauKhamBenh.ThanhTien,
                                NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                                NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                                SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                                NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                            });
                            var yc = yeuCauTiepNhan.YeuCauKhamBenhs.FirstOrDefault(o => o.Id == yeuCauKhamBenh.Id);
                            if (yc != null)
                            {
                                yc.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                                yc.SoTienBenhNhanDaChi = yeuCauKhamBenh.ThanhTien;
                            }

                        }
                    }
                    if (thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDichVuKyThuat) != null &&
                        thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDichVuKyThuat).Any())
                    {
                        foreach (var yeuCauDichVuKyThuat in thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDichVuKyThuat))
                        {
                            phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                            {
                                NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                                YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                                YeuCauDichVuKyThuatId = yeuCauDichVuKyThuat.Id,
                                SoTienChi = yeuCauDichVuKyThuat.ThanhTien,
                                NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                                NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                                SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                                NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                            });

                            var yc = yeuCauTiepNhan.YeuCauDichVuKyThuats.FirstOrDefault(o => o.Id == yeuCauDichVuKyThuat.Id);
                            if (yc != null)
                            {
                                yc.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                                yc.SoTienBenhNhanDaChi = yeuCauDichVuKyThuat.ThanhTien;
                            }

                        }
                    }
                    if (thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet && o.KhongMua != true) != null &&
                        thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet && o.KhongMua != true).Any())
                    {
                        foreach (var yeuCauKhamBenhDonThuocChiTiet in thuVienPhiViewModel.DichVus.Where(o => o.LoaiNhomDichVu == LoaiNhomDichVuEnum.YeuCauDonThuocChiTiet && o.KhongMua != true))
                        {
                            phieuThu.PhieuChis.Add(new Core.Domain.ThuNgans.PhieuChis.PhieuChi
                            {
                                NguoiBenhId = yeuCauTiepNhan.NguoiBenhId,
                                YeuCauTiepNhanId = thuVienPhiViewModel.YeuCauTiepNhanId,
                                YeuCauKhamBenhDonThuocChiTietId = yeuCauKhamBenhDonThuocChiTiet.Id,
                                SoTienChi = yeuCauKhamBenhDonThuocChiTiet.ThanhTien,
                                NgayChi = thuVienPhiViewModel.NgayThu ?? DateTime.Now,
                                NoiDungChi = thuVienPhiViewModel.NoiDungThu,
                                SoPhieu = ResourceHelper.CreateSoPhieuChi(),
                                NhanVienThucHienId = _userAgentHelper.GetCurrentUserId()
                            });


                            var yc = yeuCauTiepNhan.YeuCauKhamBenhs.SelectMany(o => o.YeuCauKhamBenhDonThuocs.SelectMany(p => p.YeuCauKhamBenhDonThuocChiTiets)).FirstOrDefault(o => o.Id == yeuCauKhamBenhDonThuocChiTiet.Id);
                            if (yc != null)
                            {
                                if (yc.YeuCauKhamBenhDonThuoc != null)
                                {
                                    yc.YeuCauKhamBenhDonThuoc.TrangThai = Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.DaXuatThuoc;
                                }
                                yc.TrangThaiThanhToan = TrangThaiThanhToanEnum.DaThanhToan;
                                yc.SoTienBenhNhanDaChi = yeuCauKhamBenhDonThuocChiTiet.KhongMua == true ? 0 : yeuCauKhamBenhDonThuocChiTiet.ThanhTien;
                                yc.KhongMua = yeuCauKhamBenhDonThuocChiTiet.KhongMua;
                            }
                        }
                    }
                }

            }
            yeuCauTiepNhan.PhieuThus.Add(phieuThu);
            var yeuCauKhamBenhDaHoanThanhTatCa = yeuCauTiepNhan.YeuCauKhamBenhs.All(o => o.TrangThai == Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDichVuKhamEnum.DaKham);
            if (yeuCauKhamBenhDaHoanThanhTatCa)
            {

                yeuCauTiepNhan.TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien;
                yeuCauTiepNhan.ThoiDiemHoanThanh = DateTime.Now;
                yeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                {
                    TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DaThucHien,
                    GhiChu = "Hoàn thành từ thu tiền"
                });
            }
            await _yeuCauTiepNhanService.UpdateAsync(yeuCauTiepNhan);
            return Ok(new { PhieuThu = phieuThu, DaHoanThanh = yeuCauKhamBenhDaHoanThanhTatCa });
        }
        [HttpPost("GetLichSuThuDataForGrid")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<GridDataSource>> GetLichSuThuDataForGrid([FromBody] QueryInfo queryInfo)
        {
            var gridDataSource = await _thuNganService.GetDichVuDaThuDataForGrid(queryInfo.QueryId);
            return Ok(gridDataSource);

        }
        [HttpPost("HuyPhieuThu")]
        [ClaimRequirement(SecurityOperation.View, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham)]
        public async Task<ActionResult<dynamic>> HuyPhieuThu([FromBody] HuyPhieuThuViewModel huyPhieuThuViewModel)
        {
            var phieuThu = await _thuNganService.GetByIdAsync(huyPhieuThuViewModel.Id, o =>
            o.Include(p => p.PhieuChis).ThenInclude(p => p.YeuCauKhamBenh)
            .ThenInclude(p => p.YeuCauKhamBenhDonThuocs).ThenInclude(p => p.YeuCauKhamBenhDonThuocChiTiets)
            .Include(p => p.PhieuChis).ThenInclude(p => p.YeuCauDichVuKyThuat)
            .Include(o => o.YeuCauTiepNhan));
            if (phieuThu == null)
                return NotFound();
            phieuThu.DaHuy = true;
            phieuThu.NgayHuy = DateTime.Now;
            phieuThu.NhanVienHuyId = _userAgentHelper.GetCurrentUserId();
            phieuThu.LyDoHuy = huyPhieuThuViewModel.LyDoHuy;
            if (phieuThu.PhieuChis.Any())
            {
                foreach (var phieuChi in phieuThu.PhieuChis)
                {
                    phieuChi.DaHuy = true;
                    phieuChi.NgayHuy = DateTime.Now;
                    phieuChi.NhanVienHuyId = _userAgentHelper.GetCurrentUserId();
                    phieuChi.LyDoHuy = huyPhieuThuViewModel.LyDoHuy;
                    if (phieuChi.YeuCauKhamBenh != null)
                    {
                        phieuChi.YeuCauKhamBenh.TrangThaiThanhToan = TrangThaiThanhToanEnum.ChuaThanhToan;
                        phieuChi.YeuCauKhamBenh.SoTienBenhNhanDaChi = 0;
                    }
                    if (phieuChi.YeuCauDichVuKyThuat != null)
                    {
                        phieuChi.YeuCauDichVuKyThuat.TrangThaiThanhToan = TrangThaiThanhToanEnum.ChuaThanhToan;
                        phieuChi.YeuCauDichVuKyThuat.SoTienBenhNhanDaChi = 0;
                    }
                    if (phieuChi.YeuCauKhamBenhDonThuocChiTiet != null)
                    {
                        if (phieuChi.YeuCauKhamBenhDonThuocChiTiet.YeuCauKhamBenhDonThuoc != null)
                        {
                            phieuChi.YeuCauKhamBenhDonThuocChiTiet.YeuCauKhamBenhDonThuoc.TrangThai = Core.Domain.KhamBenhs.KhamBenhEnum.TrangThaiDonThuocEnum.ChuaXuatThuoc;
                        }
                        phieuChi.YeuCauKhamBenhDonThuocChiTiet.TrangThaiThanhToan = TrangThaiThanhToanEnum.ChuaThanhToan;
                    }
                }
            }
            if (phieuThu.YeuCauTiepNhan != null)
            {
                phieuThu.YeuCauTiepNhan.TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien;
                phieuThu.YeuCauTiepNhan.YeuCauTiepNhanLichSuTrangThais.Add(new Core.Domain.TiepNhans.YeuCauTiepNhanLichSuTrangThai
                {
                    TrangThai = Core.Domain.TiepNhans.YeuCauTiepNhanEnum.TrangThaiYeuCauTiepNhanEnum.DangThucHien,
                    GhiChu = "Mở lại do hủy phiếu thu"
                });
            }

            await _thuNganService.UpdateAsync(phieuThu);
            return Ok(phieuThu);

        }

    }
}
