namespace Camino.Data.Mapping
{

    public static class MappingDefaults
    {
        #region Users 
        public static string UserTable => "User";
        public static string RoleTable => "Role";
        public static string RoleFunctionTable => "RoleFunction";
        public static string UserMessagingTokenTable => "UserMessagingToken";
        public static string UserMessagingTokenSubscribeTable => "UserMessagingTokenSubscribe";
        public static string NhanVienTable => "NhanVien";
        public static string NhanVienRoleTable => "NhanVienRole";
        public static string NhatKyHeThongTable => "NhatKyHeThong";
        #endregion

        #region Localization
        public static string LocaleStringResourceTable => "LocaleStringResource";
        #endregion

        #region Messages
        public static string LichSuEmailTable => "LichSuEmail";
        public static string LichSuThongBaoTable => "LichSuThongBao";
        public static string LichSuSMSTable => "LichSuSMS";
        public static string MessagingTemplateTable => "MessagingTemplate";
        public static string QueuedCloudMessagingTable => "QueuedCloudMessaging";
        public static string QueuedEmailTable => "QueuedEmail";
        public static string QueuedSmsTable => "QueuedSms";
        #endregion

        #region CauHinhs
        public static string CauHinhTable => "CauHinh";
        public static string NoiDungMauTable => "NoiDungMau";
        #endregion
        #region Common
        #endregion

        #region Nhóm phòng khám
        public static string IcdTable => "ICD";
        public static string DichVuKhamBenhTable => "DichVuKhamBenh";
        public static string DichVuKhamBenhGiaTable => "DichVuKhamBenhGia";
        public static string DichVuKyThuatTable => "DichVuKyThuat";
        public static string DichVuKyThuatGiaTable => "DichVuKyThuatGia";
        public static string BenhVienTable => "BenhVien";
        public static string LoaiBenhVienTable => "LoaiBenhVien";
        public static string ToaThuocMauTable => "ToaThuocMau";
        public static string ToaThuocMauChiTietTable => "ToaThuocMauChiTiet";
        public static string TrieuChungTable => "TrieuChung";
        public static string NhomDichVuThuongDungTable => "GoiDichVu";

        public static string GoiDichVuChiTietDichVuKhamBenhTable => "GoiDichVuChiTietDichVuKhamBenh";
        public static string GoiDichVuChiTietDichVuKyThuatTable => "GoiDichVuChiTietDichVuKyThuat";

        public static string NhomDichVuBenhVienTable => "NhomDichVuBenhVien";

        #endregion
        #region Nhóm hành chính
        public static string DonViHanhChinhTable => "DonViHanhChinh";
        public static string NgheNghiepTable => "NgheNghiep";
        public static string QuocGiaTable => "QuocGia";
        public static string DanTocTable => "DanToc";
        public static string ChucDanhTable => "ChucDanh";
        public static string ChucVuTable => "ChucVu";
        public static string VanBangChuyenMonTable => "VanBangChuyenMon";
        #endregion
        #region Nhóm người bệnh
        public static string NguoiBenhTable => "NguoiBenh";
        public static string QuanHeNhanThanTable => "QuanHeNhanThan";
        #endregion
        #region Nhóm khoa phòng
        public static string KhoaPhongTable => "KhoaPhong";
        public static string KhoaPhongPhongKhamTable => "KhoaPhongPhongKham";
        public static string KhoaPhongNhanVienTable => "KhoaPhongNhanVien";
        #endregion
        #region Nhóm dược phẩm
        public static string DuocPhamTable => "DuocPham";
        public static string DuocPhamGiaTable => "DuocPhamGia";
        public static string DuongDungTable => "DuongDung";
        public static string DonViTinhTable => "DonViTinh";
        public static string NhaSanXuatTable => "NhaSanXuat";
        public static string NhomThuocTable => "NhomThuoc";
        public static string TuongTacThuocTable => "TuongTacThuoc";
        public static string ThuocHoacHoatChatTable => "ThuocHoacHoatChat";
        #endregion

        #region Tiếp nhận
        public static string YeuCauTiepNhanTable => "YeuCauTiepNhan";
        public static string YeuCauTiepNhanChiSoSinhTonTable => "YeuCauTiepNhanChiSoSinhTon";
        #endregion
        #region Khám bệnh
        public static string YeuCauKhamBenhTable => "YeuCauKhamBenh";
        public static string YeuCauDichVuKyThuatTable => "YeuCauDichVuKyThuat";
        public static string YeuCauKhamBenhDonThuocTable => "YeuCauKhamBenhDonThuoc";
        public static string YeuCauKhamBenhDonThuocChiTietTable => "YeuCauKhamBenhDonThuocChiTiet";
        public static string YeuCauKhamBenhHinhAnhCanLamSangTable => "YeuCauKhamBenhHinhAnhCanLamSang";
        public static string YeuCauKhamBenhLichSuTrangThaiTable => "YeuCauKhamBenhLichSuTrangThai";
        public static string YeuCauDichVuKyThuatLichSuTrangThaiTable => "YeuCauDichVuKyThuatLichSuTrangThai";
        public static string YeuCauTiepNhanLichSuTrangThaiTable => "YeuCauTiepNhanLichSuTrangThai";
        #endregion
        #region Thu ngân
        public static string PhieuThuTable => "PhieuThu";
        public static string PhieuChiTable => "PhieuChi";
        #endregion

        #region Template
        public static string TemplateTable => "Template";
        #endregion
        #region Hướng dẫn sử dụng
        public static string HuongDanSuDungTable => "HuongDanSuDung";
        #endregion
        #region Nhom Kho
        public static string NhaCungCapTable => "NhaCungCap";
        public static string KhoTable => "Kho";
        public static string ViTriDeDuocPhamVatTuTable => "ViTriDeDuocPhamVatTu";
        #endregion
        #region Nhom vật tư
        public static string NhomVatTuTable => "NhomVatTu";
        #endregion
    }
}
