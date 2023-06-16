import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guard.service';
import { MainComponent } from './main.component';

const mainChildRoutes: Routes = [
  
  //#region Chung
  {
    path: 'bac-si-gia-dinh/trang-chu',
    loadChildren: () => import('./trang-chu/bac-si-gia-dinh/trang-chu.module').then(o => o.TrangChuModule)
  },
  {
    path: 'phong-kham-da-khoa/trang-chu',
    loadChildren: () => import('./trang-chu/phong-kham-da-khoa/trang-chu.module').then(o => o.TrangChuModule)
  },
  {
    path: 'tai-khoan',
    loadChildren: () => import('./thong-tin-tai-khoan/tai-khoan/tai-khoan.module').then(o => o.TaiKhoanModule)
  },
  //#endregion Chung

  //#region Tiếp nhận
  //Phòng khám đa khoa    
  {
    path: 'tiep-nhan-nguoi-benh/tao-tiep-nhan',
    loadChildren: () => import('./tiep-nhan-benh-nhan/phong-kham-da-khoa/tao-tiep-nhan/tao-tiep-nhan.module').then(o => o.TaoTiepNhanModule)
  },
  {
    path: 'tiep-nhan-nguoi-benh/lich-hen',
    loadChildren: () => import('./tiep-nhan-benh-nhan/phong-kham-da-khoa/lich-hen/lich-hen.module').then(o => o.LichHenModule)
  },
  {
    path: 'tiep-nhan-nguoi-benh/lich-su-tiep-nhan',
    loadChildren: () => import('./tiep-nhan-benh-nhan/phong-kham-da-khoa/lich-su-tiep-nhan/lich-su-tiep-nhan.module').then(o => o.LichSuTiepNhanModule)
  },

  //Bác sĩ gia đình
  {
    path: 'tiep-nhan-nguoi-benh/bac-si-gia-dinh/dang-ky-kham',
    loadChildren: () => import('./tiep-nhan-benh-nhan/bac-si-gia-dinh/dang-ky-kham/dang-ky-kham.module').then(o => o.DangKyKhamModule)
  },
  {
    path: 'tiep-nhan-nguoi-benh/bac-si-gia-dinh/lich-su-dang-ky-kham',
    loadChildren: () => import('./tiep-nhan-benh-nhan/bac-si-gia-dinh/lich-su-dang-ky-kham/lich-su-dang-ky-kham.module').then(o => o.LichSuDangKyKhamModule)
  },
  //#endregion Tiếp nhận

  //#region Khám bệnh
  //Phòng khám đa khoa    
  {
    path: 'kham-benh/bac-si-kham',
    loadChildren: () => import('./kham-benh/phong-kham-da-khoa/bac-si-kham/bac-si-kham.module').then(o => o.BacSiKhamModule)
  },
  {
    path: 'kham-benh/lich-su-kham',
    loadChildren: () => import('./kham-benh/phong-kham-da-khoa/lich-su-kham/lich-su-kham.module').then(o => o.LichSuKhamModule)
  },

  //Bác sĩ gia đình
  {
    path: 'kham-benh/bac-si-gia-dinh/bac-si-kham',
    loadChildren: () => import('./kham-benh/bac-si-gia-dinh/bac-si-kham/bac-si-kham.module').then(o => o.BacSiKhamModule)
  },
  {
    path: 'kham-benh/bac-si-gia-dinh/lich-su-kham',
    loadChildren: () => import('./kham-benh/bac-si-gia-dinh/lich-su-kham/lich-su-kham.module').then(o => o.LichSuKhamModule)
  },
  //#endregion Khám bệnh
  
  //#region CDHA-TDCN
  {
    path: 'cdha-tdcn/nhap-ket-qua',
    loadChildren: () => import('./cdha-tdcn/nhap-ket-qua/nhap-ket-qua.module').then(o => o.NhapKetQuaModule)
  },
  {
    path: 'cdha-tdcn/lich-su-cdha-tdcn',
    loadChildren: () => import('./cdha-tdcn/lich-su-cdha-tdcn/lich-su-cdha-tdcn.module').then(o => o.LichSuCdhaTdcnModule)
  },
  {
    path: 'cdha-tdcn/danh-muc/tu-dien-dich-vu-ky-thuat',
    loadChildren: () => import('./cdha-tdcn/danh-muc/tu-dien-dich-vu-ky-thuat/tu-dien-dich-vu-ky-thuat.module').then(o => o.TuDienDichVuKyThuatModule)
  },
  //#endregion CDHA-TDCN
  
  //#region Xét nghiệm
  {
    path: 'xet-nghiem/cap-code',
    loadChildren: () => import('./xet-nghiem/cap-code/cap-code.module').then(o => o.CapCodeModule)
  },
  {
    path: 'xet-nghiem/ket-qua',
    loadChildren: () => import('./xet-nghiem/ket-qua/ket-qua.module').then(o => o.KetQuaModule)
  },
  {
    path: 'xet-nghiem/danh-muc/chi-so-xet-nghiem',
    loadChildren: () => import('./xet-nghiem/danh-muc/chi-so-xet-nghiem/chi-so-xet-nghiem.module').then(o => o.ChiSoXetNghiemModule)
  },
  {
    path: 'xet-nghiem/danh-muc/thiet-bi-xet-nghiem',
    loadChildren: () => import('./xet-nghiem/danh-muc/thiet-bi-xet-nghiem/thiet-bi-xet-nghiem.module').then(o => o.ThietBiXetNghiemModule)
  },
  //#endregion Xét nghiệm
  
  //#region Thủ thuật
  {
    path: 'thu-thuat/thuc-hien-thu-thuat',
    loadChildren: () => import('./thu-thuat/thuc-hien-thu-thuat/thuc-hien-thu-thuat.module').then(o => o.ThucHienThuThuatModule)
  },
  {
    path: 'thu-thuat/lich-su-thu-thuat',
    loadChildren: () => import('./thu-thuat/lich-su-thu-thuat/lich-su-thu-thuat.module').then(o => o.LichSuThuThuatModule)
  },
  //#endregion Thủ thuật
  
  //#region Thu ngân
  //Phòng khám đa khoa
  {
    path: 'thu-ngan/thu-vien-phi',
    loadChildren: () => import('./thu-ngan/phong-kham-da-khoa/thu-vien-phi/thu-vien-phi.module').then(o => o.ThuVienPhiModule)
  },
  {
    path: 'thu-ngan/lich-su-thu-vien-phi',
    loadChildren: () => import('./thu-ngan/phong-kham-da-khoa/lich-su-thu-vien-phi/lich-su-thu-vien-phi.module').then(o => o.LichSuThuVienPhiModule)
  },
  //Bác sĩ gia đình
  {
    path: 'thu-ngan/bac-si-gia-dinh/thu-vien-phi',
    loadChildren: () => import('./thu-ngan/bac-si-gia-dinh/thu-vien-phi/thu-vien-phi.module').then(o => o.ThuVienPhiModule)
  },
  {
    path: 'thu-ngan/bac-si-gia-dinh/lich-su-thu-vien-phi',
    loadChildren: () => import('./thu-ngan/bac-si-gia-dinh/lich-su-thu-vien-phi/lich-su-thu-vien-phi.module').then(o => o.LichSuThuVienPhiModule)
  },
  //#endregion Thu ngân
  
  //#region Nhà thuốc
  {
    path: 'nha-thuoc/ban-thuoc',
    loadChildren: () => import('./nha-thuoc/ban-thuoc/ban-thuoc.module').then(o => o.BanThuocModule)
  },
  {
    path: 'nha-thuoc/lich-su-ban-thuoc',
    loadChildren: () => import('./nha-thuoc/lich-su-ban-thuoc/lich-su-ban-thuoc.module').then(o => o.LichSuBanThuocModule)
  },
  //#endregion Nhà thuốc
  
  //#region BHYT
  {
    path: 'bao-hiem-y-te/xac-nhan/thuc-hien-xac-nhan',
    loadChildren: () => import('./bao-hiem-y-te/xac-nhan-bhyt/thuc-hien-xac-nhan/thuc-hien-xac-nhan.module').then(o => o.ThucHienXacNhanModule)
  },
  {
    path: 'bao-hiem-y-te/xac-nhan/lich-su-xac-nhan',
    loadChildren: () => import('./bao-hiem-y-te/xac-nhan-bhyt/lich-su-xac-nhan/lich-su-xac-nhan.module').then(o => o.LichSuXacNhanModule)
  },
  {
    path: 'bao-hiem-y-te/goi-ho-so/thuc-hien-gui',
    loadChildren: () => import('./bao-hiem-y-te/gui-ho-so-bhyt/thuc-hien-gui/thuc-hien-gui.module').then(o => o.ThucHienGuiModule)
  },
  {
    path: 'bao-hiem-y-te/goi-ho-so/lich-su-gui',
    loadChildren: () => import('./bao-hiem-y-te/gui-ho-so-bhyt/lich-su-gui/lich-su-gui.module').then(o => o.LichSuGuiModule)
  },
  {
    path: 'bao-hiem-y-te/goi-ho-so/xuat-excel-chung-tu',
    loadChildren: () => import('./bao-hiem-y-te/gui-ho-so-bhyt/xuat-excel-chung-tu/xuat-excel-chung-tu.module').then(o => o.XuatExcelChungTuModule)
  },
  //#endregion BHYT
  
  //#region Nhập xuất
  {
    path: 'nhap-xuat/duoc-pham/nhap-kho',
    loadChildren: () => import('./nhap-xuat/duoc-pham/nhap-kho/nhap-kho.module').then(o => o.NhapKhoModule)
  },
  {
    path: 'nhap-xuat/duoc-pham/xuat-kho',
    loadChildren: () => import('./nhap-xuat/duoc-pham/xuat-kho/xuat-kho.module').then(o => o.XuatKhoModule)
  },
  {
    path: 'nhap-xuat/duoc-pham/hoan-tra',
    loadChildren: () => import('./nhap-xuat/duoc-pham/hoan-tra/hoan-tra.module').then(o => o.HoanTraModule)
  },
  {
    path: 'nhap-xuat/vat-tu/nhap-kho',
    loadChildren: () => import('./nhap-xuat/vat-tu/nhap-kho/nhap-kho.module').then(o => o.NhapKhoModule)
  },
  {
    path: 'nhap-xuat/vat-tu/xuat-kho',
    loadChildren: () => import('./nhap-xuat/vat-tu/xuat-kho/xuat-kho.module').then(o => o.XuatKhoModule)
  },
  {
    path: 'nhap-xuat/vat-tu/hoan-tra',
    loadChildren: () => import('./nhap-xuat/vat-tu/hoan-tra/hoan-tra.module').then(o => o.HoanTraModule)
  },
  //#endregion Nhập xuất
  
  //#region Báo cáo
  
  //Phòng khám đa khoa  
  {
    path: 'bao-cao/le-tan/tiep-nhan-nguoi-benh-kham',
    loadChildren: () => import('./bao-cao/phong-kham-da-khoa/le-tan/tiep-nhan-nguoi-benh-kham/tiep-nhan-nguoi-benh-kham.module').then(o => o.TiepNhanNguoiBenhKhamModule)
  },
  {
    path: 'bao-cao/bac-si/kham-benh',
    loadChildren: () => import('./bao-cao/phong-kham-da-khoa/bac-si/kham-benh/kham-benh.module').then(o => o.KhamBenhModule)
  },

  //Bác sĩ gia đình
  {
    path: 'bao-cao/bac-si-gia-dinh/hen-kham',
    loadChildren: () => import('./bao-cao/bac-si-gia-dinh/hen-kham/hen-kham.module').then(o => o.HenKhamModule)
  },
  {
    path: 'bao-cao/bac-si-gia-dinh/kham-benh',
    loadChildren: () => import('./bao-cao/bac-si-gia-dinh/kham-benh/kham-benh.module').then(o => o.KhamBenhModule)
  },
  {
    path: 'bao-cao/bac-si-gia-dinh/phat-thuoc',
    loadChildren: () => import('./bao-cao/bac-si-gia-dinh/phat-thuoc/phat-thuoc.module').then(o => o.PhatThuocModule)
  },
  {
    path: 'bao-cao/bac-si-gia-dinh/doanh-thu',
    loadChildren: () => import('./bao-cao/bac-si-gia-dinh/doanh-thu/doanh-thu.module').then(o => o.DoanhThuModule)
  },

  
  //#endregion Báo cáo
  
  //#region Quản trị

  //#region Nhóm hành chính
  {
    path: 'quan-tri/nhom-hanh-chinh/nghe-nghiep',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/nghe-nghiep/nghe-nghiep.module').then(o => o.NgheNghiepModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/chuc-vu',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/chuc-vu/chuc-vu.module').then(o => o.ChucVuModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/chuc-danh',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/chuc-danh/chuc-danh.module').then(o => o.ChucDanhModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/van-ban-chuyen-mon',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/van-ban-chuyen-mon/van-ban-chuyen-mon.module').then(o => o.VanBanChuyenMonModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/quoc-gia',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/quoc-gia/quoc-gia.module').then(o => o.QuocGiaModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/dan-toc',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/dan-toc/dan-toc.module').then(o => o.DanTocModule)
  },
  {
    path: 'quan-tri/nhom-hanh-chinh/don-vi-hanh-chinh',
    loadChildren: () => import('./quan-tri/nhom-hanh-chinh/don-vi-hanh-chinh/don-vi-hanh-chinh.module').then(o => o.DonViHanhChinhModule)
  },
  //#endregion Nhóm hành chính

  //#region Nhóm phòng khám
  {
    path: 'quan-tri/nhom-phong-kham/dich-vu-kham',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/dich-vu-kham/dich-vu-kham.module').then(o => o.DichVuKhamModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/dich-vu-ky-thuat',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/dich-vu-ky-thuat/dich-vu-ky-thuat.module').then(o => o.DichVuKyThuatModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/icd',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/icd/icd.module').then(o => o.IcdModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/trieu-chung',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/trieu-chung/trieu-chung.module').then(o => o.TrieuChungModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/chan-doan',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/chan-doan/chan-doan.module').then(o => o.ChanDoanModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/loi-dan',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/loi-dan/loi-dan.module').then(o => o.LoiDanModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/toa-thuoc-mau',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/toa-thuoc-mau/toa-thuoc-mau.module').then(o => o.ToaThuocMauModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/ly-do-tiep-nhan',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/ly-do-tiep-nhan/ly-do-tiep-nhan.module').then(o => o.LyDoTiepNhanModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/nhom-dich-vu-thuong-dung',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/nhom-dich-vu-thuong-dung/nhom-dich-vu-thuong-dung.module').then(o => o.NhomDichVuThuongDungModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/nhom-dich-vu',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/nhom-dich-vu/nhom-dich-vu.module').then(o => o.NhomDichVuModule)
  },
  {
    path: 'quan-tri/nhom-phong-kham/benh-vien',
    loadChildren: () => import('./quan-tri/nhom-phong-kham/benh-vien/benh-vien.module').then(o => o.BenhVienModule)
  },
  //#endregion Nhóm phòng khám

  //#region Nhóm người bệnh
  {
    path: 'quan-tri/nhom-nguoi-benh/nguoi-benh',
    loadChildren: () => import('./quan-tri/nhom-nguoi-benh/nguoi-benh/nguoi-benh.module').then(o => o.NguoiBenhModule)
  },
  {
    path: 'quan-tri/nhom-nguoi-benh/quan-he-than-nhan',
    loadChildren: () => import('./quan-tri/nhom-nguoi-benh/quan-he-than-nhan/quan-he-than-nhan.module').then(o => o.QuanHeThanNhanModule)
  },
  //#endregion Nhóm người bệnh

  //#region Nhóm khoa phòng
  {
    path: 'quan-tri/nhom-khoa-phong/khoa-phong',
    loadChildren: () => import('./quan-tri/nhom-khoa-phong/khoa-phong/khoa-phong.module').then(o => o.KhoaPhongModule)
  },
  {
    path: 'quan-tri/nhom-khoa-phong/khoa-phong-phong-kham',
    loadChildren: () => import('./quan-tri/nhom-khoa-phong/khoa-phong-phong-kham/khoa-phong-phong-kham.module').then(o => o.KhoaPhongPhongKhamModule)
  },
  {
    path: 'quan-tri/nhom-khoa-phong/khoa-phong-nhan-vien',
    loadChildren: () => import('./quan-tri/nhom-khoa-phong/khoa-phong-nhan-vien/khoa-phong-nhan-vien.module').then(o => o.KhoaPhongNhanVienModule)
  },
  //#endregion Nhóm khoa phòng

  //#region Nhóm nhân viên
  {
    path: 'quan-tri/nhom-nhan-vien/ho-so-nhan-vien',
    loadChildren: () => import('./quan-tri/nhom-nhan-vien/ho-so-nhan-vien/ho-so-nhan-vien.module').then(o => o.HoSoNhanVienModule)
  },
  {
    path: 'quan-tri/nhom-nhan-vien/phan-quyen-nguoi-dung',
    loadChildren: () => import('./quan-tri/nhom-nhan-vien/phan-quyen-nguoi-dung/phan-quyen-nguoi-dung.module').then(o => o.PhanQuyenNguoiDungModule)
  },
  //#endregion Nhóm nhân viên

  //#region Nhóm dược phẩm
  {
    path: 'quan-tri/nhom-duoc-pham/duoc-pham',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/duoc-pham/duoc-pham.module').then(o => o.DuocPhamModule)
  },
  {
    path: 'quan-tri/nhom-duoc-pham/nha-san-xuat',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/nha-san-xuat/nha-san-xuat.module').then(o => o.NhaSanXuatModule)
  },
  {
    path: 'quan-tri/nhom-duoc-pham/don-vi-tinh',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/don-vi-tinh/don-vi-tinh.module').then(o => o.DonViTinhModule)
  },
  {
    path: 'quan-tri/nhom-duoc-pham/duong-dung',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/duong-dung/duong-dung.module').then(o => o.DuongDungModule)
  },
  {
    path: 'quan-tri/nhom-duoc-pham/nhom-thuoc',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/nhom-thuoc/nhom-thuoc.module').then(o => o.NhomThuocModule)
  },
  {
    path: 'quan-tri/nhom-duoc-pham/tuong-tac-thuoc',
    loadChildren: () => import('./quan-tri/nhom-duoc-pham/tuong-tac-thuoc/tuong-tac-thuoc.module').then(o => o.TuongTacThuocModule)
  },
  //#endregion Nhóm dược phẩm

  //#region Nhóm vật tư
  {
    path: 'quan-tri/nhom-vat-tu/vat-tu',
    loadChildren: () => import('./quan-tri/nhom-vat-tu/vat-tu/vat-tu.module').then(o => o.VatTuModule)
  },
  //#endregion Nhóm vật tư

  //#region Nhóm kho
  {
    path: 'quan-tri/nhom-kho/kho',
    loadChildren: () => import('./quan-tri/nhom-kho/kho/kho.module').then(o => o.KhoModule)
  },
  {
    path: 'quan-tri/nhom-kho/vi-tri-de-duoc-pham-vat-tu',
    loadChildren: () => import('./quan-tri/nhom-kho/vi-tri-de-duoc-pham-vat-tu/vi-tri-de-duoc-pham-vat-tu.module').then(o => o.ViTriDeDuocPhamVatTuModule)
  },
  {
    path: 'quan-tri/nhom-kho/nha-cung-cap',
    loadChildren: () => import('./quan-tri/nhom-kho/nha-cung-cap/nha-cung-cap.module').then(o => o.NhaCungCapModule)
  },
  //#endregion Nhóm kho

  //#region Nhóm cấu hình
  {
    path: 'quan-tri/nhom-cau-hinh/thong-so-mac-dinh',
    loadChildren: () => import('./quan-tri/nhom-cau-hinh/thong-so-mac-dinh/thong-so-mac-dinh.module').then(o => o.ThongSoMacDinhModule)
  },
  {
    path: 'quan-tri/nhom-cau-hinh/noi-dung-mau-xuat-ra-pdf',
    loadChildren: () => import('./quan-tri/nhom-cau-hinh/noi-dung-mau-xuat-ra-pdf/noi-dung-mau-xuat-ra-pdf.module').then(o => o.NoiDungMauXuatRaPdfModule)
  },
  {
    path: 'quan-tri/nhom-cau-hinh/noi-dung-mau',
    loadChildren: () => import('./quan-tri/nhom-cau-hinh/noi-dung-mau/noi-dung-mau.module').then(o => o.NoiDungMauModule)
  },
  //#endregion Nhóm cấu hình

  //#endregion Quản trị
  
  //#region Hướng dẫn sử dụng
  //Phòng khám đa khoa    
  {
    path: 'phong-kham-da-khoa/huong-dan-su-dung',
    loadChildren: () => import('./huong-dan-su-dung/phong-kham-da-khoa/huong-dan-su-dung/huong-dan-su-dung.module').then(o => o.HuongDanSuDungModule)
  },
  //Bác sĩ gia đình
  {
    path: 'bac-si-gia-dinh/huong-dan-su-dung',
    loadChildren: () => import('./huong-dan-su-dung/bac-si-gia-dinh/huong-dan-su-dung/huong-dan-su-dung.module').then(o => o.HuongDanSuDungModule)
  },
  //#endregion Hướng dẫn sử dụng
];

const mainRoutes: Routes = [
  {
      path: '', component: MainComponent, data: { title: 'Main Views' }, children: mainChildRoutes, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
