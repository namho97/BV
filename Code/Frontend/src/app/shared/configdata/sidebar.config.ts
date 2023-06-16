
import { DocumentType, UserType } from 'src/app/shared/enum/document-type.enum';


export const sidebarConfig: any[] = [
    //Phòng khám đa khoa   
    { type: 'link', label: 'Trang chủ', route: '/bac-si-gia-dinh/trang-chu',icon:"dashboard",siteType:[UserType.BacSiGiaDinh],canViewType:DocumentType.TrangChuBacSiGiaDinh },

    //Bác sĩ gia đình
    { type: 'link', label: 'Trang chủ', route: '/phong-kham-da-khoa/trang-chu',icon:"dashboard",siteType:[UserType.PhongKhamDaKhoa],canViewType:DocumentType.TrangChuPhongKhamDaKhoa },
    {
        type: 'link', label: 'Tiếp nhận', route: '/tiep-nhan-nguoi-benh',icon:"person_add" ,
        children: [        
            //Phòng khám đa khoa    
            { type: 'link', label: 'Lịch hẹn', route: '/tiep-nhan-nguoi-benh/lich-hen', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichHen },
            { type: 'link', label: 'Tiếp nhận', route: '/tiep-nhan-nguoi-benh/tao-tiep-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan },            
            { type: 'link', label: 'Lịch sử tiếp nhận', route: '/tiep-nhan-nguoi-benh/lich-su-tiep-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaLichSuTiepNhan },
            
            //Bác sĩ gia đình
            { type: 'link', label: 'Đăng ký khám', route: '/tiep-nhan-nguoi-benh/bac-si-gia-dinh/dang-ky-kham', queryParams:{id: 0}, children: [],siteType:[UserType.BacSiGiaDinh] , canViewType: DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham },
            { type: 'link', label: 'Lịch sử đăng ký khám', route: '/tiep-nhan-nguoi-benh/bac-si-gia-dinh/lich-su-dang-ky-kham', children: [],siteType:[UserType.BacSiGiaDinh] , canViewType: DocumentType.TiepNhanNguoiBenhBacSiGiaDinhLichSuDangKyKham }
        ]
    },
    {
        type: 'link', label: 'Khám bệnh', route: '/kham-benh',icon:"medical_services",
        children: [
            //Phòng khám đa khoa
            { type: 'link', label: 'Bác sĩ khám', route: '/kham-benh/bac-si-kham', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham },
            { type: 'link', label: 'Lịch sử khám', route: '/kham-benh/lich-su-kham', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.KhamBenhPhongKhamDaKhoaLichSuKham },
            
            //Bác sĩ gia đình
            { type: 'link', label: 'Bác sĩ khám', route: '/kham-benh/bac-si-gia-dinh/bac-si-kham', children: [],siteType:[UserType.BacSiGiaDinh] , canViewType: DocumentType.KhamBenhBacSiGiaDinhBacSiKham },
            { type: 'link', label: 'Lịch sử khám', route: '/kham-benh/bac-si-gia-dinh/lich-su-kham', children: [],siteType:[UserType.BacSiGiaDinh] , canViewType: DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham }
        ]
    },
    {
        type: 'link', label: 'CĐHA-TDCN', route: '/cdha-tdcn',icon:"monitor_heart",
        children: [
            { type: 'link', label: 'Nhập kết quả', route: '/cdha-tdcn/nhap-ket-qua', children: [],siteType:[UserType.PhongKhamDaKhoa] , canViewType: DocumentType.CdhaTdcnNhapKetQua },
            { type: 'link', label: 'Lịch sử CĐHA-TDCN', route: '/cdha-tdcn/lich-su-cdha-tdcn', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.CdhaTdcnLichSuKetQua },
            { 
                type: 'link', label: 'Danh mục', route: '/cdha-tdcn/danh-muc', 
                children: [
                    { type: 'link', label: 'Từ điển dịch vụ kỹ thuật', route: '/cdha-tdcn/danh-muc/tu-dien-dich-vu-ky-thuat', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.CdhaTdcnDanhMucTuDienDichVuKyThuat }
                    
                ]
            }
        ]
    },
    {
        type: 'link', label: 'Xét nghiệm', route: '/xet-nghiem',icon:"biotech",
        children: [
            { type: 'link', label: 'Cấp code', route: '/xet-nghiem/cap-code', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.XetNghiemCapCode },
            { type: 'link', label: 'Kết quả', route: '/xet-nghiem/ket-qua', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.XetNghiemKetQua },
            { 
                type: 'link', label: 'Danh mục', route: '/xet-nghiem/danh-muc', 
                children: [
                    { type: 'link', label: 'Chỉ số xét nghiệm', route: '/xet-nghiem/danh-muc/chi-so-xet-nghiem', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.XetNghiemDanhMucChiSoXetNghiem },
                    { type: 'link', label: 'Thiết bị xét nghiệm', route: '/xet-nghiem/danh-muc/thiet-bi-xet-nghiem', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.XetNghiemDanhMucThietBiXetNghiem }
                ]
            }
        ]
    },
    {
        type: 'link', label: 'Thủ thuật', route: '/thu-thuat',icon:"healing",
        children: [
            { type: 'link', label: 'Thực hiện thủ thuật', route: '/thu-thuat/thuc-hien-thu-thuat', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.ThuThuatThucHienThuThuat },
            { type: 'link', label: 'Lịch sử thủ thuật', route: '/thu-thuat/lich-su-thu-thuat', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.ThuThuatLichSuThuThuat }
        ]
    },
    {
        type: 'link', label: 'Thu ngân', route: '/thu-ngan',icon:"paid",
        children: [
            //Phòng khám đa khoa
            { type: 'link', label: 'Thu viện phí', route: '/thu-ngan/thu-vien-phi', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.ThuNganPhongKhamDaKhoaThuVienPhi },
            { type: 'link', label: 'Lịch sử thu viện phí', route: '/thu-ngan/lich-su-thu-vien-phi', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.ThuNganPhongKhamDaKhoaLichSuThuVienPhi },

            //Bác sĩ gia đình
            { type: 'link', label: 'Thu viện phí', route: '/thu-ngan/bac-si-gia-dinh/thu-vien-phi', children: [],siteType:[UserType.BacSiGiaDinh] , canViewType: DocumentType.ThuNganBacSiGiaDinhThuVienPhi },
            { type: 'link', label: 'Lịch sử thu viện phí', route: '/thu-ngan/bac-si-gia-dinh/lich-su-thu-vien-phi', children: [],siteType:[UserType.BacSiGiaDinh], canViewType: DocumentType.ThuNganBacSiGiaDinhLichSuThuVienPhi },
            
        ]
    },
    {
        type: 'link', label: 'Nhà thuốc', route: '/nha-thuoc',icon:"store",
        children: [
            { type: 'link', label: 'Bán thuốc', route: '/nha-thuoc/ban-thuoc', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhaThuocBanThuoc },
            { type: 'link', label: 'Lịch sử bán thuốc', route: '/nha-thuoc/lich-su-ban-thuoc', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhaThuocLichSuBanThuoc }
        ]
    },
    {
        type: 'link', label: 'Bảo hiểm y tế', route: '/bao-hiem-y-te',icon:"verified_user",
        children: [
            { 
                type: 'link', label: 'Xác nhận BHYT', route: '/bao-hiem-y-te/xac-nhan',
                children: [
                    { type: 'link', label: 'Thực hiện xác nhận', route: '/bao-hiem-y-te/xac-nhan/thuc-hien-xac-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoHiemYTeXacNhanBaoHiemYTeThucHienXacNhan },
                    { type: 'link', label: 'Lịch sử xác nhận', route: '/bao-hiem-y-te/xac-nhan/lich-su-xac-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoHiemYTeXacNhanBaoHiemYTeLichSuXacNhan },
                ]
            },
            { 
                type: 'link', label: 'Gửi hồ sơ BHYT', route: '/bao-hiem-y-te/goi-ho-so',
                children: [
                    { type: 'link', label: 'Thực hiện gửi', route: '/bao-hiem-y-te/goi-ho-so/thuc-hien-gui', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeThucHienGui },
                    { type: 'link', label: 'Lịch sử gửi', route: '/bao-hiem-y-te/goi-ho-so/lich-su-gui', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeLichSuGui },
                    { type: 'link', label: 'Xuất excel chứng từ', route: '/bao-hiem-y-te/goi-ho-so/xuat-excel-chung-tu', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoHiemYTeGuiHoSoBaoHiemYTeXuatExcelChungTu },
                ]
            },
        ]
    },
    {
        type: 'link', label: 'Nhập xuất', route: '/nhap-xuat',icon:"import_export",
        children: [
            {
                type: 'link', label: 'Dược phẩm', route: '/nhap-xuat/duoc-pham',
                children: [
                    { type: 'link', label: 'Nhập kho', route: '/nhap-xuat/duoc-pham/nhap-kho', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatDuocPhamNhapKho },
                    { type: 'link', label: 'Xuất kho', route: '/nhap-xuat/duoc-pham/xuat-kho', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatDuocPhamXuatKho },
                    { type: 'link', label: 'Hoàn trả', route: '/nhap-xuat/duoc-pham/hoan-tra', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatDuocPhamHoanTra }
                ]
            },
            {
                type: 'link', label: 'Vật tư', route: '/nhap-xuat/vat-tu',
                children: [
                    { type: 'link', label: 'Nhập kho', route: '/nhap-xuat/vat-tu/nhap-kho', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatVatTuNhapKho },
                    { type: 'link', label: 'Xuất kho', route: '/nhap-xuat/vat-tu/xuat-kho', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatVatTuXuatKho },
                    { type: 'link', label: 'Hoàn trả', route: '/nhap-xuat/vat-tu/hoan-tra', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.NhapXuatVatTuHoanTra }
                ]
            }
        ]
    },
    {
        type: 'link', label: 'Báo cáo', route: '/bao-cao',icon:"summarize",
        children: [
            //Bác sĩ gia đình
            { type: 'link', label: 'Hẹn khám', route: '/bao-cao/bac-si-gia-dinh/hen-kham', children: [],siteType:[UserType.BacSiGiaDinh], canViewType: DocumentType.BaoCaoBacSiGiaDinhHenKham },
            { type: 'link', label: 'Khám bệnh', route: '/bao-cao/bac-si-gia-dinh/kham-benh', children: [],siteType:[UserType.BacSiGiaDinh], canViewType: DocumentType.BaoCaoBacSiGiaDinhKhamBenh },
            { type: 'link', label: 'Phát thuốc', route: '/bao-cao/bac-si-gia-dinh/phat-thuoc', children: [],siteType:[UserType.BacSiGiaDinh], canViewType: DocumentType.BaoCaoBacSiGiaDinhPhatThuoc },
            { type: 'link', label: 'Doanh thu', route: '/bao-cao/bac-si-gia-dinh/doanh-thu', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.BaoCaoBacSiGiaDinhDoanhThu }
        ]
    },
    {
        type: 'link', label: 'Quản trị', route: '/quan-tri',icon:"settings",
        children: [
            { 
                type: 'link', label: 'Nhóm hành chính', route: '/quan-tri/nhom-hanh-chinh', children: [
                    { type: 'link', label: 'Nghề nghiệp', route: '/quan-tri/nhom-hanh-chinh/nghe-nghiep', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhNgheNghiep },
                    { type: 'link', label: 'Chức vụ', route: '/quan-tri/nhom-hanh-chinh/chuc-vu', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhChucVu },
                    { type: 'link', label: 'Chức danh', route: '/quan-tri/nhom-hanh-chinh/chuc-danh', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhChucDanh },
                    { type: 'link', label: 'Văn bằng chuyên môn', route: '/quan-tri/nhom-hanh-chinh/van-ban-chuyen-mon', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhVanBangChuyenMon },
                    { type: 'link', label: 'Quốc gia', route: '/quan-tri/nhom-hanh-chinh/quoc-gia', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhQuocGia },
                    { type: 'link', label: 'Dân tộc', route: '/quan-tri/nhom-hanh-chinh/dan-toc', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhDanToc },
                    { type: 'link', label: 'Đơn vị hành chính', route: '/quan-tri/nhom-hanh-chinh/don-vi-hanh-chinh', children: [],siteType:[UserType.BacSiGiaDinh, UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomHanhChinhDonViHanhChinh }
                ]
            },
            { 
                type: 'link', label: 'Nhóm phòng khám', route: '/quan-tri/nhom-phong-kham', children: [
                    { type: 'link', label: 'Dịch vụ khám', route: '/quan-tri/nhom-phong-kham/dich-vu-kham', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamDichVuKham },
                    { type: 'link', label: 'Dịch vụ kỹ thuật', route: '/quan-tri/nhom-phong-kham/dich-vu-ky-thuat', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamDichVuKyThuat },
                    { type: 'link', label: 'ICD', route: '/quan-tri/nhom-phong-kham/icd', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamIcd },
                    { type: 'link', label: 'Triệu chứng', route: '/quan-tri/nhom-phong-kham/trieu-chung', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamTrieuChung },
                    { type: 'link', label: 'Chẩn đoán', route: '/quan-tri/nhom-phong-kham/chan-doan', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamChanDoan },
                    //{ type: 'link', label: 'Lời dặn', route: '/quan-tri/nhom-phong-kham/loi-dan', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamLoiDan },
                    { type: 'link', label: 'Toa thuốc mẫu', route: '/quan-tri/nhom-phong-kham/toa-thuoc-mau', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamToaThuocMau },
                    { type: 'link', label: 'Lý do tiếp nhận', route: '/quan-tri/nhom-phong-kham/ly-do-tiep-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamLyDoTiepNhan },
                    { type: 'link', label: 'Nhóm dịch vụ thường dùng', route: '/quan-tri/nhom-phong-kham/nhom-dich-vu-thuong-dung', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamNhomDichVuThuongDung },
                    { type: 'link', label: 'Nhóm dịch vụ', route: '/quan-tri/nhom-phong-kham/nhom-dich-vu', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamNhomDichVu },
                    { type: 'link', label: 'Bệnh viện', route: '/quan-tri/nhom-phong-kham/benh-vien', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomPhongKhamBenhVien }
                ]
            }, { 
                type: 'link', label: 'Nhóm người bệnh', route: '/quan-tri/nhom-nguoi-benh', children: [
                    { type: 'link', label: 'Người bệnh', route: '/quan-tri/nhom-nguoi-benh/nguoi-benh', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomNguoiBenhNguoiBenh },
                    { type: 'link', label: 'Quan hệ thân nhân', route: '/quan-tri/nhom-nguoi-benh/quan-he-than-nhan', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomNguoiBenhQuanHeThanNhan }
                ]
            }, { 
                type: 'link', label: 'Nhóm khoa phòng', route: '/quan-tri/nhom-khoa-phong', children: [
                    { type: 'link', label: 'Khoa phòng', route: '/quan-tri/nhom-khoa-phong/khoa-phong', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoaPhongKhoaPhong },
                    { type: 'link', label: 'Khoa phòng - Phòng khám', route: '/quan-tri/nhom-khoa-phong/khoa-phong-phong-kham', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoaPhongKhoaPhongPhongKham },
                    { type: 'link', label: 'Khoa phòng - Nhân viên', route: '/quan-tri/nhom-khoa-phong/khoa-phong-nhan-vien', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoaPhongKhoaPhongNhanVien },
                ]
            }, { 
                type: 'link', label: 'Nhóm nhân viên', route: '/quan-tri/nhom-nhan-vien', children: [
                    { type: 'link', label: 'Hồ sơ nhân viên', route: '/quan-tri/nhom-nhan-vien/ho-so-nhan-vien', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomNhanVienHoSoNhanVien },
                    { type: 'link', label: 'Phân quyền người dùng', route: '/quan-tri/nhom-nhan-vien/phan-quyen-nguoi-dung', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomNhanVienPhanQuyenNguoiDung }
                ]
            },{ 
                type: 'link', label: 'Nhóm dược phẩm', route: '/quan-tri/nhom-duoc-pham', children: [
                    { type: 'link', label: 'Dược phẩm', route: '/quan-tri/nhom-duoc-pham/duoc-pham', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamDuocPham },
                    { type: 'link', label: 'Nhà sản xuất', route: '/quan-tri/nhom-duoc-pham/nha-san-xuat', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamNhaSanXuat },
                    { type: 'link', label: 'Đơn vị tính', route: '/quan-tri/nhom-duoc-pham/don-vi-tinh', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamDonViTinh },
                    { type: 'link', label: 'Đường dùng', route: '/quan-tri/nhom-duoc-pham/duong-dung', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamDuongDung },
                    { type: 'link', label: 'Nhóm thuốc', route: '/quan-tri/nhom-duoc-pham/nhom-thuoc', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamNhomThuoc },
                    { type: 'link', label: 'Tương tác thuốc', route: '/quan-tri/nhom-duoc-pham/tuong-tac-thuoc', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomDuocPhamTuongTacThuoc }
                ]
            },{ 
                type: 'link', label: 'Nhóm vật tư', route: '/quan-tri/nhom-vat-tu', children: [
                    { type: 'link', label: 'Vật tư', route: '/quan-tri/nhom-vat-tu/vat-tu', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomVatTuVatTu }
                    
                ]
            },{ 
                type: 'link', label: 'Nhóm kho', route: '/quan-tri/nhom-kho', children: [
                    { type: 'link', label: 'Kho', route: '/quan-tri/nhom-kho/kho', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoKho },
                    { type: 'link', label: 'Vị trí để DP/VT', route: '/quan-tri/nhom-kho/vi-tri-de-duoc-pham-vat-tu', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoViTriDeDuocPhamVatTu },
                    { type: 'link', label: 'Nhà cung cấp', route: '/quan-tri/nhom-kho/nha-cung-cap', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomKhoNhaCungCap }
                ]
            },{ 
                type: 'link', label: 'Nhóm cấu hình', route: '/quan-tri/nhom-cau-hinh', children: [
                    { type: 'link', label: 'Thông số mặc định', route: '/quan-tri/nhom-cau-hinh/thong-so-mac-dinh', children: [],siteType:[UserType.BacSiGiaDinh,UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomCauHinhThongSoMacDinh },
                    { type: 'link', label: 'Nội dung mẫu', route: '/quan-tri/nhom-cau-hinh/noi-dung-mau', children: [],siteType:[UserType.BacSiGiaDinh], canViewType: DocumentType.QuanTriNhomCauHinhNoiDungMau },
                    { type: 'link', label: 'Nội dung mẫu xuất ra PDF', route: '/quan-tri/nhom-cau-hinh/noi-dung-mau-xuat-ra-pdf', children: [],siteType:[UserType.PhongKhamDaKhoa], canViewType: DocumentType.QuanTriNhomCauHinhNoiDungMauXuatPdf }
                   
                ]
            },
        ]
    },
    //Phòng khám đa khoa   
    { type: 'link', label: 'Hướng dẫn sử dụng', route: '/bac-si-gia-dinh/huong-dan-su-dung',icon:"menu_book",siteType:[UserType.BacSiGiaDinh],canViewType:DocumentType.HuongDanSuDungBacSiGiaDinh },

    //Bác sĩ gia đình
    { type: 'link', label: 'Hướng dẫn sử dụng', route: '/phong-kham-da-khoa/huong-dan-su-dung',icon:"menu_book",siteType:[UserType.PhongKhamDaKhoa],canViewType:DocumentType.HuongDanSuDunguPhongKhamDaKhoa },
];
