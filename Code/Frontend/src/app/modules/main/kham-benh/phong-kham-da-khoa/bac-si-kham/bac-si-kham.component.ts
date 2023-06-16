import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-bac-si-kham',
  templateUrl: './bac-si-kham.component.html',
  styleUrls: ['./bac-si-kham.component.scss']
})
export class BacSiKhamComponent implements OnInit {

  tabActive:number=0;
  now:Date=new Date();
  constructor() { }

  ngOnInit() {
    this.initHangDoi();
    this.initDaHoanThanh();
  }
  selectedIndexChange(event:any){
    this.tabActive=event;    
  }
  //#region Hàng đợi
  bacSiKhamHangDoiQueryInfo:any={};
  bacSiKhamHangDoiSearching:boolean=false;
  columnsHangDoi: TableColumn<any>[] = [];
  dataSourceHangDoi: any;
  groupByColumnsHangDoi: string[] = ["TrangThai"];
  sortByColumnHangDoi: SortDescriptor = { field: 'Id', dir: 'desc' };
  documentTypeHangDoi: DocumentType;
  dataItemHangDoiSelected:any;
  @ViewChild('hoTenTemplate', { static: true }) hoTenTemplate: TemplateRef<any>;


  initHangDoi() {
    this.documentTypeHangDoi = DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.columnsHangDoi = [
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', minWidth: 195, visible: true,template:this.hoTenTemplate },
      { label: 'GT', property: 'GioiTinh', type: 'text', width: 40, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text', width: 40, visible: true },
    ];
    this.getDataHangDoi();
  }
  getDataHangDoi() {
    this.dataSourceHangDoi = {
      Data: [
        { "Id": 1,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 2,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 3,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 4,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 5,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 6,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 7,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 8,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 9,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 10,"TrangThai":"CHỜ KHÁM", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 11,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 12,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 13,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 14,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 15,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 16,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 17,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 18,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 19,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 20,"TrangThai":"CHỜ KẾT LUẬN", "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
      ],
      TotalRowCount: 20
    }
  }
  timKiemHangDoi(){
    this.bacSiKhamHangDoiSearching=true;
  }
  huyTimKiemHangDoi(){
    this.bacSiKhamHangDoiSearching=false;
  }
  chonNguoiBenhKham(dataItem:any){
    this.dataItemHangDoiSelected=dataItem;
  }
  extQuayLaiHangDoi(){
    this.dataItemHangDoiSelected=null;
  }
  //#endregion

  //#region Đã hoàn thành

  bacSiKhamDaHoanThanhQueryInfo:any={"HoanThanhKhamTu":new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),0,0,0),"HoanThanhKhamDen":new Date(this.now.getFullYear(),this.now.getMonth(),this.now.getDate(),23,59,59)};
  bacSiKhamDaHoanThanhSearching:boolean=false;
  columnsDaHoanThanh: TableColumn<any>[] = [];
  dataSourceDaHoanThanh: any;
  groupByColumnsDaHoanThanh: string[] = [];
  sortByColumnDaHoanThanh: SortDescriptor = { field: 'Id', dir: 'desc' };
  documentTypeDaHoanThanh: DocumentType;
  dataItemDaHoanThanhSelected:any;
  @ViewChild('maTiepNhanTemplate', { static: true }) maTiepNhanTemplate: TemplateRef<any>;

  initDaHoanThanh() {
    this.documentTypeDaHoanThanh = DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.columnsDaHoanThanh = [
      { label: 'MÃ TN', property: 'MaTiepNhan', type: 'text', width: 90, visible: true, disableFilter: false,template:this.maTiepNhanTemplate },
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 70, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', minWidth: 200, visible: true },
      { label: 'GT', property: 'GioiTinh', type: 'text', width: 50, visible: true },
      { label: 'NS', property: 'NamSinh', type: 'text', width: 50, visible: true },
      { label: 'NGÀY HOÀN THÀNH', property: 'NgayHoanThanh', type: 'text', width: 150, visible: true },
    ];
    this.getDataDaHoanThanh();
  }
  getDataDaHoanThanh() {
    this.dataSourceDaHoanThanh = {
      Data: [
        { "Id": 1, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 2, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 3, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 4, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 5, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 6, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 7, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 8, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 9, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 10, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 11, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 12, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 13, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 14, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 15, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 16, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 17, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 18, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 19, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
        { "Id": 20, "MaTiepNhan": "2207150199", "MaNguoiBenh": "22052611", "HoTen": "ĐẶNG THỊ NGỌC BÍCH", "GioiTinh": "Nữ", "NamSinh": 1988, "SoDienThoai": "0856781221", "DiaChi": "15 Nguyễn Trãi, Phường 1, Quận 1, TP Hồ Chí Minh", "NgayHoanThanh": "25/12/2020 05:25 AM" },
      ],
      TotalRowCount: 10
    }
  }
  timKiemDaHoanThanh(){
    this.bacSiKhamDaHoanThanhSearching=true;
  }
  huyTimKiemDaHoanThanh(){
    this.bacSiKhamDaHoanThanhSearching=false;
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemDaHoanThanhSelected=dataItem;
  }
  //#endregion
}
