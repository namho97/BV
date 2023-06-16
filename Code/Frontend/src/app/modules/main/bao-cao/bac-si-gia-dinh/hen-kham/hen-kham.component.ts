import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { InBaoCaoHenKhamComponent } from './in-bao-cao-hen-kham/in-bao-cao-hen-kham.component';
declare let $: any;

@Component({
  selector: 'app-hen-kham',
  templateUrl: './hen-kham.component.html',
  styleUrls: ['./hen-kham.component.scss']
})
export class HenKhamComponent implements OnInit {

  queryInfo: any = {};
  queryInfoCompare:any={};
  loadWhenPrintClick:boolean=false;
  columns: TableColumn<any>[] = [];
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor = { field: 'NgayHenKham', dir: 'asc' };
  documentType: DocumentType;
  dataItemSelected: any;
  printHtml: any = null;
  @ViewChild("table", { static: true }) table: TableComponent;
  constructor(private dialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar,
    private authService: AuthService) { }

  ngOnInit() {
    this.documentType = DocumentType.BaoCaoBacSiGiaDinhDoanhThu;
    this.columns = [
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 80, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 150, visible: true },
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text', width: 50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text', width: 80, visible: true },
      { label: 'ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text', width: 100, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text', minWidth: 100, visible: true },
      { label: 'NGÀY HẸN', property: 'NgayHenKhamHienThi', type: 'text', width: 100, visible: true },
      { label: 'GIỜ HẸN', property: 'GioHenKhamHienThi', type: 'text', width: 100, visible: true },
      { label: 'HÌNH THỨC HẸN', property: 'HinhThucHenHienThi', type: 'text', width: 100, visible: true },
      { label: 'TRẠNG THÁI', property: 'TrangThaiHienThi', type: 'text', width: 100, visible: true },
    ];

  }
  onKey(event: any) {
    if (event.key == 'Enter') {
      this.timKiem();
    }
  }
  dangTimKiem: boolean = false;
  timKiem() {
    this.table.additionalSearchObject = this.queryInfo;
    this.table.search();
    this.dangTimKiem = true;
  }
  huyTimKiem() {
    this.queryInfo = {};
    this.timKiem();
    this.dangTimKiem = false;
  }
  chonNguoiBenhXemChiTiet(dataItem: any) {
    this.dataItemSelected = dataItem;
  }
  trangThaimodelObjectChange(event:any){
    this.queryInfo.TrangThaiHienThi=event.DisplayName;
  }
  popupLoadingData: any = null;
  showPopupLoadingData(mess: string = 'Đang tải dữ liệu...') {
    this.popupLoadingData = this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: mess }
    });
  }
  closePopupLoadingData() {
    if (this.popupLoadingData != undefined && this.popupLoadingData != null) {
      this.popupLoadingData.close();
    }
  }
  xuatExcel() {
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: 'Đang xuất excel...' }
    });
    
    if(this.authService.hasPermission(this.documentType, SecurityOperation.View)) {
      this.apiService.postExportExcel("BaoCaoBacSiGiaDinhHenKham/ExportBaoCaoHenKham", this.queryInfo).subscribe((result) => {
        let dateTimeNow = new Date();
        CommonService.downLoadFile(result, "application/vnd.ms-excel", "BaoCaoHenKham" + dateTimeNow.getFullYear() + ".xlsx");
        this.dialog.closeAll();
      }, err => {
        CommonService.openSnackBar(this.snackBar, err.Message, "error");
        this.dialog.closeAll();
      })
    } else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }

  print(){
    
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: 'Đang tải dữ liệu để in...' }
    });
    //KHi in sẽ lấy tat cả dử liệu
    if(this.authService.hasPermission(this.documentType, SecurityOperation.View)) {
      this.apiService.post("BaoCaoBacSiGiaDinhHenKham/PrintBaoCaoHenKham", this.queryInfo).subscribe(res => {        
        this.dialog.closeAll();
        this.dialog.open(InBaoCaoHenKhamComponent, {
          disableClose: true,
          width: ($(window).width()-50>1500?1500:$(window).width()-50)+"px",
          data: { 
            Data:res,
            TrangThai:this.queryInfo.TrangThaiHienThi,
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
