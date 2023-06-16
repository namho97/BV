import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { TableColumn, SortDescriptor } from 'src/app/shared/components/table/table.model';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { DocumentType } from "src/app/shared/enum/document-type.enum";
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-dang-ky-kham',
  templateUrl: './dang-ky-kham.component.html',
  styleUrls: ['./dang-ky-kham.component.scss']
})
export class DangKyKhamComponent implements OnInit {

  id: number = null;
  dataChon: any;
  dataItemChon:any;
  timKiemModel: any = {};
  accessUser:AccessUser;
  documentType: DocumentType;
  columns: TableColumn<any>[] = [];
  dataSource:any;
  groupByColumns: string[] = [];
  sortByColumn: SortDescriptor={field:'NgayTiepNhan',dir:'asc'};
  @ViewChild('actionTemplate', { static: true }) actionTemplate: TemplateRef<any>;
  @ViewChild('hoTenTemplate', { static: true }) hoTenTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangDenTemplate', { static: true }) tinhTrangDenTemplate: TemplateRef<any>;
  @ViewChild('laDangKyHenTruocTemplate', { static: true }) laDangKyHenTruocTemplate: TemplateRef<any>;
  @ViewChild('tinhTrangTemplate', { static: true }) tinhTrangTemplate: TemplateRef<any>;
  @ViewChild("tableDangKyKham", { static: true }) table:TableComponent;

  constructor(private route: ActivatedRoute, public dialog: MatDialog,  private authService:AuthService, private cdref: ChangeDetectorRef,
    private snackBar:MatSnackBar,private apiService:ApiService) {
    this.id = this.route.snapshot.queryParams.id;
  }
//#region init
  ngOnInit() {
    this.accessUser=this.authService.getAccessUser();
    this.documentType = DocumentType.TiepNhanNguoiBenhBacSiGiaDinhDangKyKham;
    this.columns=[
      { label: 'STT', property: 'SoThuTu', type: 'text',width:30, visible: true },
      { label: 'HỌ TÊN', property: 'HoTen', type: 'text',width:160, visible: true,sticky:true,template:this.hoTenTemplate},
      // { label: 'TRẠNG THÁI ĐẾN', property: 'TinhTrangDen', type: 'text',width:110, visible: true,template:this.tinhTrangDenTemplate },
      { label: 'G.TÍNH', property: 'GioiTinhHienThi', type: 'text',width:50, visible: true },
      { label: 'NGÀY SINH', property: 'NgayThangNamSinh', type: 'text',width:80, visible: true },
      { label: 'SỐ ĐIỆN THOẠI', property: 'SoDienThoai', type: 'text',width:90, visible: true },
      { label: 'ĐỊA CHỈ', property: 'DiaChiDayDu', type: 'text',minWidth:300, visible: true },
      { label: 'NGƯỜI TIẾP NHẬN', property: 'NguoiTiepNhan', type: 'text',width:110, visible: true },
      { label: 'TIẾP NHẬN LÚC', property: 'NgayTiepNhanHienThi', type: 'text',width:140, visible: true },
      { label: 'LÝ DO KHÁM', property: 'LyDoTiepNhan', type: 'text',width:120, visible: true },
      // { label: 'HẸN TRƯỚC', property: 'LaDangKyHenTruoc', type: 'text', visible: true,width:80, hideFilter:true,template:this.laDangKyHenTruocTemplate  },
      { label: 'TRẠNG THÁI', property: 'TrangThaiYeuCauTiepNhan', type: 'text', visible: true,width:100, hideFilter:true,template:this.tinhTrangTemplate  },
      { label: '', property: 'actions', type: 'button', visible: true,width:40, useActionDefault:true ,hideFilter:true,template:this.actionTemplate  },
    ];
    var now=new Date();
    this.timKiemModel.NgayTiepNhanTu=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0);
    this.timKiemModel.NgayTiepNhanDen=new Date(now.getFullYear(),now.getMonth(),now.getDate(),23,59,59);
    this.table.additionalSearchObject = this.timKiemModel;
    this.dangTimKiem=true;
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    if (this.id != null) {
      var self=this;
      setTimeout(function(){
        self.table.view(self.id);
      });
    }
  }
  //#endregion init

//#region actions
  extDataItemSelected(event)
  {
    this.dataChon = event;
    this.cdref.detectChanges();

  }
  quayLaiChange() {
    this.dataChon = null;
    this.table.back();
  }
  dataChange(event) {
    if (event) {
      this.table.search();
    }
  }
  //#endregion actions


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
    this.timKiemModel={};
    this.timKiem();
    this.dangTimKiem=false;
  }
  //#endregion tìm kiếm

  popupLoadingData: any;
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
  nguoiBenhDaDen(dataItem:any){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn người bệnh đã đến phòng khám?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/CapNhatTrangThaiDen",{Id:dataItem.Id}).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Cập nhật tình trạng đã đến thành công", "success");
            dataItem.TinhTrang="Đợi khám";
            dataItem.LoaiTinhTrang=2;
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật tình trạng đã đến không thành công", "error");
          }
          this.closePopupLoadingData();
        },(err:any) => {
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            console.log(err);
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
  huyDangKy(dataItem:any){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn hủy đăng ký khám của người bệnh này?",
        yesColor:"warn",
        inputReason:true,
        reasonLabel:"Lý do"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.Chon == true) {
        this.showPopupLoadingData();
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/HuyDangKyKham",{Id:dataItem.Id,LyDoHuy:result.Reason}).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám thành công", "success");
            this.table.refresh();
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám không thành công", "error");
          }
          this.closePopupLoadingData();
        },(err:any) => {
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            console.log(err);
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
}
