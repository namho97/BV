import { Component, Input, OnInit} from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-nhom-dich-vu-thuong-dung',
  templateUrl: './nhom-dich-vu-thuong-dung.component.html',
  styleUrls: ['./nhom-dich-vu-thuong-dung.component.scss']
})
export class NhomDichVuThuongDungComponent implements OnInit {

  documentTypeNhomDichVuThuongDung:DocumentType;
  dataChonNhomDichVuThuongDung: any;
  columnsNhomDichVuThuongDung: TableColumn<any>[] = [];
  dataSourceNhomDichVuThuongDung: any;
  groupByColumnsNhomDichVuThuongDung: string[] = [];
  sortByColumnNhomDichVuThuongDung: SortDescriptor = { field: 'TenDichVu', dir: 'asc' };
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentTypeNhomDichVuThuongDung=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsNhomDichVuThuongDung();
    this.getDataForGridNhomDichVuThuongDung();
    this.getColumnsChiTietNhomDichVuThuongDung();
    this.getDataForGridChiTietNhomDichVuThuongDung();
  }
  getColumnsNhomDichVuThuongDung() {
    this.columnsNhomDichVuThuongDung = [
      { label: 'TÊN NHÓM', property: 'TenNhomDichVuThuongDung', type: 'text', width: 300,visible: true },
      { label: 'MÔ TẢ', property: 'MoTa', type: 'text', minWidth: 200, visible: true }
    ];
  }
  getDataForGridNhomDichVuThuongDung() {
    this.dataSourceNhomDichVuThuongDung = {
      Data: [
        { "Id": 1, "TenNhomDichVuThuongDung": "Nội soi dạ dày gây mê", "MoTa":""},
        { "Id": 2, "TenNhomDichVuThuongDung": "Nội soi dạ dày thường", "MoTa":""},
        { "Id": 3, "TenNhomDichVuThuongDung": "Nội soi đại tràng gây mê", "MoTa":""},
        { "Id": 4, "TenNhomDichVuThuongDung": "Nọi soi dạ dày đại tràng gây mê", "MoTa":""},
        { "Id": 5, "TenNhomDichVuThuongDung": "	XN cơ bản", "MoTa":""}
      ],
      TotalRowCount: 49
    }
  }

  columnsChiTietNhomDichVuThuongDung: TableColumn<any>[] = [];
  dataSourceChiTietNhomDichVuThuongDung: any;
  getColumnsChiTietNhomDichVuThuongDung() {
    this.columnsChiTietNhomDichVuThuongDung = [
      { label: 'MÃ', property: 'MaDichVu', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 300, visible: true}, 
      { label: 'LOẠI GIÁ', property: 'LoaiGia', type: 'text', width: 80, visible: true },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 80, visible: true }  
    ];
  }
  getDataForGridChiTietNhomDichVuThuongDung() {
    this.dataSourceChiTietNhomDichVuThuongDung = {
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

}
