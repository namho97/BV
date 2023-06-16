import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { NguoiBenhDangKhamLichSuKhamChiTietComponent } from '../../../bac-si-kham/nguoi-benh-dang-kham/nguoi-benh-dang-kham-lich-su-kham/nguoi-benh-dang-kham-lich-su-kham-chi-tiet/nguoi-benh-dang-kham-lich-su-kham-chi-tiet.component';

@Component({
  selector: 'app-lich-su-kham-chi-tiet-lich-su-kham',
  templateUrl: './lich-su-kham-chi-tiet-lich-su-kham.component.html',
  styleUrls: ['./lich-su-kham-chi-tiet-lich-su-kham.component.scss']
})
export class LichSuKhamChiTietLichSuKhamComponent implements OnInit {

  documentTypeLichSuKham:DocumentType;
  dataChonLichSuKham: any;
  columnsLichSuKham: TableColumn<any>[] = [];
  dataSourceLichSuKham: any;
  groupByColumnsLichSuKham: string[] = [];
  sortByColumnLichSuKham: SortDescriptor = { field: 'NgayKham', dir: 'asc' };
  @ViewChild('ngayKhamTemplate',{static:true}) ngayKhamTemplate:TemplateRef<any>;
  @Input() data:any;
  constructor(private dialog:MatDialog) { }

  ngOnInit() {
    this.documentTypeLichSuKham=DocumentType.KhamBenhBacSiGiaDinhLichSuBacSiKham;
    this.getColumnsLichSuKham();
  }
  getColumnsLichSuKham() {
    this.columnsLichSuKham = [
      { label: 'NGÀY KHÁM', property: 'NgayKham', type: 'text', width: 100, visible: true ,template:this.ngayKhamTemplate},
      { label: 'LÝ DO KHÁM', property: 'LyDoKham', type: 'text', width: 150, visible: true },
      { label: 'BÁC SĨ KHÁM', property: 'BacSiKham', type: 'text', width: 150, visible: true },
      { label: 'KẾT LUẬN', property: 'KetLuan', type: 'text', minWidth: 200, visible: true },
      { label: 'CÁCH GIẢI QUYẾT', property: 'CachGiaiQuyet', type: 'text', width: 150, visible: true }
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
