namespace Camino.Core.Domain
{
    public class MenuInfo
    {
        #region Trang chủ
        #region Phòng khám đa khoa  
        public bool CanViewTrangChuPhongKhamDaKhoa { get; set; }
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        public bool CanViewTrangChuBacSiGiaDinh { get; set; }
        #endregion Bác sĩ gia đình

        #endregion Trang chủ

        #region Tiếp nhận người bệnh

        #region Phòng khám đa khoa  
        public bool CanViewTiepNhanNguoiBenhPhongKhamDaKhoaLichHen { get; set; }
        public bool CanViewTiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan { get; set; }
        public bool CanViewTiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan { get; set; }
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        public bool CanViewTiepNhanNguoiBenhBacSiGiaDinhDangKyKham { get; set; }
        public bool CanViewTiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham { get; set; }
        #endregion Bác sĩ gia đình

        #endregion Tiếp nhận người bệnh

        #region Khám bệnh

        #region Phòng khám đa khoa  
        public bool CanViewKhamBenhPhongKhamDaKhoaBacSiKham { get; set; }
        public bool CanViewKhamBenhPhongKhamDaKhoaLichSuKham { get; set; }
        #endregion Phòng khám đa khoa  

        #region Bác sĩ gia đình
        public bool CanViewKhamBenhBacSiGiaDinhBacSiKham { get; set; }
        public bool CanViewKhamBenhBacSiGiaDinhLichSuBacSiKham { get; set; }
        #endregion Bác sĩ gia đình

        #endregion Khám bệnh

        #region CĐHA-TDCN
        public bool CanViewCdhaTdcnNhapKetQua { get; set; }
        public bool CanViewCdhaTdcnLichSuKetQua { get; set; }

        #region Danh mục
        public bool CanViewCdhaTdcnDanhMucTuDienDichVuKyThuat { get; set; }
        #endregion Danh mục

        #endregion CĐHA-TDCN

        #region Xét nghiệm
        public bool CanViewXetNghiemCapCode { get; set; }
        public bool CanViewXetNghiemKetQua { get; set; }

        #region Danh mục
        public bool CanViewXetNghiemDanhMucChiSoXetNghiem { get; set; }
        public bool CanViewXetNghiemDanhMucThietBiXetNghiem { get; set; }
        #endregion Danh mục

        #endregion Xét nghiệm

        #region Thủ thuật
        public bool CanViewThuThuatThucHienThuThuat { get; set; }
        public bool CanViewThuThuatLichSuThuThuat { get; set; }
        #endregion Thủ thuật

        #region Thu ngân
        public bool CanViewThuNganPhongKhamDaKhoaThuVienPhi { get; set; }
        public bool CanViewThuNganPhongKhamDaKhoaLichSuThuVienPhi { get; set; }
        public bool CanViewThuNganBacSiGiaDinhThuVienPhi { get; set; }
        public bool CanViewThuNganBacSiGiaDinhLichSuThuVienPhi { get; set; }

        #endregion Thu ngân

        #region Nhà thuốc
        public bool CanViewNhaThuocBanThuoc { get; set; }
        public bool CanViewNhaThuocLichSuBanThuoc { get; set; }
        #endregion Nhà thuốc

        #region Bảo hiểm y tế

        #region Xác nhận Bảo hiểm y tế
        public bool CanViewBaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan { get; set; }
        public bool CanViewBaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan { get; set; }
        #endregion Xác nhận Bảo hiểm y tế

        #region Gửi hồ sơ Bảo hiểm y tế
        public bool CanViewBaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui { get; set; }
        public bool CanViewBaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui { get; set; }
        public bool CanViewBaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu { get; set; }
        #endregion Gửi hồ sơ Bảo hiểm y tế

        #endregion Bảo hiểm y tế

        #region Nhập xuất 

        #region Dược phẩm
        public bool CanViewNhapXuatDuocPhamNhapKho { get; set; }
        public bool CanViewNhapXuatDuocPhamXuatKho { get; set; }
        public bool CanViewNhapXuatDuocPhamHoanTra { get; set; }
        #endregion Dược phẩm

        #region Vật tư
        public bool CanViewNhapXuatVatTuNhapKho { get; set; }
        public bool CanViewNhapXuatVatTuXuatKho { get; set; }
        public bool CanViewNhapXuatVatTuHoanTra { get; set; }
        #endregion Vật tư

        #endregion Nhập xuất

        #region Báo cáo
        #region Bác sĩ gia đình
        public bool CanViewBaoCaoBacSiGiaDinhHenKham { get; set; }
        public bool CanViewBaoCaoBacSiGiaDinhKhamBenh { get; set; }
        public bool CanViewBaoCaoBacSiGiaDinhPhatThuoc { get; set; }
        public bool CanViewBaoCaoBacSiGiaDinhDoanhThu { get; set; }
        #endregion Bác sĩ gia đình

        #endregion Báo cáo

        #region Quản trị

        #region Nhóm cấu hình
        public bool CanViewQuanTriNhomCauHinhNoiDungMauXuatPdf { get; set; }
        public bool CanViewQuanTriNhomCauHinhThongSoMacDinh { get; set; }
        public bool CanViewQuanTriNhomCauHinhNoiDungMau { get; set; }

        #endregion Nhóm cấu hình

        #region Nhóm dược phẩm
        public bool CanViewQuanTriNhomDuocPhamDonViTinh { get; set; }
        public bool CanViewQuanTriNhomDuocPhamDuocPham { get; set; }
        public bool CanViewQuanTriNhomDuocPhamDuongDung { get; set; }
        public bool CanViewQuanTriNhomDuocPhamNhaSanXuat { get; set; }
        public bool CanViewQuanTriNhomDuocPhamNhomThuoc { get; set; }
        public bool CanViewQuanTriNhomDuocPhamTuongTacThuoc { get; set; }
        #endregion Nhóm dược phẩm

        #region Nhóm hành chính
        public bool CanViewQuanTriNhomHanhChinhChucDanh { get; set; }
        public bool CanViewQuanTriNhomHanhChinhChucVu { get; set; }
        public bool CanViewQuanTriNhomHanhChinhDanToc { get; set; }
        public bool CanViewQuanTriNhomHanhChinhDonViHanhChinh { get; set; }
        public bool CanViewQuanTriNhomHanhChinhNgheNghiep { get; set; }
        public bool CanViewQuanTriNhomHanhChinhQuocGia { get; set; }
        public bool CanViewQuanTriNhomHanhChinhVanBangChuyenMon { get; set; }
        #endregion Nhóm hành chính

        #region Nhóm kho
        public bool CanViewQuanTriNhomKhoKho { get; set; }
        public bool CanViewQuanTriNhomKhoNhaCungCap { get; set; }
        public bool CanViewQuanTriNhomKhoViTriDeDuocPhamVatTu { get; set; }
        #endregion Nhóm kho

        #region Nhóm khoa phòng
        public bool CanViewQuanTriNhomKhoaPhongKhoaPhong { get; set; }
        public bool CanViewQuanTriNhomKhoaPhongKhoaPhongNhanVien { get; set; }
        public bool CanViewQuanTriNhomKhoaPhongKhoaPhongPhongKham { get; set; }
        #endregion Nhóm khoa phòng

        #region Nhóm người bệnh
        public bool CanViewQuanTriNhomNguoiBenhNguoiBenh { get; set; }
        public bool CanViewQuanTriNhomNguoiBenhQuanHeThanNhan { get; set; }
        #endregion Nhóm người bệnh

        #region Nhóm nhân viên
        public bool CanViewQuanTriNhomNhanVienHoSoNhanVien { get; set; }
        public bool CanViewQuanTriNhomNhanVienPhanQuyenNguoiDung { get; set; }
        public bool CanViewQuanTriNhomNhanVienTaiKhoanNguoiDung { get; set; }
        #endregion Nhóm nhân viên

        #region Nhóm phòng khám
        public bool CanViewQuanTriNhomPhongKhamChanDoan { get; set; }
        public bool CanViewQuanTriNhomPhongKhamDichVuKham { get; set; }
        public bool CanViewQuanTriNhomPhongKhamDichVuKyThuat { get; set; }
        public bool CanViewQuanTriNhomPhongKhamIcd { get; set; }
        public bool CanViewQuanTriNhomPhongKhamLoiDan { get; set; }
        public bool CanViewQuanTriNhomPhongKhamLyDoTiepNhan { get; set; }
        public bool CanViewQuanTriNhomPhongKhamNhomDichVu { get; set; }
        public bool CanViewQuanTriNhomPhongKhamNhomDichVuThuongDung { get; set; }
        public bool CanViewQuanTriNhomPhongKhamToaThuocMau { get; set; }
        public bool CanViewQuanTriNhomPhongKhamTrieuChung { get; set; }
        public bool CanViewQuanTriNhomPhongKhamBenhVien { get; set; }

        #endregion Nhóm phòng khám

        #region Nhóm vật tư
        public bool CanViewQuanTriNhomVatTuVatTu { get; set; }
        #endregion Nhóm vật tư

        #endregion Quản trị


        #region Hướng dẫn sử dụng
        public bool CanViewHuongDanSuDungPhongKhamDaKhoa { get; set; }
        public bool CanViewHuongDanSuDungBacSiGiaDinh { get; set; }
        #endregion
    }
}
