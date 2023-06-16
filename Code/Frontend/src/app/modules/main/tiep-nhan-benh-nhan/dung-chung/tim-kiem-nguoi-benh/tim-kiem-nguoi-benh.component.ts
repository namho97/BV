import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';


@Component({
  selector: 'app-tim-kiem-nguoi-benh',
  templateUrl: './tim-kiem-nguoi-benh.component.html',
  styleUrls: ['./tim-kiem-nguoi-benh.component.scss']
})
export class TimKiemNguoiBenhComponent implements OnInit {

  timKiemModel: any = {};
  documentTypeTimKiemNguoiBenh:DocumentType;
  dataChonTimKiemNguoiBenh: any;
  columnsTimKiemNguoiBenh: TableColumn<any>[] = [];
  groupByColumnsTimKiemNguoiBenh: string[] = [];
  sortByColumnTimKiemNguoiBenh: SortDescriptor = { field: 'HoTen', dir: 'asc' };
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild("tableTimKiemNguoiBenh", { static: true }) table:TableComponent;
  constructor(public dialogRef: MatDialogRef<TimKiemNguoiBenhComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.timKiemModel.MaNguoiBenh=data.MaNguoiBenh;
      this.timKiemModel.HoTen=data.HoTen;
      this.timKiemModel.SoDienThoai=data.SoDienThoai;
      this.timKiemModel.SoChungMinhThu=data.SoChungMinhThu;
    }

  ngOnInit() {
    this.documentTypeTimKiemNguoiBenh=DocumentType.None;
    this.getColumnsTimKiemNguoiBenh();
  }
  ngAfterContentInit(){
    
    if((this.timKiemModel.HoTen!=null && this.timKiemModel.HoTen!="")||
    (this.timKiemModel.SoDienThoai!=null && this.timKiemModel.SoDienThoai!="")||
    (this.timKiemModel.SoChungMinhThu!=null && this.timKiemModel.SoChungMinhThu!=""))
    {
      this.timKiem();      
    }
  }
  close(result = null) {
    this.dialogRef.close(result);
  }
  getColumnsTimKiemNguoiBenh() {
    this.columnsTimKiemNguoiBenh = [
      // { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text',width:60, visible: true,isLink:true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true },
      { label: 'GT', property: 'GioiTinhHienThi', type: 'text',width:40, visible: true },
      { label: 'NS', property: 'NgayThangNamSinh', type: 'text',width:70, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'CCCD', property: 'SoChungMinhThu', type: 'text',width:110, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:200, visible: true },
      { label: '', property: 'actions', type: 'button', visible: true, width: 80, useActionDefault: true, hideFilter: true, template: this.actionTemplate }
    ];
  }
  chon(dataItem:any){
    this.dialogRef.close(dataItem);
  }
  onKey(event:any){
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.timKiemModel;
    this.table.search();
    this.dangTimKiem=true;
  }
  huyTimKiem(){
    this.timKiemModel={};
    this.timKiem();
    this.dangTimKiem=false;
  }
}
