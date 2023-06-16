using Camino.Core.Domain.QuanTris.NhomNhanViens.HoSoNhanViens;
using System.ComponentModel;

namespace Camino.Core.Domain
{
    public enum DocumentType
    {
        //Giải thích 100001: 
        //Ký tự 1 và 2: Số tăng dần của menu level 1
        //Ký tự 3: 0: là Phòng khám đa khoa, 1: là Bác sĩ gia đình
        //Ký tự 4: Số tăng dần của phân nhóm trong menu level 1
        //Ký tự 5 và 6: Số tăng dần của item trong phân nhóm (nếu có)
        None = 0,
        #region Trang chủ

        #region Phòng khám đa khoa  
        [Description("Trang chủ")]
        [RoleMenuAttribute(100001, null, new UserType[] { UserType.PhongKhamDaKhoa }, new SecurityOperation[] { SecurityOperation.View })]
        TrangChuPhongKhamDaKhoa = 100001,
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        [Description("Trang chủ")]
        [RoleMenuAttribute(101001, null, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View })]
        TrangChuBacSiGiaDinh = 101001,
        #endregion Bác sĩ gia đình

        #endregion Trang chủ

        #region Tiếp nhận người bệnh

        #region Phòng khám đa khoa  
        [Description("Lịch hẹn")]
        [RoleMenuAttribute(110001, new string[] { "Tiếp nhận" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        TiepNhanNguoiBenhPhongKhamDaKhoaLichHen = 110001,
        [Description("Tiếp nhận")]
        [RoleMenuAttribute(110002, new string[] { "Tiếp nhận" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        TiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan = 110002,
        [Description("Lịch sử tiếp nhận")]
        [RoleMenuAttribute(110003, new string[] { "Tiếp nhận" }, new UserType[] { UserType.PhongKhamDaKhoa }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        TiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan = 110003,
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        [Description("Đăng ký khám")]
        [RoleMenuAttribute(111001, new string[] { "Tiếp nhận" }, new UserType[] { UserType.BacSiGiaDinh })]
        TiepNhanNguoiBenhBacSiGiaDinhDangKyKham = 111001,
        [Description("Lịch sử đăng ký khám")]
        [RoleMenuAttribute(111002, new string[] { "Tiếp nhận" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham = 111002,
        #endregion Bác sĩ gia đình

        #endregion Tiếp nhận người bệnh

        #region Khám bệnh

        #region Phòng khám đa khoa  
        [Description("Bác sĩ khám")]
        [RoleMenuAttribute(120001, new string[] { "Khám bệnh" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        KhamBenhPhongKhamDaKhoaBacSiKham = 120001,
        [Description("Lịch sử khám")]
        [RoleMenuAttribute(120002, new string[] { "Khám bệnh" }, new UserType[] { UserType.PhongKhamDaKhoa }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        KhamBenhPhongKhamDaKhoaLichSuKham = 120002,
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        [Description("Bác sĩ khám")]
        [RoleMenuAttribute(121001, new string[] { "Khám bệnh" }, new UserType[] { UserType.BacSiGiaDinh })]
        KhamBenhBacSiGiaDinhBacSiKham = 121001,
        [Description("Lịch sử khám")]
        [RoleMenuAttribute(121002, new string[] { "Khám bệnh" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        KhamBenhBacSiGiaDinhLichSuBacSiKham = 121002,
        #endregion Bác sĩ gia đình

        #endregion Khám bệnh

        #region CĐHA-TDCN
        [Description("Nhập kết quả")]
        [RoleMenuAttribute(130001, new string[] { "CĐHA-TDCN" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        CdhaTdcnNhapKetQua = 130001,
        [Description("Lịch sử CĐHA-TDCN")]
        [RoleMenuAttribute(130002, new string[] { "CĐHA-TDCN" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        CdhaTdcnLichSuKetQua = 130002,

        #region Danh mục
        [Description("Từ điển dịch vụ kỹ thuật")]
        [RoleMenuAttribute(130101, new string[] { "CĐHA-TDCN", "Danh mục" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        CdhaTdcnDanhMucTuDienDichVuKyThuat = 130101,
        #endregion Danh mục

        #endregion CĐHA-TDCN

        #region Xét nghiệm
        [Description("Cấp code")]
        [RoleMenuAttribute(140001, new string[] { "Xét nghiệm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        XetNghiemCapCode = 140001,
        [Description("Kết quả")]
        [RoleMenuAttribute(140001, new string[] { "Xét nghiệm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        XetNghiemKetQua = 140001,

        #region Danh mục
        [Description("Chỉ số xét nghiệm")]
        [RoleMenuAttribute(140101, new string[] { "Xét nghiệm", "Danh mục" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        XetNghiemDanhMucChiSoXetNghiem = 140101,
        [Description("Thiết bị xét nghiệm")]
        [RoleMenuAttribute(140102, new string[] { "Xét nghiệm", "Danh mục" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        XetNghiemDanhMucThietBiXetNghiem = 140102,
        #endregion Danh mục

        #endregion Xét nghiệm

        #region Thủ thuật
        [Description("Thực hiện thủ thuật")]
        [RoleMenuAttribute(150001, new string[] { "Thủ thuật" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        ThuThuatThucHienThuThuat = 150001,
        [Description("Lịch sử thủ thuật")]
        [RoleMenuAttribute(150002, new string[] { "Thủ thuật" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        ThuThuatLichSuThuThuat = 150002,
        #endregion Thủ thuật

        #region Thu ngân


        #region Phòng khám đa khoa  
        [Description("Thu viện phí")]
        [RoleMenuAttribute(160001, new string[] { "Thu ngân" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        ThuNganPhongKhamDaKhoaThuVienPhi = 160001,
        [Description("Lịch sử thu viện phí")]
        [RoleMenuAttribute(160002, new string[] { "Thu ngân" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        ThuNganPhongKhamDaKhoaLichSuThuVienPhi = 160002,
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        [Description("Thu viện phí")]
        [RoleMenuAttribute(161001, new string[] { "Thu ngân" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Add, SecurityOperation.Update })]
        ThuNganBacSiGiaDinhThuVienPhi = 161001,
        [Description("Lịch sử thu viện phí")]
        [RoleMenuAttribute(161002, new string[] { "Thu ngân" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        ThuNganBacSiGiaDinhLichSuThuVienPhi = 161002,
        #endregion Bác sĩ gia đình

        #endregion Thu ngân

        #region Nhà thuốc
        [Description("Bán thuốc")]
        [RoleMenuAttribute(170001, new string[] { "Nhà thuốc" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhaThuocBanThuoc = 170001,
        [Description("Lịch sử bán thuốc")]
        [RoleMenuAttribute(170002, new string[] { "Nhà thuốc" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhaThuocLichSuBanThuoc = 170002,
        #endregion Nhà thuốc

        #region Bảo hiểm y tế

        #region Xác nhận Bảo hiểm y tế
        [Description("Thực hiện xác nhận")]
        [RoleMenuAttribute(180001, new string[] { "Bảo hiểm y tế", "Xác nhận Bảo hiểm y tế" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        BaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan = 180001,
        [Description("Lịch sử xác nhận")]
        [RoleMenuAttribute(180002, new string[] { "Bảo hiểm y tế", "Xác nhận Bảo hiểm y tế" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        BaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan = 180002,
        #endregion Xác nhận Bảo hiểm y tế

        #region Gửi hồ sơ Bảo hiểm y tế
        [Description("Thực hiện gửi")]
        [RoleMenuAttribute(180101, new string[] { "Bảo hiểm y tế", "Gửi hồ sơ Bảo hiểm y tế" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        BaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui = 180101,
        [Description("Lịch sử gửi")]
        [RoleMenuAttribute(180102, new string[] { "Bảo hiểm y tế", "Gửi hồ sơ Bảo hiểm y tế" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        BaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui = 180102,
        [Description("Xuất excel chứng từ")]
        [RoleMenuAttribute(180103, new string[] { "Bảo hiểm y tế", "Gửi hồ sơ Bảo hiểm y tế" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        BaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu = 180103,
        #endregion Gửi hồ sơ Bảo hiểm y tế

        #endregion Bảo hiểm y tế

        #region Nhập xuất 

        #region Dược phẩm
        [Description("Nhập kho")]
        [RoleMenuAttribute(190001, new string[] { "Nhập xuất", "Dược phẩm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatDuocPhamNhapKho = 190001,
        [Description("Xuất kho")]
        [RoleMenuAttribute(190002, new string[] { "Nhập xuất", "Dược phẩm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatDuocPhamXuatKho = 190002,
        [Description("Hoàn trả")]
        [RoleMenuAttribute(190003, new string[] { "Nhập xuất", "Dược phẩm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatDuocPhamHoanTra = 190003,
        #endregion Dược phẩm

        #region Vật tư
        [Description("Nhập kho")]
        [RoleMenuAttribute(190101, new string[] { "Nhập xuất", "Vật tư" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatVatTuNhapKho = 190101,
        [Description("Xuất kho")]
        [RoleMenuAttribute(190102, new string[] { "Nhập xuất", "Vật tư" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatVatTuXuatKho = 190102,
        [Description("Hoàn trả")]
        [RoleMenuAttribute(190103, new string[] { "Nhập xuất", "Vật tư" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        NhapXuatVatTuHoanTra = 190103,
        #endregion Vật tư

        #endregion Nhập xuất

        #region Báo cáo

        #region Bác sĩ gia đình
        [Description("Hẹn khám")]
        [RoleMenuAttribute(201001, new string[] { "Báo cáo" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View })]
        BaoCaoBacSiGiaDinhHenKham = 201001,
        [Description("Khám bệnh")]
        [RoleMenuAttribute(201002, new string[] { "Báo cáo" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View })]
        BaoCaoBacSiGiaDinhKhamBenh = 201002,
        [Description("Phát thuốc")]
        [RoleMenuAttribute(201003, new string[] { "Báo cáo" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View })]
        BaoCaoBacSiGiaDinhPhatThuoc = 201003,
        [Description("Doanh thu")]
        [RoleMenuAttribute(201004, new string[] { "Báo cáo" }, new UserType[] { UserType.BacSiGiaDinh }, new SecurityOperation[] { SecurityOperation.View })]
        BaoCaoBacSiGiaDinhDoanhThu = 201004,

        #endregion Bác sĩ gia đình
        #endregion Báo cáo

        #region Quản trị

        #region Nhóm cấu hình
        [Description("Nội dung mẫu xuất ra PDF")]
        [RoleMenuAttribute(210001, new string[] { "Quản trị", "Nhóm cấu hình" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomCauHinhNoiDungMauXuatPdf = 210001,
        [Description("Thông số mặc định")]
        [RoleMenuAttribute(210002, new string[] { "Quản trị", "Nhóm cấu hình" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        QuanTriNhomCauHinhThongSoMacDinh = 210002,
        [Description("Nội dung mẫu")]
        [RoleMenuAttribute(210003, new string[] { "Quản trị", "Nhóm cấu hình" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomCauHinhNoiDungMau = 210003,
        #endregion Nhóm cấu hình

        #region Nhóm dược phẩm
        [Description("Đơn vị tính")]
        [RoleMenuAttribute(210101, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamDonViTinh = 210101,
        [Description("Dược phẩm")]
        [RoleMenuAttribute(210102, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamDuocPham = 210102,
        [Description("Đường dùng")]
        [RoleMenuAttribute(210103, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamDuongDung = 210103,
        [Description("Nhà sản xuất")]
        [RoleMenuAttribute(210104, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamNhaSanXuat = 210104,
        [Description("Nhóm thuốc")]
        [RoleMenuAttribute(210105, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamNhomThuoc = 210105,
        [Description("Tương tác thuốc")]
        [RoleMenuAttribute(210106, new string[] { "Quản trị", "Nhóm dược phẩm" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomDuocPhamTuongTacThuoc = 210106,
        #endregion Nhóm dược phẩm

        #region Nhóm hành chính
        [Description("Chức danh")]
        [RoleMenuAttribute(210201, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhChucDanh = 210201,
        [Description("Chức vụ")]
        [RoleMenuAttribute(210202, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhChucVu = 210202,
        [Description("Dân tộc")]
        [RoleMenuAttribute(210203, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhDanToc = 210203,
        [Description("Đơn vị hành chính")]
        [RoleMenuAttribute(210204, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhDonViHanhChinh = 210204,
        [Description("Nghề nghiệp")]
        [RoleMenuAttribute(210205, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhNgheNghiep = 210205,
        [Description("Quốc gia")]
        [RoleMenuAttribute(210206, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhQuocGia = 210206,
        [Description("Văn bằng chuyên môn")]
        [RoleMenuAttribute(210207, new string[] { "Quản trị", "Nhóm hành chính" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomHanhChinhVanBangChuyenMon = 210207,
        #endregion Nhóm hành chính

        #region Nhóm kho
        [Description("Kho")]
        [RoleMenuAttribute(210301, new string[] { "Quản trị", "Nhóm kho" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoKho = 210301,
        [Description("Nhà cung cấp")]
        [RoleMenuAttribute(210302, new string[] { "Quản trị", "Nhóm kho" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoNhaCungCap = 210302,
        [Description("Vị trí để DP/VT")]
        [RoleMenuAttribute(210303, new string[] { "Quản trị", "Nhóm kho" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoViTriDeDuocPhamVatTu = 210303,
        #endregion Nhóm kho

        #region Nhóm khoa phòng
        [Description("Khoa phòng")]
        [RoleMenuAttribute(210401, new string[] { "Quản trị", "Nhóm khoa phòng" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoaPhongKhoaPhong = 210401,
        [Description("Khoa phòng - Nhân viên")]
        [RoleMenuAttribute(210402, new string[] { "Quản trị", "Nhóm khoa phòng" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoaPhongKhoaPhongNhanVien = 210402,
        [Description("Khoa phòng - Phòng khám")]
        [RoleMenuAttribute(210403, new string[] { "Quản trị", "Nhóm khoa phòng" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomKhoaPhongKhoaPhongPhongKham = 210403,
        #endregion Nhóm khoa phòng

        #region Nhóm người bệnh
        [Description("Người bệnh")]
        [RoleMenuAttribute(210501, new string[] { "Quản trị", "Nhóm người bệnh" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomNguoiBenhNguoiBenh = 210501,
        [Description("Quan hệ thân nhân")]
        [RoleMenuAttribute(210502, new string[] { "Quản trị", "Nhóm người bệnh" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomNguoiBenhQuanHeThanNhan = 210502,
        #endregion Nhóm người bệnh

        #region Nhóm nhân viên
        [Description("Hồ sơ nhân viên")]
        [RoleMenuAttribute(210601, new string[] { "Quản trị", "Nhóm nhân viên" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomNhanVienHoSoNhanVien = 210601,
        [Description("Phân quyền người dùng")]
        [RoleMenuAttribute(210602, new string[] { "Quản trị", "Nhóm nhân viên" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomNhanVienPhanQuyenNguoiDung = 210602,
        [Description("Tài khoản người dùng")]
        [RoleMenuAttribute(210603, new string[] { "Quản trị", "Nhóm nhân viên" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa }, new SecurityOperation[] { SecurityOperation.View, SecurityOperation.Update })]
        QuanTriNhomNhanVienTaiKhoanNguoiDung = 210603,
        #endregion Nhóm nhân viên

        #region Nhóm phòng khám
        [Description("Chẩn đoán")]
        [RoleMenuAttribute(210701, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamChanDoan = 210701,
        [Description("Dịch vụ khám")]
        [RoleMenuAttribute(210702, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamDichVuKham = 210702,
        [Description("Dịch vụ kỹ thuật")]
        [RoleMenuAttribute(210703, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamDichVuKyThuat = 210703,
        [Description("ICD")]
        [RoleMenuAttribute(210704, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamIcd = 210704,
        [Description("Lời dặn")]
        [RoleMenuAttribute(210705, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamLoiDan = 210705,
        [Description("Lý do tiếp nhận")]
        [RoleMenuAttribute(210706, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamLyDoTiepNhan = 210706,
        [Description("Nhóm dịch vụ")]
        [RoleMenuAttribute(210707, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamNhomDichVu = 210707,
        [Description("Nhóm dịch vụ thường dùng")]
        [RoleMenuAttribute(210708, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamNhomDichVuThuongDung = 210708,
        [Description("Toa thuốc mẫu")]
        [RoleMenuAttribute(210709, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamToaThuocMau = 210709,
        [Description("Triệu chứng")]
        [RoleMenuAttribute(210710, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamTrieuChung = 210710,
        [Description("Bệnh viện")]
        [RoleMenuAttribute(210711, new string[] { "Quản trị", "Nhóm phòng khám" }, new UserType[] { UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa })]
        QuanTriNhomPhongKhamBenhVien = 210711,
        #endregion Nhóm phòng khám

        #region Nhóm vật tư
        [Description("Vật tư")]
        [RoleMenuAttribute(210801, new string[] { "Quản trị", "Nhóm vật tư" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        QuanTriNhomVatTuVatTu = 210801,
        #endregion Nhóm vật tư

        #endregion Quản trị

        #region Hướng dẫn sử dụng
        [Description("Hướng dẫn sử dụng")]
        [RoleMenuAttribute(220001, new string[] { "Hướng dẫn sử dụng" }, new UserType[] { UserType.PhongKhamDaKhoa })]
        HuongDanSuDungPhongKhamDaKhoa = 220001,
        [Description("Hướng dẫn sử dụng")]
        [RoleMenuAttribute(221001, new string[] { "Hướng dẫn sử dụng" }, new UserType[] { UserType.BacSiGiaDinh })]
        HuongDanSuDungBacSiGiaDinh = 221001,
        #endregion
    }

    public enum SecurityOperation
    {
        None = 0,
        View = 1,
        Process = 2,
        Add = 3,
        Delete = 4,
        Update = 5,
    }
}
