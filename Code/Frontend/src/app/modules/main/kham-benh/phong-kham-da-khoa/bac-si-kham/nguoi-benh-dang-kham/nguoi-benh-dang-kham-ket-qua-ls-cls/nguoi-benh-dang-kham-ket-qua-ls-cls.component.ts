import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-nguoi-benh-dang-kham-ket-qua-ls-cls',
  templateUrl: './nguoi-benh-dang-kham-ket-qua-ls-cls.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-ket-qua-ls-cls.component.scss']
})
export class NguoiBenhDangKhamKetQuaLsClsComponent implements OnInit {

  documentTypeKetQua:DocumentType;
  dataChonKetQua: any;
  columnsKetQua: TableColumn<any>[] = [];
  dataSourceKetQua: any;
  groupByColumnsKetQua: string[] = [];
  sortByColumnKetQua: SortDescriptor = { field: 'TenDichVu', dir: 'asc' };
  @ViewChild('xemKetQuaTemplate', { static: true }) xemKetQuaTemplate: TemplateRef<any>;
  @Input() data:any;
  constructor() { }

  ngOnInit() {
    this.documentTypeKetQua=DocumentType.KhamBenhPhongKhamDaKhoaBacSiKham;
    this.getColumnsKetQua();
    this.getDataForGridKetQua();
  }
  getColumnsKetQua() {
    this.columnsKetQua = [
      { label: 'DỊCH VỤ', property: 'DichVu', type: 'text', minWidth: 300, visible: true },
      { label: 'NGÀY CHỈ ĐỊNH', property: 'NgayChiDinh', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI CHỈ ĐỊNH', property: 'NguoiChiDinh', type: 'text', width: 150, visible: true },
      { label: 'NGÀY THỰC HIỆN', property: 'NgayThucHien', type: 'text', width: 150, visible: true },
      { label: 'NGƯỜI THỰC HIỆN', property: 'NguoiThucHien', type: 'text', width: 150, visible: true },
      { label: '', property: 'Id', type: 'text', width: 40, visible: true,template:this.xemKetQuaTemplate }
    ];
  }
  getDataForGridKetQua() {
    this.dataSourceKetQua = {
      Data: [
        { "Id": 1, "DichVu": "Nội soi phổi", "NguoiChiDinh": "Nguyễn Văn A", "NgayChiDinh": "14/04/2022 05:12 AM", "NguoiThucHien": "Nguyễn Văn A", "NgayThucHien": "14/04/2022 05:12 AM" },
        { "Id": 2, "DichVu": "Điện tim", "NguoiChiDinh": "Nguyễn Văn A", "NgayChiDinh": "14/04/2022 05:12 AM", "NguoiThucHien": "Nguyễn Văn A", "NgayThucHien": "14/04/2022 05:12 AM" }
      ],
      TotalRowCount: 49
    }
  }

}
