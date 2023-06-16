import { ThongTinBHYTViewModel, ThongTinHanhChinhViewModel, ThongTinNguoiGiamHoViewModel, ThongTinTiepNhanViewModel, TiepNhanViewModel } from './../../../tiep-nhan.model';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SortDescriptor, TableColumn } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { ChiDinhDichVuViewModel, TaiLieuDinhKemViewModel } from '../../../tiep-nhan.model';
declare let $: any;

@Component({
  selector: 'app-tao-tiep-nhan-shared',
  templateUrl: './tao-tiep-nhan-shared.component.html',
  styleUrls: ['./tao-tiep-nhan-shared.component.scss']
})
export class TaoTiepNhanSharedComponent implements OnInit {

  //#region Variable
  popupLoadingData: any;
  tabActiveIndex: number = 0;
  documentType: DocumentType;
  isUpdate: boolean = false;
  tiepNhanViewModel: TiepNhanViewModel = {
    Id: 0,
    ThongTinHanhChinh: new ThongTinHanhChinhViewModel,
    ThongTinNguoiGiamHo: new ThongTinNguoiGiamHoViewModel,
    ThongTinBHYT: new ThongTinBHYTViewModel,
    ThongTinTiepNhan: new ThongTinTiepNhanViewModel
  };
  chiDinhDichVuViewModel:ChiDinhDichVuViewModel={
    DichVu: 0,
    SoLuong: 0,
    DonGia: 0,
    ThanhTien: 0,
    NoiThucHien: 0
  };
  taiLieuDinhKemViewModel:TaiLieuDinhKemViewModel={
    Loai: 0,
    TaiLieu: undefined,
    MoTa: ''
  };
  validationErrors: any[] = [];
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  //#endregion Variable

  //#region Chung

  constructor(private dialog: MatDialog) { }
  ngOnInit() {
    this.documentType = DocumentType.TiepNhanNguoiBenhPhongKhamDaKhoaTiepNhan;
    this.getDanhSachNamSinh();
    this.getDanhSachThangSinh();
    this.selectedTabChange(0);
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {

    }
  }

  ngAfterContentInit(): void {
  }

  showPopupLoadingData(mess: string = 'Đang tải dữ liệu...') {
    this.popupLoadingData = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: mess }
    });
  }
  closePopupLoadingData() {
    if (this.popupLoadingData != undefined && this.popupLoadingData != null) {
      this.popupLoadingData.close();
    }
  }
  selectedTabChange(index: number) {
    this.tabActiveIndex = index;
    switch (index) {
      case 0:
        this.getColumnsDichVu();
        this.getDataForGridDichVu();
        break;
      case 1:
        this.getColumnsTaiLieuDinhKem();
        this.getDataForGridTaiLieuDinhKem();
        break;
      case 2:
        this.getColumnsLichHen();
        this.getDataForGridLichHen();
        break;
      case 3:
        this.getColumnsLichSuKhamBenh();
        this.getDataForGridLichSuKhamBenh();
        break;
    }

  }
  //#endregion Chung

  //#region combobox ngày sinh
  danhSachNamSinhs: any = [];
  danhSachNgaySinhs: any = [];
  danhSachThangSinhs: any = [];
  getDanhSachNgaySinh(month: number, year: number) {
    this.danhSachNgaySinhs = [];
    for (var i = 1; i <= CommonService.getDaysInMonth(month - 1, year).length; i++) {
      this.danhSachNgaySinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  getDanhSachThangSinh() {
    this.danhSachThangSinhs = [];
    for (var i = 1; i <= 12; i++) {
      this.danhSachThangSinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  getDanhSachNamSinh() {
    this.danhSachNamSinhs = [];
    var now = new Date();
    for (var i = now.getFullYear(); i >= 1900; i--) {
      this.danhSachNamSinhs.push({ KeyId: i, DisplayName: i });
    }
  }

  modelThangSinhChange() {
    this.getDanhSachNgaySinh(this.tiepNhanViewModel.ThongTinHanhChinh.ThangSinh, this.tiepNhanViewModel.ThongTinHanhChinh.NamSinh);
  }
  //#endregion combobox ngày sinh

  //#region Chi dinh DV
  dataChonDichVu: any;
  columnsDichVu: TableColumn<any>[] = [];
  dataSourceDichVu: any;
  groupByColumnsDichVu: string[] = ['NhomDichVu'];
  sortByColumnDichVu: SortDescriptor = { field: 'MaTiepNhan', dir: 'asc' };
  @ViewChild('actionDichVuTemplate', { static: true }) actionDichVuTemplate: TemplateRef<any>;
  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild('tenDichVuTemplate', { static: true }) tenDichVuTemplate: TemplateRef<any>;
  getColumnsDichVu() {
    this.columnsDichVu = [
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 300, visible: true, template: this.tenDichVuTemplate, footerLabel: "<strong>TỔNG CỘNG:</strong>" },
      { label: 'TRẠNG THÁI', property: 'TinhTrang', type: 'text', width: 140, visible: true, template: this.tinhTrangTemplate },
      { label: 'LOẠI GIÁ', property: 'LoaiGia', type: 'text', width: 80, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 80, visible: true, footerTemplate: this.thanhTienFooterTemplate },
      { label: 'ĐG BHYT', property: 'DonGiaBHYT', type: 'text', width: 80, visible: true },
      { label: 'NƠI THỰC HIỆN', property: 'NoiThucHien', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI CHỈ ĐỊNH', property: 'NguoiChiDinh', type: 'text', width: 110, visible: true },
      { label: 'THỜI GIAN CHỈ ĐỊNH', property: 'ThoiGianChiDinh', type: 'text', width: 160, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true, width: 40, useActionDefault: true, hideFilter: true, template: this.actionDichVuTemplate }
    ];
  }
  getDataForGridDichVu() {
    this.dataSourceDichVu = {
      Data: [
        { "Id": 1, "NhomDichVu": "DỊCH VỤ KHÁM BỆNH", "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },

      ],
      TotalRowCount: 49
    }
  }
  viewDichVu(dataItem: any) {
    this.dataChonDichVu = dataItem;

  }
  //#endregion Chi dinh DV

  //#region Tài liệu đính kèm
  dataChonTaiLieuDinhKem: any;
  columnsTaiLieuDinhKem: TableColumn<any>[] = [];
  dataSourceTaiLieuDinhKem: any;
  groupByColumnsTaiLieuDinhKem: string[] = [];
  sortByColumnTaiLieuDinhKem: SortDescriptor = { field: 'TaiLieu', dir: 'asc' };
  @ViewChild('actionTaiLieuDinhKemTemplate', { static: true }) actionTaiLieuDinhKemTemplate: TemplateRef<any>;
  getColumnsTaiLieuDinhKem() {
    this.columnsTaiLieuDinhKem = [
      { label: 'LOẠI', property: 'Loai', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'TÀI LIỆU', property: 'TaiLieu', type: 'text', width: 300, isLink: true, visible: true },
      { label: 'MÔ TẢ', property: 'MoTa', type: 'text', minWidth: 300, isLink: true, visible: true },
      { label: 'NGƯỜI TẠO', property: 'NguoiTao', type: 'text', width: 100, visible: true },
      { label: 'THỜI GIAN TẠO', property: 'ThoiGianTao', type: 'text', width: 150, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true, width: 40, useActionDefault: true, hideFilter: true, template: this.actionTaiLieuDinhKemTemplate }
    ];
  }
  getDataForGridTaiLieuDinhKem() {
    this.dataSourceTaiLieuDinhKem = {
      Data: [
        { "Id": 1, "Loai": "Tài liệu", "TaiLieu": "phieu-kham-benh.pdf", "MoTa": "", "NguoiTao": "Nguyễn Văn A", "ThoiGianTao": "14/07/2022 05:25 AM" },
        { "Id": 2, "Loai": "Hình ảnh", "TaiLieu": "phieu-kham-benh.png", "MoTa": "", "NguoiTao": "Nguyễn Văn A", "ThoiGianTao": "14/07/2022 05:25 AM" }

      ],
      TotalRowCount: 49
    }
  }
  extDataItemSelectedTaiLieuDinhKem(event) {
    this.dataChonDichVu = event;

  }
  //#endregion Tài liệu đính kèm

  //#region Lịch hẹn
  dataChonLichHen: any;
  columnsLichHen: TableColumn<any>[] = [];
  dataSourceLichHen: any;
  groupByColumnsLichHen: string[] = [];
  sortByColumnLichHen: SortDescriptor = { field: 'TenDichVu', dir: 'asc' };
  getColumnsLichHen() {
    this.columnsLichHen = [
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', width: 300, isLink: true, visible: true },
      { label: 'BÁC SĨ THỰC HIỆN', property: 'BacSiThucHien', type: 'text', width: 120, visible: true },
      { label: 'NGÀY TÁI KHÁM', property: 'NgayTaiKham', type: 'text', width: 150, visible: true },
      { label: 'GHI CHÚ', property: 'GhiChu', type: 'text', minWidth: 200, visible: true }
    ];
  }
  getDataForGridLichHen() {
    this.dataSourceLichHen = {
      Data: [
        { "Id": 1, "TenDichVu": "Khám Nhi", "BacSiThucHien": "Nguyễn Văn A", "NgayTaiKham": "14/04/2022", "GhiChu": "" }
      ],
      TotalRowCount: 49
    }
  }
  extDataItemSelectedLichHen(event) {
    this.dataChonDichVu = event;

  }
  //#endregion Lịch hẹn

  //#region Lịch sử khám bệnh
  dataChonLichSuKhamBenh: any;
  columnsLichSuKhamBenh: TableColumn<any>[] = [];
  dataSourceLichSuKhamBenh: any;
  groupByColumnsLichSuKhamBenh: string[] = [];
  sortByColumnLichSuKhamBenh: SortDescriptor = { field: 'MaTiepNhan', dir: 'asc' };
  getColumnsLichSuKhamBenh() {
    this.columnsLichSuKhamBenh = [
      { label: 'NGÀY KHÁM', property: 'NgayKham', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'TÊN DỊCH VỤ KHÁM', property: 'TenDichVuKham', type: 'text', minWidth: 200, isLink: true, visible: true },
      { label: 'BÁC SĨ KHÁM', property: 'BacSiKham', type: 'text', width: 100, visible: true },
      { label: 'BÁC SĨ KẾT LUẬN', property: 'BacSiKetLuan', type: 'text', width: 100, visible: true },
      { label: 'PHÒNG KHÁM', property: 'PhongKham', type: 'text', width: 100, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoKham', type: 'text', width: 100, visible: true },
      { label: 'TRIỆU CHỨNG LS', property: 'TrieuChungLamSan', type: 'text', width: 100, visible: true },
      { label: 'CHẨN ĐOÁN ICD', property: 'ChanDoanIcd', type: 'text', width: 150, visible: true },
      { label: 'CÁCH GIẢI QUYẾT', property: 'CachGiaiQuyet', type: 'text', width: 100, visible: true }
    ];
  }
  getDataForGridLichSuKhamBenh() {
    this.dataSourceLichSuKhamBenh = {
      Data: [
        { "Id": 1, "NgayKham": "14/07/2022", "TenDichVuKham": "Khám nhi", "BacSiKham": "Nguyễn Văn A", "BacSiKetLuan": "Nguyễn Văn B", "PhongKham": "Khám nhi - P212", "LyDoKham": "Đau bụng", "TrieuChungLamSan": "Đau bụng", "ChanDoanIcd": "101 - Đau bụng", "CachGiaiQuyet": "Kê toa cho về" }

      ],
      TotalRowCount: 49
    }
  }
  extDataItemSelectedLichSuKhamBenh(event) {
    this.dataChonDichVu = event;

  }
  //#endregion Lịch sử khám bệnh

  //#region actions
  chonMaNguoiBenh(event:any){    

    this.tiepNhanViewModel.ThongTinHanhChinh.MaNguoiBenh=event!=null?event.MaNguoiBenh:null;
    this.tiepNhanViewModel.ThongTinHanhChinh.HoTen=event!=null?event.HoTen:null;
    this.tiepNhanViewModel.ThongTinHanhChinh.NamSinh=event!=null?event.NamSinh:null;
    this.tiepNhanViewModel.ThongTinHanhChinh.SoDienThoai=event!=null?event.SoDienThoai:null;
    this.tiepNhanViewModel.ThongTinHanhChinh.GioiTinh=event!=null?(event.GioiTinh=="Nam"?1:2):null;
    //this.lichHenVo.DiaChi=event.DiaChi;

  }
  quayLai() {
    this.quayLaiChange.emit(true);
  }
  nhapLai() {
    this.ngOnInit();
  }
  luu() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn lưu tiếp nhận này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
  capNhat() {
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn cập nhật tiếp nhận này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
  //#endregion actions
}
