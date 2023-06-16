import { ToaMauService } from './toa-mau.service';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { BaseService } from 'src/app/core/services/base.service';

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
  sortByColumnToaMau: SortDescriptor = { field: 'Ten', dir: 'asc' };
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor(public dialogRef: MatDialogRef<ToaMauComponent>,private baseService:BaseService,private toaMauService:ToaMauService) {
    this.baseService.controllerName=this.toaMauService.controllerName;
   }

  ngOnInit() {
    this.documentTypeToaMau=DocumentType.KhamBenhBacSiGiaDinhBacSiKham;
    this.getColumnsToaMau();
    this.getColumnsChiTietToaMau();
  }
  close(result = null) {
    this.dialogRef.close(result);
  }
  getColumnsToaMau() {
    this.columnsToaMau = [
      { label: 'TÊN TOA MẪU', property: 'Ten', type: 'text', width: 150,  visible: true },
      { label: 'BÁC SĨ KÊ TOA', property: 'BacSiDisplay', type: 'text', width: 150, visible: true },
      { label: 'CHẨN ĐOÁN ICD', property: 'IcdDisplay', type: 'text', width: 250, visible: true },
      { label: 'NỘI DUNG', property: 'GhiChu', type: 'text', minWidth: 200, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true, width: 30, useActionDefault: true,stickyEnd:true, hideFilter: true, template: this.actionTemplate }
    ];
  }

  columnsChiTietToaMau: TableColumn<any>[] = [];
  dataSourceChiTietToaMau: any;
  getColumnsChiTietToaMau() {
    this.columnsChiTietToaMau = [
      { label: 'TÊN', property: 'DuocPhamTen', type: 'text', minWidth: 200, visible: true, disableFilter: false },
      { label: 'HOẠT CHẤT', property: 'HoatChat', type: 'text', width: 100, visible: true, disableFilter: false },
      { label: 'HÀM LƯỢNG', property: 'HamLuong', type: 'text', width: 80, visible: true, disableFilter: false },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'ĐD', property: 'DuongDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SÁNG', property: 'SoLuongSang', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TRƯA', property: 'SoLuongTrua', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'CHIỀU', property: 'SoLuongChieu', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'TỐI', property: 'SoLuongToi', type: 'text', width: 50, visible: true, disableFilter: false },
      { label: 'SỐ NGÀY', property: 'SoNgayDung', type: 'text', width: 60, visible: true, disableFilter: false },
      { label: 'SL', property: 'SoLuong', type: 'text', width: 40, visible: true, disableFilter: false },
      { label: 'CÁCH DÙNG', property: 'CachDung', type: 'text', width: 100, visible: true, disableFilter: false },
    ];
  }
  chon(dataItem:any){
    this.close(dataItem);
  }
}
