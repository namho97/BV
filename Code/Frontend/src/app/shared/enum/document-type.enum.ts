export enum DocumentType {
    None = 0,
    //#region Trang chủ

    //#region Phòng khám đa khoa  
    TrangChuPhongKhamDaKhoa=100001,
    //#endregion Phòng khám đa khoa  

    //#region Bác sĩ gia đình
    TrangChuBacSiGiaDinh =101001,
    //#endregion Bác sĩ gia đình

    //#endregion Trang chủ

    //#region Tiếp nhận

    //#region Phòng khám đa khoa  
    TiepNhanNguoiBenhPhongKhamDaKhoaLichHen = 110001,
    TiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan = 110002,
    TiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan = 110003,
    //#endregion Phòng khám đa khoa  

    //#region Bác sĩ gia đình
    TiepNhanNguoiBenhBacSiGiaDinhDangKyKham =111001,
    TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham=111002,
    //#endregion Bác sĩ gia đình

    //#endregion Tiếp nhận

    //#region Khám bệnh

    //#region Phòng khám đa khoa  
    KhamBenhPhongKhamDaKhoaBacSiKham=120001,
    KhamBenhPhongKhamDaKhoaLichSuKham=120002,
    //#endregion Phòng khám đa khoa  

    //#region Bác sĩ gia đình
    KhamBenhBacSiGiaDinhBacSiKham=121001,
    KhamBenhBacSiGiaDinhLichSuBacSiKham=121002,
    //#endregion Bác sĩ gia đình

    //#endregion Khám bệnh

    //#region CĐHA-TDCN
    CdhaTdcnNhapKetQua=130001,
    CdhaTdcnLichSuKetQua=130002,

    //#region Danh mục
    CdhaTdcnDanhMucTuDienDichVuKyThuat = 130101,
    //#endregion Danh mục

    //#endregion CĐHA-TDCN

    //#region Xét nghiệm
    XetNghiemCapCode =140001,
    XetNghiemKetQua=140002,

    //#region Danh mục
    XetNghiemDanhMucChiSoXetNghiem = 140101,
    XetNghiemDanhMucThietBiXetNghiem = 140102,
    //#endregion Danh mục

    //#endregion Xét nghiệm

    //#region Thủ thuật
    ThuThuatThucHienThuThuat =150001,
    ThuThuatLichSuThuThuat=150002,
    //#endregion Thủ thuật

    //#region Thu ngân
    ThuNganPhongKhamDaKhoaThuVienPhi=160001,
    ThuNganPhongKhamDaKhoaLichSuThuVienPhi=160002,
    ThuNganBacSiGiaDinhThuVienPhi = 161001,
    ThuNganBacSiGiaDinhLichSuThuVienPhi = 161002,
    //#endregion Thu ngân

    //#region Nhà thuốc
    NhaThuocBanThuoc=170001,
    NhaThuocLichSuBanThuoc=170002,
    //#endregion Nhà thuốc

    //#region Bảo hiểm y tế

    //#region Xác nhận Bảo hiểm y tế
    BaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan = 180001,
    BaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan = 180002,
    //#endregion Xác nhận Bảo hiểm y tế

    //#region Gửi hồ sơ Bảo hiểm y tế
    BaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui = 180101,
    BaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui = 180102,
    BaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu = 180103,
    //#endregion Gửi hồ sơ Bảo hiểm y tế

    //#endregion Bảo hiểm y tế

    //#region Nhập xuất 

    //#region Dược phẩm
    NhapXuatDuocPhamNhapKho = 190001,
    NhapXuatDuocPhamXuatKho = 190002,
    NhapXuatDuocPhamHoanTra = 190003,
    //#endregion Dược phẩm

    //#region Vật tư
    NhapXuatVatTuNhapKho = 190101,
    NhapXuatVatTuXuatKho = 190102,
    NhapXuatVatTuHoanTra = 190103,
    //#endregion Vật tư

    //#endregion Nhập xuất

    //#region Báo cáo
    //Bác sĩ gia đình
    BaoCaoBacSiGiaDinhHenKham=201001,
    BaoCaoBacSiGiaDinhKhamBenh=201002,
    BaoCaoBacSiGiaDinhPhatThuoc=201003,
    BaoCaoBacSiGiaDinhDoanhThu=201004,
    //#endregion Báo cáo

    //#region Quản trị

    //#region Nhóm cấu hình
    QuanTriNhomCauHinhNoiDungMauXuatPdf=210001,
    QuanTriNhomCauHinhThongSoMacDinh=210002,
    QuanTriNhomCauHinhNoiDungMau=210003,
    //#endregion Nhóm cấu hình

    //#region Nhóm dược phẩm
    QuanTriNhomDuocPhamDonViTinh=210101,
    QuanTriNhomDuocPhamDuocPham = 210102,
    QuanTriNhomDuocPhamDuongDung = 210103,
    QuanTriNhomDuocPhamNhaSanXuat = 210104,
    QuanTriNhomDuocPhamNhomThuoc = 210105,
    QuanTriNhomDuocPhamTuongTacThuoc = 210106,
    //#endregion Nhóm dược phẩm

    //#region Nhóm hành chính
    QuanTriNhomHanhChinhChucDanh=210201,
    QuanTriNhomHanhChinhChucVu = 210202,
    QuanTriNhomHanhChinhDanToc = 210203,
    QuanTriNhomHanhChinhDonViHanhChinh = 210204,
    QuanTriNhomHanhChinhNgheNghiep = 210205,
    QuanTriNhomHanhChinhQuocGia = 210206,
    QuanTriNhomHanhChinhVanBangChuyenMon = 210207,
    //#endregion Nhóm hành chính

    //#region Nhóm kho
    QuanTriNhomKhoKho=210301,
    QuanTriNhomKhoNhaCungCap = 210302,
    QuanTriNhomKhoViTriDeDuocPhamVatTu = 210303,
    //#endregion Nhóm kho

    //#region Nhóm khoa phòng
    QuanTriNhomKhoaPhongKhoaPhong=210401,
    QuanTriNhomKhoaPhongKhoaPhongNhanVien = 210402,
    QuanTriNhomKhoaPhongKhoaPhongPhongKham = 210403,
    //#endregion Nhóm khoa phòng

    //#region Nhóm người bệnh
    QuanTriNhomNguoiBenhNguoiBenh=210501,
    QuanTriNhomNguoiBenhQuanHeThanNhan = 210501,
    //#endregion Nhóm người bệnh

    //#region Nhóm nhân viên
    QuanTriNhomNhanVienHoSoNhanVien=210601,
    QuanTriNhomNhanVienPhanQuyenNguoiDung = 210602,
    QuanTriNhomNhanVienTaiKhoanNguoiDung = 210603,
    //#endregion Nhóm nhân viên

    //#region Nhóm phòng khám
    QuanTriNhomPhongKhamChanDoan=210701,
    QuanTriNhomPhongKhamDichVuKham = 210702,
    QuanTriNhomPhongKhamDichVuKyThuat = 210703,
    QuanTriNhomPhongKhamIcd = 210704,
    QuanTriNhomPhongKhamLoiDan = 210705,
    QuanTriNhomPhongKhamLyDoTiepNhan = 210706,
    QuanTriNhomPhongKhamNhomDichVu = 210707,
    QuanTriNhomPhongKhamNhomDichVuThuongDung = 210708,
    QuanTriNhomPhongKhamToaThuocMau = 210709,
    QuanTriNhomPhongKhamTrieuChung = 210710,
    QuanTriNhomPhongKhamBenhVien = 210711,
    //#endregion Nhóm phòng khám

    //#region Nhóm vật tư
    QuanTriNhomVatTuVatTu=210801,
    //#endregion Nhóm vật tư

    //#endregion Quản trị

    //#region Hướng dẫn sử dụng
    HuongDanSuDunguPhongKhamDaKhoa=220001,
    HuongDanSuDungBacSiGiaDinh=221001
    //#endregion Hướng dẫn sử dụng
}
export enum DataType {
    Boolean = 1,
    Integer = 2,
    String = 3,
    Double = 4,
    Date = 5,
    Time = 6,
    Datetime = 7,
    Phone = 8,
    Email = 9,
    List = 10
}
export enum UserType {
    BacSiGiaDinh = 1,
    PhongKhamDaKhoa = 2
}
