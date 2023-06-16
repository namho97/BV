import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";

@Component({
  selector: 'app-tinh-trang-kham-chi-tiet',
  templateUrl: './tinh-trang-kham-chi-tiet.component.html',
  styleUrls: ['./tinh-trang-kham-chi-tiet.component.scss']
})
export class TinhTrangKhamChiTietComponent implements OnInit {

  timKiemModel: any = {};
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];
  dataSource:any;
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'NgayTiepNhan',dir:'asc'};  
  @ViewChild("tableTrangThaiKham", { static: true }) table:TableComponent;
  constructor(public dialogRef: MatDialogRef<TinhTrangKhamChiTietComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.documentType = DocumentType.TrangChuBacSiGiaDinh;
    this.columns=[
      { label: 'STT', property: 'SoThuTu', type: 'text',width:30, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true},
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:300, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoTiepNhan', type: 'text',width:120, visible: true }
    ];
    this.timKiemModel.TuNgay=this.data.TuNgay,"dd/mm/yyyy";
    this.timKiemModel.DenNgay=this.data.DenNgay,"dd/mm/yyyy";
    this.timKiemModel.TuNgayHienThi=CommonService.formatDateTime(this.data.TuNgay,"dd/mm/yyyy");
    this.timKiemModel.DenNgayHienThi=CommonService.formatDateTime(this.data.DenNgay,"dd/mm/yyyy");
    this.timKiemModel.TrangThai=this.data.TrangThai;
    this.table.additionalSearchObject = this.timKiemModel;
  }

//#region tìm kiếm
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
  this.timKiemModel={TuNgay:this.data.TuNgay,DenNgay:this.data.DenNgay,TrangThai:this.data.TrangThai};
  this.timKiem();
  this.dangTimKiem=false;
}
//#endregion tìm kiếm
  close() {
    this.dialogRef.close(false);
  }

}
