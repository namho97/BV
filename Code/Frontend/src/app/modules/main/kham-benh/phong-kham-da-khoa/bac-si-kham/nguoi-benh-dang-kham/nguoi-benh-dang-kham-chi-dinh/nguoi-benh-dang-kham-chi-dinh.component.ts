import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { NhomDichVuThuongDungComponent } from '../nhom-dich-vu-thuong-dung/nhom-dich-vu-thuong-dung.component';

@Component({
  selector: 'app-nguoi-benh-dang-kham-chi-dinh',
  templateUrl: './nguoi-benh-dang-kham-chi-dinh.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-chi-dinh.component.scss']
})
export class NguoiBenhDangKhamChiDinhComponent implements OnInit {

  documentType:DocumentType;
  dataChonDichVu:any;
  validationErrors:any;
  chiDinhDichVuVo: any={};
  @Input() heightToolbarDichVu:number=518;
  @Input() heightToolbarDichVuDangChon:number=463;
  @ViewChild('actionDichVuTemplate', { static: true }) actionDichVuTemplate: TemplateRef<any>;
  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild('tenDichVuTemplate', { static: true }) tenDichVuTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsDichVu();
    this.getDataForGridDichVu();
    this.getColumnsDichVuDangChon();
    this.getDataForGridDichVuDangChon();
  }
  //#region DV tất cả
  chiDinhQueryInfo:any={};
  chiDinhSearching:boolean=false;
  columnsDichVu: TableColumn<any>[] = [];
  dataSourceDichVu: any;
  groupByColumnsDichVu: string[] = [];
  sortByColumnDichVu: SortDescriptor = { field: 'MaDichVu', dir: 'asc' };
  getColumnsDichVu() {
    this.columnsDichVu = [      
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 70, visible: true, disableFilter: false },
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 200, visible: true , template: this.tenDichVuTemplate},      
      { label: 'NƠI THỰC HIỆN', property: 'NoiThucHien', type: 'text', width: 120, visible: true }      
    ];
  }
  getDataForGridDichVu() {
    this.dataSourceDichVu = {
      Data: [
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 1,  "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi" ,"NoiThucHien": "Khám nhi - P212"},
        { "Id": 2,  "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 3,  "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	",  "NoiThucHien": "Khám nhi - P212"},
        { "Id": 4,  "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)",  "NoiThucHien": "Khám nhi - P212" },
        { "Id": 5, "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)",  "NoiThucHien": "Khám nhi - P212"},

      ],
      TotalRowCount: 49
    }
  }
  timKiemDichVu(){
    this.chiDinhSearching=true;
  }
  huyTimKiemDichVu(){
    this.chiDinhSearching=false;
  }
  chonNhomDichVuThuongDung(){
    this.dialog.open(NhomDichVuThuongDungComponent, {
      disableClose: false,
      width: '1100px',
      data: {  }
    }).afterClosed().subscribe(result => {/* result is a boolean:true,false,null*/
        if (result) {
         
        }
    });
  }
  //#endregion
  //#region DV đang chọn
  columnsDichVuDangChon: TableColumn<any>[] = [];
  dataSourceDichVuDangChon: any;
  groupByColumnsDichVuDangChon: string[] = ['NhomDichVu'];
  sortByColumnDichVuDangChon: SortDescriptor = { field: 'MaTiepNhan', dir: 'asc' };
  getColumnsDichVuDangChon() {
    this.columnsDichVuDangChon = [
      { label: '', property: 'actions', type: 'button', visible: true, width: 40, useActionDefault: true, hideFilter: true,sticky:true, template: this.actionDichVuTemplate },
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 100, visible: true, disableFilter: false},
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 300, visible: true,sticky:true, template: this.tenDichVuTemplate, footerLabel: "<strong>TỔNG CỘNG:</strong>" },
      { label: 'TRẠNG THÁI', property: 'TinhTrang', type: 'text', width: 130, visible: true, template: this.tinhTrangTemplate }  ,      
      { label: 'LOẠI GIÁ', property: 'LoaiGia', type: 'text', width: 80, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 80, visible: true, footerTemplate: this.thanhTienFooterTemplate },
      { label: 'ĐG BHYT', property: 'DonGiaBHYT', type: 'text', width: 80, visible: true },
      { label: 'NƠI THỰC HIỆN', property: 'NoiThucHien', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI CHỈ ĐỊNH', property: 'NguoiChiDinh', type: 'text', width: 110, visible: true },
      { label: 'THỜI GIAN CHỈ ĐỊNH', property: 'ThoiGianChiDinh', type: 'text', width: 160, visible: true }    
    ];
  }
  getDataForGridDichVuDangChon() {
    this.dataSourceDichVuDangChon= {
      Data: [
        { "Id": 1, "NhomDichVu": "DỊCH VỤ KHÁM BỆNH", "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đang thực hiện", "LoaiTinhTrang": 2 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Chưa thực hiện", "LoaiTinhTrang": 1 },
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
  //#endregion
}
