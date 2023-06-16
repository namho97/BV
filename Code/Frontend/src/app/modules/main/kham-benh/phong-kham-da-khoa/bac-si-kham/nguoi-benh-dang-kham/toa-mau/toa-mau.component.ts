import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-toa-mau',
  templateUrl: './toa-mau.component.html',
  styleUrls: ['./toa-mau.component.scss']
})
export class ToaMauComponent implements OnInit {

  documentTypeToaMau:DocumentType;
  dataChonToaMau: any;
  columnsToaMau: TableColumn<any>[] = [];
  dataSourceToaMau: any;
  groupByColumnsToaMau: string[] = [];
  sortByColumnToaMau: SortDescriptor = { field: 'TenDichVu', dir: 'asc' };
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentTypeToaMau=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsToaMau();
    this.getDataForGridToaMau();
    this.getColumnsChiTietToaMau();
    this.getDataForGridChiTietToaMau();
  }
  getColumnsToaMau() {
    this.columnsToaMau = [
      { label: 'TÊN TOA MẪU', property: 'TenToaMau', type: 'text', width: 150, isLink: true, visible: true },
      { label: 'BÁC SĨ KÊ TOA', property: 'BacSiKeToa', type: 'text', width: 150, visible: true },
      { label: 'CHẨN ĐOÁN ICD', property: 'ChanDoanIcd', type: 'text', width: 250, visible: true },
      { label: 'GHI CHÚ', property: 'GhiChu', type: 'text', minWidth: 200, visible: true },      
      { label: '', property: 'actions', type: 'button', visible: true, width: 30, useActionDefault: true,stickyEnd:true, hideFilter: true, template: this.actionTemplate }
    ];
  }
  getDataForGridToaMau() {
    this.dataSourceToaMau = {
      Data: [
        { "Id": 1, "TenToaMau": "Viêm xoan", "BacSiKeToa": "Nguyễn Văn A", "ChanDoanIcd": "A01.1 - Bệnh phó thương hàn A" ,"GhiChu":""},
        { "Id": 2, "TenToaMau": "Viêm xoan", "BacSiKeToa": "Nguyễn Văn A", "ChanDoanIcd": "A01.1 - Bệnh phó thương hàn A" ,"GhiChu":""},
        { "Id": 3, "TenToaMau": "Viêm xoan", "BacSiKeToa": "Nguyễn Văn A", "ChanDoanIcd": "A01.1 - Bệnh phó thương hàn A" ,"GhiChu":""},
        { "Id": 4, "TenToaMau": "Viêm xoan", "BacSiKeToa": "Nguyễn Văn A", "ChanDoanIcd": "A01.1 - Bệnh phó thương hàn A" ,"GhiChu":""},
        { "Id": 5, "TenToaMau": "Viêm xoan", "BacSiKeToa": "Nguyễn Văn A", "ChanDoanIcd": "A01.1 - Bệnh phó thương hàn A" ,"GhiChu":""}
      ],
      TotalRowCount: 49
    }
  }

  columnsChiTietToaMau: TableColumn<any>[] = [];
  dataSourceChiTietToaMau: any;
  getColumnsChiTietToaMau() {
    this.columnsChiTietToaMau = [
      { label: 'TÊN', property: 'Ten', type: 'text', minWidth: 200, visible: true, disableFilter: false },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true, disableFilter: false },
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 50, visible: true, disableFilter: false },
    ];
  }
  getDataForGridChiTietToaMau() {
    this.dataSourceChiTietToaMau = {
      Data: [
        { "Id": 1,"SoThuTu":1, "Ten":"Acemuc kid", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":""},
        { "Id": 2,"SoThuTu":2, "Ten":"Acemuc ABC", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":""},
        { "Id": 3,"SoThuTu":3, "Ten":"Hemostat CPA", "HoatChat":"", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":""}
      ],
      TotalRowCount: 49
    }
  }
}
