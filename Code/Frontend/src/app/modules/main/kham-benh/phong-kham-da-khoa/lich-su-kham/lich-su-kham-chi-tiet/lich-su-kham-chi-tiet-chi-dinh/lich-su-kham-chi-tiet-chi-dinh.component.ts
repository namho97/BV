import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-chi-dinh',
  templateUrl: './lich-su-kham-chi-tiet-chi-dinh.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-chi-dinh.component.scss']
})
export class LichSuKhamChiTietChiDinhComponent implements OnInit {

  documentType:DocumentType;
  dataChonDichVu:any;
  validationErrors:any;
  chiDinhDichVuVo: any={};
  @Input() heightToolbarDichVuDangChon:number=370;
  @ViewChild('thanhTienFooterTemplate', { static: true }) thanhTienFooterTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhPhongKhamDaKhoaLichSuKham;
    this.getColumnsDichVuDangChon();
    this.getDataForGridDichVuDangChon();
  }
  //#region DV đang chọn
  columnsDichVuDangChon: TableColumn<any>[] = [];
  dataSourceDichVuDangChon: any;
  groupByColumnsDichVuDangChon: string[] = ['NhomDichVu'];
  sortByColumnDichVuDangChon: SortDescriptor = { field: 'MaTiepNhan', dir: 'asc' };
  getColumnsDichVuDangChon() {
    this.columnsDichVuDangChon = [      
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 100, visible: true, disableFilter: false},
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 300, visible: true,sticky:true, footerLabel: "<strong>TỔNG CỘNG:</strong>" },
      { label: 'TRẠNG THÁI', property: 'TinhTrang', type: 'text', width: 130, visible: true, template: this.tinhTrangTemplate }  ,      
      { label: 'LOẠI GIÁ', property: 'LoaiGia', type: 'text', width: 80, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 80, visible: true, footerTemplate: this.thanhTienFooterTemplate },
      { label: 'ĐG BHYT', property: 'DonGiaBHYT', type: 'text', width: 80, visible: true },
      { label: 'NƠI THỰC HIỆN', property: 'NoiThucHien', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI CHỈ ĐỊNH', property: 'NguoiChiDinh', type: 'text', width: 110, visible: true },
      { label: 'THỜI GIAN CHỈ ĐỊNH', property: 'ThoiGianChiDinh', type: 'text', width: 160, visible: true },  
      { label: 'NGƯỜI THỰC HIỆN', property: 'NguoiThucHien', type: 'text', width: 110, visible: true },
      { label: 'THỜI GIAN THỰC HIỆN', property: 'ThoiGianThucHien', type: 'text', width: 160, visible: true }     
    ];
  }
  getDataForGridDichVuDangChon() {
    this.dataSourceDichVuDangChon= {
      Data: [
        { "Id": 1, "NhomDichVu": "DỊCH VỤ KHÁM BỆNH", "MaDichVu": "03.1897", "TenDichVu": "Khám Nhi", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Hủy thực hiện", "LoaiTinhTrang": 4 },
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 2, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "20.0013.0933", "TenDichVu": "Nội soi tai mũi họng", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 3, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "18.0119.0028", "TenDichVu": "Chụp Xquang ngực thẳng (D.R)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3 ,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM"},
        { "Id": 4, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "03.1897", "TenDichVu": "RSV (test nhanh)", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },
        { "Id": 5, "NhomDichVu": "DỊCH VỤ KỸ THUẬT", "MaDichVu": "	22.0121.1369", "TenDichVu": "Tổng phân tích tế bào máu ngoại vi (bằng máy đếm laser)	", "LoaiGia": "Thường", "SoLuong": "1", "DonGia": "120.000", "ThanhTien": "120.000", "DonGiaBHYT": "30.500", "NoiThucHien": "Khám nhi - P212", "NguoiChiDinh": "Nguyễn Văn A", "ThoiGianChiDinh": "05/07/2022 08:28 AM", "TinhTrang": "Đã thực hiện", "LoaiTinhTrang": 3,"NguoiThucHien": "Nguyễn Văn A", "ThoiGianThucHien": "05/07/2022 08:28 AM" },

      ],
      TotalRowCount: 49
    }
  }
  viewDichVu(dataItem: any) {
    this.dataChonDichVu = dataItem;

  }
  //#endregion
  }

