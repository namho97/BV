import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { InBaoCaoComponent } from './in-bao-cao/in-bao-cao.component';
declare let $: any;

@Component({
  selector: 'app-phat-thuoc',
  templateUrl: './phat-thuoc.component.html',
  styleUrls: ['./phat-thuoc.component.scss']
})
export class PhatThuocComponent implements OnInit {

  queryInfo:any={};
  queryInfoCompare:any={};
  loadWhenPrintClick:boolean=false;
  columns: TableColumn<any>[] = [];
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor = { field: 'NgayPhatThuoc', dir: 'asc' };
  documentType: DocumentType;
  dataItemSelected:any;
  @ViewChild("table", { static: true }) table:TableComponent;
  @ViewChild('donGiaTemplate', { static: true }) donGiaTemplate: TemplateRef<any>;
  @ViewChild('thanhTienTemplate', { static: true }) thanhTienTemplate: TemplateRef<any>;
  @ViewChild('doanhThuTemplate', { static: true }) doanhThuTemplate: TemplateRef<any>;
  constructor(private dialog: MatDialog,private apiService: ApiService, private authService: AuthService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.documentType = DocumentType.BaoCaoBacSiGiaDinhPhatThuoc;
    this.columns = [
      { label: 'MÃ NB', property: 'MaNguoiBenh', type: 'text', width: 80, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text', width: 150, visible: true },
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text', width: 50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text', width: 80, visible: true },
      { label: 'ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text', width: 100, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text', minWidth: 100, visible: true },
      { label: 'NGÀY PHÁT SINH', property: 'NgayPhatThuocHienThi', type: 'text', width: 100, visible: true },
      { label: 'TRẠNG THÁI', property: 'TrangThaiHienThi', type: 'text', width: 100, visible: true },
      { label: 'TÊN THUỐC', property: 'TenThuoc', type: 'text', width: 100, visible: true },
      { label: 'SỐ ĐK', property: 'SoDangKy', type: 'text', width: 100, visible: true },
      { label: 'ĐVT', property: 'DonViTinh', type: 'text', width: 100, visible: true },
      { label: 'SỐ LƯỢNG', property: 'SoLuong', type: 'text', width: 100, visible: true },
      { label: 'ĐƠN GIÁ', property: 'DonGia', type: 'text', width: 100, visible: true,template:this.donGiaTemplate },
      { label: 'THÀNH TIỀN', property: 'ThanhTien', type: 'text', width: 100, visible: true,template:this.thanhTienTemplate },
      { label: 'DOANH THU', property: 'DoanhThu', type: 'text', width: 100, visible: true ,template:this.doanhThuTemplate },
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
  trangThaimodelObjectChange(event:any){
    this.queryInfo.TrangThaiHienThi=event.DisplayName;
  }
  xuatBaoCao() {
    this.dialog.open(LoadingComponent, {
      disableClose: true,
      width: '200px',
      height: '130px',
      data: { Title: 'Đang xuất excel...' }
    });
    
    if(this.authService.hasPermission(this.documentType, SecurityOperation.View)) {
      this.apiService.postExportExcel<string>("BaoCaoBacSiGiaDinhPhatThuoc/ExportBaoCaoPhatThuoc", this.queryInfo).subscribe(res => {
        let dateTimeNow = new Date();
        CommonService.downLoadFile(res, "application/vnd.ms-excel", "BaoCaoPhatThuoc" + dateTimeNow.getFullYear() + ".xlsx");
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
      this.apiService.post("BaoCaoBacSiGiaDinhPhatThuoc/PrintBaoCaoPhatThuoc", this.queryInfo).subscribe(res => {        
        this.dialog.closeAll();
        this.dialog.open(InBaoCaoComponent, {
          disableClose: true,
          width: ($(window).width()-50>1500?1500:$(window).width()-50)+"px",
          data: { 
            Data:res,
            TrangThai:this.queryInfo.TrangThaiHienThi ,
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
