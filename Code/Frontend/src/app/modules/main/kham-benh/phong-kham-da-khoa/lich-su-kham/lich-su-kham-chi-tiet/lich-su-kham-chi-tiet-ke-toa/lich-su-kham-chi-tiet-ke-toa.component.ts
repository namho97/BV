import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-ke-toa',
  templateUrl: './lich-su-kham-chi-tiet-ke-toa.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-ke-toa.component.scss']
})
export class LichSuKhamChiTietKeToaComponent implements OnInit {

  documentType:DocumentType;
  dataChonKeToa:any;
  validationErrors:any;
  keToaVo: any={LoaiBhyt:2,ChiTietSoLuong:false};
  columnsKeToa: TableColumn<any>[] = [];
  dataSourceKeToa: any;
  groupByColumnsKeToa: string[] = [];
  sortByColumnKeToa: SortDescriptor = { field: 'SoThuTu', dir: 'asc' };
  @ViewChild('thuocBHYTTemplate', { static: true }) thuocBHYTTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentType=DocumentType.KhamBenhPhongKhamDaKhoaLichSuKham;
    this.getColumnsKeToa();
    this.getDataForGridKeToa();
  }
  ngAfterViewInit() { 
  }
  getColumnsKeToa() {
    this.columnsKeToa = [      
      { label: 'TÊN', property: 'Ten', type: 'text', minWidth: 150, visible: true, disableFilter: false,sticky:true },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true, disableFilter: false },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'BHYT', property: 'ThuocBHYT', type: 'text', width: 50, visible: true, disableFilter: false ,template:this.thuocBHYTTemplate},
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', width: 100, visible: true, disableFilter: false }
      
    ];
  }
  getDataForGridKeToa() {
    this.dataSourceKeToa = {
      Data: [
        { "Id": 1,"SoThuTu":1, "Ten":"Acemuc kid", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":true},
        { "Id": 2,"SoThuTu":2, "Ten":"Acemuc ABC", "HoatChat":"Acetylcystein", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":false},
        { "Id": 3,"SoThuTu":3, "Ten":"Hemostat CPA", "HoatChat":"", "HamLuong":"200mg", "DonViTinh":"Gói", "DuongDung":"Uống", "SoLuong":"21", "CachDung":"", "SoLuongSang":"1", "SoLuongTrua":"1", "SoLuongChieu":"1", "SoLuongToi":"","ThuocBHYT":true}
      ],
      TotalRowCount: 49
    }
  }
  getContentInToaThuoc(){
    return "<h1>ĐƠN THUỐC</h1>";
  }
  
}
