import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { NguoiBenhDangKhamLichSuKhamChiTietComponent } from './nguoi-benh-dang-kham-lich-su-kham-chi-tiet/nguoi-benh-dang-kham-lich-su-kham-chi-tiet.component';

declare let $: any;
@Component({
  selector: 'app-nguoi-benh-dang-kham-lich-su-kham',
  templateUrl: './nguoi-benh-dang-kham-lich-su-kham.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-lich-su-kham.component.scss']
})
export class NguoiBenhDangKhamLichSuKhamComponent implements OnInit {

  documentTypeLichSuKham:DocumentType;
  dataChonLichSuKham: any;
  columnsLichSuKham: TableColumn<any>[] = [];
  dataSourceLichSuKham: any;
  groupByColumnsLichSuKham: string[] = [];
  sortByColumnLichSuKham: SortDescriptor = { field: 'NgayHoanThanhKham', dir: 'asc' };
  @Input() data:any;
  @Input() thongTinHanhChinh:any;
  @Input() taoDangKyMoi:any;
  @ViewChild('ngayKhamTemplate',{static:true}) ngayKhamTemplate:TemplateRef<any>;
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.documentTypeLichSuKham=DocumentType.KhamBenhBacSiGiaDinhBacSiKham;
    this.getColumnsLichSuKham();
  }
  getColumnsLichSuKham() {
    this.columnsLichSuKham = [
      { label: 'NGÀY KHÁM', property: 'NgayHoanThanhKhamHienThi', type: 'text', width: 100, visible: true ,template:this.ngayKhamTemplate},
      { label: 'LÝ DO KHÁM', property: 'LyDoKhamBenh', type: 'text', width: 150, visible: true },
      { label: 'BÁC SĨ KHÁM', property: 'BacSiKham', type: 'text', width: 150, visible: true },
      { label: 'KẾT LUẬN', property: 'NoiDungChanDoan', type: 'text', minWidth: 200, visible: true },
      { label: 'CÁCH GIẢI QUYẾT', property: 'CachGiaiQuyetHienThi', type: 'text', width: 150, visible: true }
    ];
  }
  
  view(dataItem:any){
    var dialogRef=this.dialog.open(NguoiBenhDangKhamLichSuKhamChiTietComponent,{
      width:'1200px',
      data:{
        dataItem:dataItem,
        displayOnPopup:true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {

      }
    });
  }
}
