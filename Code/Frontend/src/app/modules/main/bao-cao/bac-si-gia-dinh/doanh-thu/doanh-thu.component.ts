import { InBaoCaoComponent } from './in-bao-cao/in-bao-cao.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit,  TemplateRef,  ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
declare let $: any;

@Component({
  selector: 'app-doanh-thu',
  templateUrl: './doanh-thu.component.html',
  styleUrls: ['./doanh-thu.component.scss']
})
export class DoanhThuComponent implements OnInit {

  queryInfo:any={};
  queryInfoCompare:any={};
  loadWhenPrintClick:boolean=false;
  columns: TableColumn<any>[] = [];
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor = { field: 'NgayPhatSinh', dir: 'asc' };
  documentType: DocumentType;
  dataItemSelected:any;
  @ViewChild("table", { static: true }) table:TableComponent;
  @ViewChild('donGiaTemplate', { static: true }) donGiaTemplate: TemplateRef<any>;
  @ViewChild('thanhTienTemplate', { static: true }) thanhTienTemplate: TemplateRef<any>;
  @ViewChild('doanhThuTemplate', { static: true }) doanhThuTemplate: TemplateRef<any>;
  constructor(private dialog: MatDialog,private apiService: ApiService, private authService: AuthService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.documentType = DocumentType.BaoCaoBacSiGiaDinhDoanhThu;
    this.columns = [
      { label: 'NGÀY PHÁT SINH', property: 'NgayPhatSinhHienThi', type: 'text', width: 150, visible: true},
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 150, visible: true},
      { label: 'TRẠNG THÁI THANH TOÁN', property: 'TrangThaiThanhToanHienThi', type: 'text', width: 150, visible: true},
      { label: 'LOẠI DỊCH VỤ', property: 'LoaiDichVuHienThi', type: 'text', width: 120, visible: true},
      { label: 'TÊN DỊCH VỤ', property: 'TenDichVu', type: 'text', minWidth: 150, visible: true},
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 70, visible: true},
      { label: 'SỐ LƯỢNG', property: 'SoLuong', type: 'text', width: 60, visible: true},
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 80, visible: true,template:this.donGiaTemplate},
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 100, visible: true,template:this.thanhTienTemplate},
      { label: 'DOANH THU', property: 'DoanhThu', type: 'text', width: 100, visible: true,template:this.doanhThuTemplate}
    ];
  }


  onKey(event: any) {
    if (event.key == 'Enter') {
        this.timKiem();
    }
  }
  dangTimKiem:boolean=false;
  timKiem() {
    this.table.additionalSearchObject = this.queryInfo;
    this.table.search();
    this.dangTimKiem=true;
    this.queryInfoCompare=CommonService.copyObject(this.queryInfo);
  }
  huyTimKiem(){
    this.queryInfo={};
    this.table.setDataSource({Data:[],TotalRowCount:0});
    this.dangTimKiem=false;
    this.queryInfoCompare=CommonService.copyObject(this.queryInfo);
  }
  chonNguoiBenhXemChiTiet(dataItem:any){
    this.dataItemSelected=dataItem;
  }
  trangThaiThanhToanmodelObjectChange(event:any){
    this.queryInfo.TrangThaiThanhToanHienThi=event.DisplayName;
  }
  loaiDichVumodelObjectChange(event:any){
    this.queryInfo.LoaiDichVuHienThi=event.DisplayName;
  }
  xuatBaoCao() {
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: 'Đang xuất excel...' }
    });
    
    if(this.authService.hasPermission(this.documentType, SecurityOperation.View)) {
      this.apiService.postExportExcel<string>("BaoCaoBacSiGiaDinhDoanhThu/ExportBaoCaoDoanhThu", this.queryInfo).subscribe(res => {
        let dateTimeNow = new Date();
        CommonService.downLoadFile(res, "application/vnd.ms-excel", "BaoCaoDoanhThu" + dateTimeNow.getFullYear() + ".xlsx");
        this.dialog.closeAll();
      }, err => {
        CommonService.openSnackBar(this.snackBar, err.Message, "error");
        this.dialog.closeAll();
      })
    } else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
  inBaoCao(){
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: 'Đang tải dữ liệu để in...' }
    });
    //KHi in sẽ lấy tat cả dử liệu
    if(this.authService.hasPermission(this.documentType, SecurityOperation.View)) {
      this.apiService.post("BaoCaoBacSiGiaDinhDoanhThu/PrintBaoCaoDoanhThu", this.queryInfo).subscribe(res => {        
        this.dialog.closeAll();
        this.dialog.open(InBaoCaoComponent, {
          disableClose: true,
          width: ($(window).width()-50>1500?1500:$(window).width()-50)+"px",
          data: { 
            Data:res,
            TrangThaiThanhToan:this.queryInfo.TrangThaiThanhToanHienThi ,
            LoaiDichVu:this.queryInfo.LoaiDichVuHienThi,
            TuNgay:this.queryInfo.TuNgay,
            DenNgay:this.queryInfo.DenNgay
          }
        });
      }, err => {
        CommonService.openSnackBar(this.snackBar, err.Message, "error");
        this.dialog.closeAll();
      })
    } else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
}
