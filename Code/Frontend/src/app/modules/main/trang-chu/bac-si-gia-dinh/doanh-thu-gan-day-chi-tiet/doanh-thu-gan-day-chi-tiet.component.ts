import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";


@Component({
  selector: 'app-doanh-thu-gan-day-chi-tiet',
  templateUrl: './doanh-thu-gan-day-chi-tiet.component.html',
  styleUrls: ['./doanh-thu-gan-day-chi-tiet.component.scss']
})
export class DoanhThuGanDayChiTietComponent implements OnInit {

  timKiemModel: any = {};
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];
  dataSource:any;
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'NgayTiepNhan',dir:'asc'};
  @ViewChild("tableDoanhThu", { static: true }) table:TableComponent;
  @ViewChild('soHoaDonTemplate', { static: true }) soHoaDonTemplate: TemplateRef<any>;
  @ViewChild('soTienTemplate', { static: true }) soTienTemplate: TemplateRef<any>;
  constructor(public dialogRef: MatDialogRef<DoanhThuGanDayChiTietComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.documentType = DocumentType.TrangChuBacSiGiaDinh;
    this.columns=[
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true},
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:300, visible: true },

      { label: 'SỐ PHIẾU', property: 'SoPhieu', type: 'text', width: 130, visible: true,template:this.soHoaDonTemplate },
      { label: 'SỐ TIỀN', property: 'TongSoTienBangSo', type: 'text', width: 90, visible: true,template:this.soTienTemplate },
      { label: 'HÌNH THƯC THANH TOÁN', property: 'HinhThucThanhToan', type: 'text', width: 140, visible: true },
      { label: 'NỘI DUNG THU', property: 'NoiDungThu', type: 'text', width: 150, visible: true },
      { label: 'NGÀY THU', property: 'NgayThuHienThi', type: 'text', width: 140, visible: true},
      { label: 'NGƯỜI THU', property: 'NhanVienThu', type: 'text', width: 120, visible: true }
    ];
    this.timKiemModel.NgayThu=CommonService.convertStringDDMMYYYToDate(this.data.NgayThu);
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
  this.timKiemModel={NgayThu:CommonService.convertStringDDMMYYYToDate(this.data.NgayThu)};
  this.timKiem();
  this.dangTimKiem=false;
}
//#endregion tìm kiếm
  close() {
    this.dialogRef.close(false);
  }

}
