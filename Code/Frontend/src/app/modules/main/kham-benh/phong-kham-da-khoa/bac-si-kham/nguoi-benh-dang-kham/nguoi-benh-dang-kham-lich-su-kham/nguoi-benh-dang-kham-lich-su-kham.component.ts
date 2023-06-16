import { Component, Input, OnInit } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

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
  sortByColumnLichSuKham: SortDescriptor = { field: 'NgayKham', dir: 'asc' };
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentTypeLichSuKham=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsLichSuKham();
    this.getDataForGridLichSuKham();
  }
  getColumnsLichSuKham() {
    this.columnsLichSuKham = [
      { label: 'NGÀY KHÁM', property: 'NgayKham', type: 'text', width: 100, isLink: true, visible: true },
      { label: 'BÁC SĨ KHÁM', property: 'BacSiKham', type: 'text', width: 150, visible: true },
      { label: 'KẾT LUẬN', property: 'KetLuan', type: 'text', minWidth: 200, visible: true }
    ];
  }
  getDataForGridLichSuKham() {
    this.dataSourceLichSuKham = {
      Data: [
        { "Id": 1, "KetLuan": "Viêm xoan", "BacSiKham": "Nguyễn Văn A", "NgayKham": "14/04/2022" }
      ],
      TotalRowCount: 49
    }
  }
}
