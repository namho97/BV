using Camino.Core.DependencyInjection.Attributes;
using Camino.Core.Domain;
using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using Camino.Core.Domain.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs;
using Camino.Core.Helpers;
using Camino.Data;
using Camino.Data.Extensions;
using Camino.Services.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Camino.Services.QuanTris.NhomNhanViens.PhanQuyenNguoiDungs
{
    [ScopedDependency(ServiceType = typeof(IRoleService))]
    public class RoleService : MasterFileService<Role>, IRoleService
    {
        private readonly IRepository<RoleFunction> _roleFunctionRepository;
        private readonly IUserAgentHelper _userAgentHelper;
        public RoleService(IRepository<Role> repository, IRepository<RoleFunction> roleFunctionRepository, IUserAgentHelper userAgentHelper) : base(repository)
        {
            _roleFunctionRepository = roleFunctionRepository;
            _userAgentHelper = userAgentHelper;
        }

        public bool VerifyAccess(long[] roleIds, DocumentType[] documentTypes, SecurityOperation securityOperation)
        {
            if (securityOperation == SecurityOperation.None || documentTypes.Contains(DocumentType.None))
                return true;
            if (roleIds == null || roleIds.Length == 0)
            {
                return false;
            }
            var roles = BaseRepository.TableNoTracking.Include(o => o.RoleFunctions).ToList();
            var userRoles = roles.Where(o => roleIds.Contains(o.Id));
            return userRoles.Any(o => o.RoleFunctions.Any(r => r.SecurityOperation == securityOperation && documentTypes.Contains(r.DocumentType)));
        }

        private bool CheckMenuCanView(ICollection<RoleFunction> roleFunctions, DocumentType documentType, SecurityOperation securityOperation)
        {
            return roleFunctions.Any(r =>
                r.SecurityOperation == securityOperation && r.DocumentType == documentType);
        }

        public MenuInfo GetMenuInfo(long[] roleIds)
        {
            var roles = BaseRepository.TableNoTracking.Include(o => o.RoleFunctions).ToList();
            var userRoles = roles.Where(o => roleIds.Contains(o.Id));
            var roleFunctions = userRoles.SelectMany(o => o.RoleFunctions).ToList();
            return new MenuInfo
            {
                #region Trang chủ
                #region Phòng khám đa khoa  
                CanViewTrangChuPhongKhamDaKhoa = CheckMenuCanView(roleFunctions, DocumentType.TrangChuPhongKhamDaKhoa, SecurityOperation.View),
                #endregion Phòng khám đa khoa  

                #region Bác sĩ gia đình
                CanViewTrangChuBacSiGiaDinh = CheckMenuCanView(roleFunctions, DocumentType.TrangChuBacSiGiaDinh, SecurityOperation.View),
                #endregion Bác sĩ gia đình

                #endregion Trang chủ

                #region Tiếp nhận người bệnh

                #region Phòng khám đa khoa  
                CanViewTiepNhanNguoiBenhPhongKhamDaKhoaLichHen = CheckMenuCanView(roleFunctions, DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichHen, SecurityOperation.View),
                CanViewTiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan = CheckMenuCanView(roleFunctions, DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan, SecurityOperation.View),
                CanViewTiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan = CheckMenuCanView(roleFunctions, DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan, SecurityOperation.View),
                #endregion Phòng khám đa khoa  

                #region Bác sĩ gia đình
                CanViewTiepNhanNguoiBenhBacSiGiaDinhDangKyKham = CheckMenuCanView(roleFunctions, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham, SecurityOperation.View),
                CanViewTiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham = CheckMenuCanView(roleFunctions, DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham, SecurityOperation.View),
                #endregion Bác sĩ gia đình

                #endregion Tiếp nhận người bệnh

                #region Khám bệnh

                #region Phòng khám đa khoa  
                CanViewKhamBenhPhongKhamDaKhoaBacSiKham = CheckMenuCanView(roleFunctions, DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham, SecurityOperation.View),
                CanViewKhamBenhPhongKhamDaKhoaLichSuKham = CheckMenuCanView(roleFunctions, DocumentType.KhamBenhPhongKhamDaKhoaLichSuKham, SecurityOperation.View),
                #endregion Phòng khám đa khoa  

                #region Bác sĩ gia đình
                CanViewKhamBenhBacSiGiaDinhBacSiKham = CheckMenuCanView(roleFunctions, DocumentType.KhamBenhBacSiGiaDinhBacSiKham, SecurityOperation.View),
                CanViewKhamBenhBacSiGiaDinhLichSuBacSiKham = CheckMenuCanView(roleFunctions, DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham, SecurityOperation.View),
                #endregion Bác sĩ gia đình

                #endregion Khám bệnh

                #region CĐHA-TDCN
                CanViewCdhaTdcnNhapKetQua = CheckMenuCanView(roleFunctions, DocumentType.CdhaTdcnNhapKetQua, SecurityOperation.View),
                CanViewCdhaTdcnLichSuKetQua = CheckMenuCanView(roleFunctions, DocumentType.CdhaTdcnLichSuKetQua, SecurityOperation.View),

                #region Danh mục
                CanViewCdhaTdcnDanhMucTuDienDichVuKyThuat = CheckMenuCanView(roleFunctions, DocumentType.CdhaTdcnDanhMucTuDienDichVuKyThuat, SecurityOperation.View),
                #endregion Danh mục

                #endregion CĐHA-TDCN

                #region Xét nghiệm
                CanViewXetNghiemCapCode = CheckMenuCanView(roleFunctions, DocumentType.XetNghiemCapCode, SecurityOperation.View),
                CanViewXetNghiemKetQua = CheckMenuCanView(roleFunctions, DocumentType.XetNghiemKetQua, SecurityOperation.View),

                #region Danh mục
                CanViewXetNghiemDanhMucChiSoXetNghiem = CheckMenuCanView(roleFunctions, DocumentType.XetNghiemDanhMucChiSoXetNghiem, SecurityOperation.View),
                CanViewXetNghiemDanhMucThietBiXetNghiem = CheckMenuCanView(roleFunctions, DocumentType.XetNghiemDanhMucThietBiXetNghiem, SecurityOperation.View),
                #endregion Danh mục

                #endregion Xét nghiệm

                #region Thủ thuật
                CanViewThuThuatThucHienThuThuat = CheckMenuCanView(roleFunctions, DocumentType.ThuThuatThucHienThuThuat, SecurityOperation.View),
                CanViewThuThuatLichSuThuThuat = CheckMenuCanView(roleFunctions, DocumentType.ThuThuatLichSuThuThuat, SecurityOperation.View),
                #endregion Thủ thuật

                #region Thu ngân
                CanViewThuNganPhongKhamDaKhoaThuVienPhi = CheckMenuCanView(roleFunctions, DocumentType.ThuNganPhongKhamDaKhoaThuVienPhi, SecurityOperation.View),
                CanViewThuNganPhongKhamDaKhoaLichSuThuVienPhi = CheckMenuCanView(roleFunctions, DocumentType.ThuNganPhongKhamDaKhoaLichSuThuVienPhi, SecurityOperation.View),
                CanViewThuNganBacSiGiaDinhThuVienPhi = CheckMenuCanView(roleFunctions, DocumentType.ThuNganBacSiGiaDinhThuVienPhi, SecurityOperation.View),
                CanViewThuNganBacSiGiaDinhLichSuThuVienPhi = CheckMenuCanView(roleFunctions, DocumentType.ThuNganBacSiGiaDinhLichSuThuVienPhi, SecurityOperation.View),
                #endregion Thu ngân

                #region Nhà thuốc
                CanViewNhaThuocBanThuoc = CheckMenuCanView(roleFunctions, DocumentType.NhaThuocBanThuoc, SecurityOperation.View),
                CanViewNhaThuocLichSuBanThuoc = CheckMenuCanView(roleFunctions, DocumentType.NhaThuocLichSuBanThuoc, SecurityOperation.View),
                #endregion Nhà thuốc

                #region Bảo hiểm y tế

                #region Xác nhận Bảo hiểm y tế
                CanViewBaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan = CheckMenuCanView(roleFunctions, DocumentType.BaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan, SecurityOperation.View),
                CanViewBaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan = CheckMenuCanView(roleFunctions, DocumentType.BaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan, SecurityOperation.View),
                #endregion Xác nhận Bảo hiểm y tế

                #region Gửi hồ sơ Bảo hiểm y tế
                CanViewBaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui = CheckMenuCanView(roleFunctions, DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui, SecurityOperation.View),
                CanViewBaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui = CheckMenuCanView(roleFunctions, DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui, SecurityOperation.View),
                CanViewBaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu = CheckMenuCanView(roleFunctions, DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu, SecurityOperation.View),
                #endregion Gửi hồ sơ Bảo hiểm y tế

                #endregion Bảo hiểm y tế

                #region Nhập xuất 

                #region Dược phẩm
                CanViewNhapXuatDuocPhamNhapKho = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatDuocPhamNhapKho, SecurityOperation.View),
                CanViewNhapXuatDuocPhamXuatKho = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatDuocPhamXuatKho, SecurityOperation.View),
                CanViewNhapXuatDuocPhamHoanTra = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatDuocPhamHoanTra, SecurityOperation.View),
                #endregion Dược phẩm

                #region Vật tư
                CanViewNhapXuatVatTuNhapKho = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatVatTuNhapKho, SecurityOperation.View),
                CanViewNhapXuatVatTuXuatKho = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatVatTuXuatKho, SecurityOperation.View),
                CanViewNhapXuatVatTuHoanTra = CheckMenuCanView(roleFunctions, DocumentType.NhapXuatVatTuHoanTra, SecurityOperation.View),
                #endregion Vật tư

                #endregion Nhập xuất

                #region Báo cáo

                #region Bác sĩ gia đình
                CanViewBaoCaoBacSiGiaDinhHenKham = CheckMenuCanView(roleFunctions, DocumentType.BaoCaoBacSiGiaDinhHenKham, SecurityOperation.View),
                CanViewBaoCaoBacSiGiaDinhKhamBenh = CheckMenuCanView(roleFunctions, DocumentType.BaoCaoBacSiGiaDinhKhamBenh, SecurityOperation.View),
                CanViewBaoCaoBacSiGiaDinhPhatThuoc = CheckMenuCanView(roleFunctions, DocumentType.BaoCaoBacSiGiaDinhPhatThuoc, SecurityOperation.View),
                CanViewBaoCaoBacSiGiaDinhDoanhThu = CheckMenuCanView(roleFunctions, DocumentType.BaoCaoBacSiGiaDinhDoanhThu, SecurityOperation.View),
                #endregion Bác sĩ gia đình

                #endregion Báo cáo

                #region Quản trị

                #region Nhóm cấu hình
                CanViewQuanTriNhomCauHinhNoiDungMauXuatPdf = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomCauHinhNoiDungMauXuatPdf, SecurityOperation.View),
                CanViewQuanTriNhomCauHinhThongSoMacDinh = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomCauHinhThongSoMacDinh, SecurityOperation.View),
                CanViewQuanTriNhomCauHinhNoiDungMau = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomCauHinhNoiDungMau, SecurityOperation.View),
                #endregion Nhóm cấu hình

                #region Nhóm dược phẩm
                CanViewQuanTriNhomDuocPhamDonViTinh = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamDonViTinh, SecurityOperation.View),
                CanViewQuanTriNhomDuocPhamDuocPham = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamDuocPham, SecurityOperation.View),
                CanViewQuanTriNhomDuocPhamDuongDung = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamDuongDung, SecurityOperation.View),
                CanViewQuanTriNhomDuocPhamNhaSanXuat = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamNhaSanXuat, SecurityOperation.View),
                CanViewQuanTriNhomDuocPhamNhomThuoc = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamNhomThuoc, SecurityOperation.View),
                CanViewQuanTriNhomDuocPhamTuongTacThuoc = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomDuocPhamTuongTacThuoc, SecurityOperation.View),
                #endregion Nhóm dược phẩm

                #region Nhóm hành chính
                CanViewQuanTriNhomHanhChinhChucDanh = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhChucDanh, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhChucVu = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhChucVu, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhDanToc = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhDanToc, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhDonViHanhChinh = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhDonViHanhChinh, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhNgheNghiep = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhNgheNghiep, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhQuocGia = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhQuocGia, SecurityOperation.View),
                CanViewQuanTriNhomHanhChinhVanBangChuyenMon = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon, SecurityOperation.View),
                #endregion Nhóm hành chính

                #region Nhóm kho
                CanViewQuanTriNhomKhoKho = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoKho, SecurityOperation.View),
                CanViewQuanTriNhomKhoNhaCungCap = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoNhaCungCap, SecurityOperation.View),
                CanViewQuanTriNhomKhoViTriDeDuocPhamVatTu = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu, SecurityOperation.View),
                #endregion Nhóm kho

                #region Nhóm khoa phòng
                CanViewQuanTriNhomKhoaPhongKhoaPhong = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoaPhongKhoaPhong, SecurityOperation.View),
                CanViewQuanTriNhomKhoaPhongKhoaPhongNhanVien = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien, SecurityOperation.View),
                CanViewQuanTriNhomKhoaPhongKhoaPhongPhongKham = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham, SecurityOperation.View),
                #endregion Nhóm khoa phòng

                #region Nhóm người bệnh
                CanViewQuanTriNhomNguoiBenhNguoiBenh = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomNguoiBenhNguoiBenh, SecurityOperation.View),
                CanViewQuanTriNhomNguoiBenhQuanHeThanNhan = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan, SecurityOperation.View),
                #endregion Nhóm người bệnh

                #region Nhóm nhân viên
                CanViewQuanTriNhomNhanVienHoSoNhanVien = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomNhanVienHoSoNhanVien, SecurityOperation.View),
                CanViewQuanTriNhomNhanVienPhanQuyenNguoiDung = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung, SecurityOperation.View),
                CanViewQuanTriNhomNhanVienTaiKhoanNguoiDung = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomNhanVienTaiKhoanNguoiDung, SecurityOperation.View),
                #endregion Nhóm nhân viên

                #region Nhóm phòng khám
                CanViewQuanTriNhomPhongKhamChanDoan = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamChanDoan, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamDichVuKham = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamDichVuKham, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamDichVuKyThuat = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamDichVuKyThuat, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamIcd = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamIcd, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamLoiDan = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamLoiDan, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamLyDoTiepNhan = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamLyDoTiepNhan, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamNhomDichVu = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamNhomDichVu, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamNhomDichVuThuongDung = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamToaThuocMau = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamToaThuocMau, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamTrieuChung = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamTrieuChung, SecurityOperation.View),
                CanViewQuanTriNhomPhongKhamBenhVien = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomPhongKhamBenhVien, SecurityOperation.View),
                #endregion Nhóm phòng khám

                #region Nhóm vật tư
                CanViewQuanTriNhomVatTuVatTu = CheckMenuCanView(roleFunctions, DocumentType.QuanTriNhomVatTuVatTu, SecurityOperation.View),
                #endregion Nhóm vật tư

                #endregion Quản trị


                #region Hướng dẫn sử dụng
                CanViewHuongDanSuDungPhongKhamDaKhoa = CheckMenuCanView(roleFunctions, DocumentType.HuongDanSuDungPhongKhamDaKhoa, SecurityOperation.View),
                CanViewHuongDanSuDungBacSiGiaDinh = CheckMenuCanView(roleFunctions, DocumentType.HuongDanSuDungBacSiGiaDinh, SecurityOperation.View),
                #endregion
            };
        }

        public ICollection<CaminoPermission> GetPermissions(long[] roleIds)
        {
            var roles = BaseRepository.TableNoTracking.Include(o => o.RoleFunctions).ToList();
            var userRoles = roles.Where(o => roleIds.Contains(o.Id));
            return userRoles.SelectMany(o => o.RoleFunctions.Select(r => new CaminoPermission { DocumentType = r.DocumentType, SecurityOperation = r.SecurityOperation })).ToList();
        }
        public async Task<ICollection<LookupItemVo>> GetLookupAsync()
        {
            return await BaseRepository.TableNoTracking.Where(o => o.LaQuyenHeThong != true).Select(o => new LookupItemVo { DisplayName = o.Name, KeyId = o.Id }).ToListAsync();
        }


        #region CRUD

        public async Task<GridDataSource> GetDataForGridAsync(RoleQueryInfo queryInfo)
        {
            BuildDefaultSortExpression(queryInfo);
            var query = BaseRepository.TableNoTracking.Where(o => queryInfo.UserType == null || o.UserType == queryInfo.UserType)
                .Where(s => s.LaQuyenHeThong != true)
                .Select(s => new RoleGridVo
                {
                    Id = s.Id,
                    Ten = s.Name,
                    IsDefault = s.IsDefault
                }).ApplyLike(queryInfo.SearchString, x => x.Ten);

            var countResult = queryInfo.LazyLoadPage == true ? 0 : await query.CountAsync();
            var queryResult = await query.OrderBy(queryInfo.SortString).Skip(queryInfo.Skip).Take(queryInfo.Take).ToArrayAsync();
            return new GridDataSource { Data = queryResult, TotalRowCount = countResult };
        }

        public async Task<GridDataSource> GetTotalPageForGridAsync(RoleQueryInfo queryInfo)
        {
            var query = BaseRepository.TableNoTracking.Where(o => queryInfo.UserType == null || o.UserType == queryInfo.UserType)
                .Where(s => s.LaQuyenHeThong != true)
                .Select(s => new RoleGridVo
                {
                    Id = s.Id,
                    Ten = s.Name,
                    //IsDefault = s.IsDefault
                }).ApplyLike(queryInfo.SearchTerms, o => o.Ten);

            var countResult = await query.CountAsync();

            return new GridDataSource { TotalRowCount = countResult };
        }

        public async Task UpdateRoleFunctionForRole(List<RoleFunction> roleFunctions, long roleId)
        {
            await RemoveAllRoleFuntionOld(roleId);
            //Add new role function for role
            await AddPermission(roleFunctions, roleId);
        }

        public async Task AddPermissionForRole(List<RoleFunction> roleFunctions, long roleId)
        {
            await AddPermission(roleFunctions, roleId);
        }

        private async Task AddPermission(List<RoleFunction> roleFunctions, long roleId)
        {
            var lstRoleFunctionsNew = roleFunctions.Select(roleFunction => new RoleFunction
            {
                RoleId = roleId,
                SecurityOperation = roleFunction.SecurityOperation,
                DocumentType = roleFunction.DocumentType
            })
                .ToList();
            await _roleFunctionRepository.AddRangeAsync(lstRoleFunctionsNew);
        }

        private async Task RemoveAllRoleFuntionOld(long roleId)
        {
            var roleFunctions = _roleFunctionRepository.Table.Where(p => p.RoleId == roleId).ToList();
            await _roleFunctionRepository.DeleteAsync(roleFunctions);
        }

        public bool KiemTraTrungTen(long roleId, string? ten)
        {
            if (string.IsNullOrEmpty(ten))
            {
                return false;
            }

            var isExists = BaseRepository.TableNoTracking.Any(x => (roleId == 0 || x.Id != roleId) && x.Name.Equals(ten));
            return isExists;
        }
        #endregion CRUD

        public Task<Role> GetRoleWithUserType(UserType userType)
        {
            return Task.FromResult(BaseRepository.TableNoTracking.First(p => p.UserType == userType));
        }



        #region Xử lý thông tin chi tiết role function theo user
        /// <summary>
        /// Xử lý lấy danh sách tất cả role function available, đồng thời tạo ra nhóm phân cấp tương ứng theo documentType
        /// </summary>
        /// <returns></returns>
        public List<RoleFunctionDetailItemVo> GetAllAvailableRoleFunctions(UserType userType, long? roleId = null, List<RoleFunction>? lstRoleFunctionByRoleId = null)
        {
            var lstRoleFunction = new List<RoleFunctionDetailItemVo>();
            var documentTypes = EnumHelper.GetListEnum<DocumentType>();
            //var lstRoleFunctionByRoleId = new List<RoleFunction>();

            documentTypes = documentTypes.Where(o => o.GetRoleMenuAttribute() != null && o.GetRoleMenuAttribute()!.UserTypes.Contains(userType))
                .OrderBy(o => o.GetRoleMenuAttribute()!.OrderNumber)
                .ToList();

            #region Xử lý check role function theo roleId
            if (roleId.GetValueOrDefault() != 0 && (lstRoleFunctionByRoleId == null || !lstRoleFunctionByRoleId.Any()))
            {
                lstRoleFunctionByRoleId = _roleFunctionRepository.TableNoTracking.Where(x => x.RoleId == roleId).ToList();
            }
            #endregion

            var idNhomFE = 1;
            var groupLevel = 1;
            foreach (var documentType in documentTypes)
            {
                groupLevel = 1;
                var roleMenuAttribute = documentType.GetRoleMenuAttribute();
                if (roleMenuAttribute!.GroupsName.Length == 0)
                {
                    var newItem = getNewFunctionDetailItemVo(documentType, groupLevel);
                    SetSecurityOperationToRoleItemByUser(lstRoleFunctionByRoleId, newItem);
                    lstRoleFunction.Add(newItem);
                }
                else
                {
                    int? nhomChaId = null;
                    foreach (var groupName in roleMenuAttribute.GroupsName)
                    {
                        if (!lstRoleFunction.Any(x => x.Name.Equals(groupName)))
                        {
                            var newItemGroup = getNewFunctionDetailItemVo(null, groupLevel, groupName, idNhomFE);
                            newItemGroup.IdParent = nhomChaId;
                            lstRoleFunction.Add(newItemGroup);

                            nhomChaId = newItemGroup.Id;
                            idNhomFE++;
                        }
                        else
                        {
                            var group = lstRoleFunction.First(x => x.Name.Equals(groupName));
                            nhomChaId = group.Id;
                        }
                        groupLevel++;
                    }

                    var newItem = getNewFunctionDetailItemVo(documentType, groupLevel + 1);
                    newItem.IdParent = nhomChaId;
                    SetSecurityOperationToRoleItemByUser(lstRoleFunctionByRoleId, newItem);
                    lstRoleFunction.Add(newItem);
                }
            }

            return lstRoleFunction;
        }

        private RoleFunctionDetailItemVo getNewFunctionDetailItemVo(DocumentType? documentType, int groupLevel, string? groupName = null, int? idNhomFE = null)
        {
            var newItemVo = new RoleFunctionDetailItemVo();
            var lstSecurityOperation = new List<SecurityOperation>();
            //var lstSecurityOperation = EnumHelper.GetListEnum<SecurityOperation>()
            //    .Where(x => x != SecurityOperation.None && x != SecurityOperation.Process)
            //    .ToList();
            //lstSecurityOperation.Add(SecurityOperation.Process); // sắp xếp cho xử lý khác nằm cuối cùng

            #region sắp xếp SecurityOperation hiển thị
            lstSecurityOperation.Add(SecurityOperation.View);
            lstSecurityOperation.Add(SecurityOperation.Add);
            lstSecurityOperation.Add(SecurityOperation.Update);
            lstSecurityOperation.Add(SecurityOperation.Delete);
            lstSecurityOperation.Add(SecurityOperation.Process);
            #endregion

            // trường hợp tự động tạo group
            if (!string.IsNullOrEmpty(groupName))
            {
                newItemVo.Id = idNhomFE.GetValueOrDefault();
                newItemVo.Name = groupName;
                newItemVo.GroupLevel = groupLevel;
                newItemVo.Quyens = lstSecurityOperation
                    .Select(x => new ChiTietQuyenVo()
                    {
                        SecurityOperation = x,
                        Disabled = false,
                        Value = false
                    }).ToList();
            }

            // trường hợp là 1 documentType cụ thể
            else if (documentType != null)
            {
                newItemVo.Id = (int)documentType;
                newItemVo.Name = documentType.GetDescription();
                newItemVo.IsDocumentType = true;
                newItemVo.GroupLevel = groupLevel;
                var roleMenuAttribute = documentType.GetRoleMenuAttribute();
                newItemVo.Quyens = lstSecurityOperation
                    .Select(x => new ChiTietQuyenVo()
                    {
                        SecurityOperation = x,
                        Disabled = roleMenuAttribute!.SecurityOperations.Any()
                                   && roleMenuAttribute!.SecurityOperations.All(a => a != x),
                        Value = false
                    }).ToList();
            }

            return newItemVo;
        }

        private void SetSecurityOperationToRoleItemByUser(List<RoleFunction>? lstTRoleFunctions, RoleFunctionDetailItemVo roleItem)
        {
            if (lstTRoleFunctions != null && lstTRoleFunctions.Any())
            {
                var lstTRoleFunctionsByDocumentType =
                    lstTRoleFunctions.Where(x => (int)x.DocumentType == roleItem.Id).ToList();
                if (lstTRoleFunctionsByDocumentType.Any())
                {
                    foreach (var quyen in roleItem.Quyens)
                    {
                        foreach (var roleFunction in lstTRoleFunctionsByDocumentType)
                        {
                            if (quyen.SecurityOperation == roleFunction.SecurityOperation && quyen.Disabled != true)
                            {
                                quyen.Value = true;
                            }
                        }
                    }
                }
            }
        }

        #endregion
    }
}
