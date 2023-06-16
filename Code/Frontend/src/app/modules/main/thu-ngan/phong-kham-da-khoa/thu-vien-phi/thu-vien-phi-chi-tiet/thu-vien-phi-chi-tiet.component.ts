import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-thu-vien-phi-chi-tiet',
  templateUrl: './thu-vien-phi-chi-tiet.component.html',
  styleUrls: ['./thu-vien-phi-chi-tiet.component.scss']
})
export class ThuVienPhiChiTietComponent implements OnInit {

  popupLoadingData: any;
  documentType: DocumentType;
  isUpdate: boolean = false;
  thuVienPhiVo:any={};
  validationErrors: any[] = [];
  isThemMoiNguoiBenh:boolean=false;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.documentType = DocumentType.ThuNganPhongKhamDaKhoaThuVienPhi;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.thuVienPhiVo={};
      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.thuVienPhiVo={HinhThuThanhToan:[1]};
      this.getColumnsDichVu();
      this.getDataForGridDichVu();
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
  
  
  //#region actions
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
  columnsDichVu: TableColumn<any>[] = [];
  dataSourceDichVu: any;
  groupByColumnsDichVu: string[] = ['NhomDichVu'];
  sortByColumnDichVu: SortDescriptor = { field: 'MaTiepNhan', dir: 'asc' };
  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  @ViewChild('bHYTThanhToanFooterTemplate', { static: true }) bHYTThanhToanFooterTemplate: TemplateRef<any>;
  @ViewChild('soTienMienGiamFooterTemplate', { static: true }) soTienMienGiamFooterTemplate: TemplateRef<any>;
  @ViewChild('daThanhToanFooterTemplate', { static: true }) daThanhToanFooterTemplate: TemplateRef<any>;
  @ViewChild('nguoiBenhConPhaiThanhToanFooterTemplate', { static: true }) nguoiBenhConPhaiThanhToanFooterTemplate: TemplateRef<any>;
  getColumnsDichVu() {
    this.columnsDichVu = [
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 100, visible: true, disableFilter: false},
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 300, visible: true,sticky:true,  footerLabel: "<strong>TỔNG CỘNG:</strong>" },    
      { label: 'LOẠI GIÁ', property: 'LoaiGia', type: 'text', width: 80, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 80, visible: true, footerTemplate: this.thanhTienFooterTemplate },
      { label: 'BHYT TT', property: 'BHYTThanhToan', type: 'text', width: 80, visible: true, footerTemplate: this.bHYTThanhToanFooterTemplate },
      { label: 'SỐ TIỀN MG', property: 'SoTienMienGiam', type: 'text', width: 80, visible: true , footerTemplate: this.soTienMienGiamFooterTemplate},
      { label: 'ĐÃ TT', property: 'DaThanhToan', type: 'text', width: 80, visible: true, footerTemplate: this.daThanhToanFooterTemplate },
      { label: 'NB CÒN PHẢI TT', property: 'NguoiBenhConPhaiThanhToan', type: 'text', width: 80, visible: true, footerTemplate: this.nguoiBenhConPhaiThanhToanFooterTemplate },
      { label: 'NƠI THỰC HIỆN', property: 'NoiThucHien', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI CHỈ ĐỊNH', property: 'NguoiChiDinh', type: 'text', width: 110, visible: true },
      { label: 'THỜI GIAN CHỈ ĐỊNH', property: 'ThoiGianChiDinh', type: 'text', width: 160, visible: true }    
    ];
  }
  getDataForGridDichVu() {
    this.dataSourceDichVu= {
      Data: [
        { "Id": 1, "NhomDichVu": "DỊCH VỤ KHÁM BỆNH", "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500", "SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000","NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "BHYTThanhToan": "30.500","SoTienMienGiam":"0","DaThanhToan":"0","NguoiBenhConPhaiThanhToan":"120.000", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },

      ],
      TotalRowCount: 49
    }
  }
}
