import { ApiService } from './../../../../../../core/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { ActivatedRoute } from '@angular/router';
import { ThuVienPhiRutGonComponent } from 'src/app/modules/main/thu-ngan/bac-si-gia-dinh/thu-vien-phi-rut-gon/thu-vien-phi-rut-gon.component';
import { DeviceDetectorService } from 'ngx-device-detector';
declare let $: any;

@Component({
  selector: 'app-nguoi-benh-dang-kham',
  templateUrl: './nguoi-benh-dang-kham.component.html',
  styleUrls: ['./nguoi-benh-dang-kham.component.scss']
})
export class NguoiBenhDangKhamComponent implements OnInit {

  thongTinHanhChinhVo:any={};
  tabActiveIndex:number=0;
  validationErrors:any;
  nhanLuu:boolean=false;
  nhanHoanThanhKham:boolean=false;
  nhanNhapLai:boolean=false;
  isMobile:boolean=false;
  @Input() data:any;
  @Input() taoDangKyMoi:any;
  @Output() extQuayLai= new EventEmitter<any>();
  @Output() extQuayLaiVaTaiLai= new EventEmitter<any>();
  @Output() extBatDauKham= new EventEmitter<any>();
  @ViewChild("thuVienPhi",{static:false}) thuVienPhi:ThuVienPhiRutGonComponent;
  constructor(private dialog:MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService,
    private route: ActivatedRoute,private devideService:DeviceDetectorService) {
   }

  ngOnInit() {
    this.isMobile=this.devideService.isMobile();
    this.formatFormContent(); 
    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.data != undefined && changes.data.currentValue != null) {
      this.selectedIndexChange(0);
      this.getNguoiBenhDangKhamThongTinHanhChinh();
    }
  }
  
  formatFormContent() {
    if ($(".form-content-kham-benh") != null && $(".form-content-kham-benh").length > 0) {
      $(".form-content-kham-benh").css({ "height": $(window).height() - (this.isMobile?146:159) });
    }
  }
  
  getNguoiBenhDangKhamThongTinHanhChinh(){
    this.data = this.route.snapshot.queryParams.id;
    if(this.data!=null && this.data>0)
    {
      this.showPopupLoadingData();
      this.apiService.get("KhamBenhBacSiGiaDinhBacSiKham/GetNguoiBenhDangKhamThongTinHanhChinh/"+this.data).subscribe((result)=>{
        this.thongTinHanhChinhVo=result;
        this.closePopupLoadingData();
      },(err:any) => {
        this.closePopupLoadingData();
        console.log(err);
      });
    }
    else{
      this.thongTinHanhChinhVo={};
    }
  }

  selectedIndexChange(event:number){
    this.tabActiveIndex=event;
  }
  quayLai(){
    this.tabActiveIndex=0;
    this.extQuayLai.emit(true);
  }
  quayLaiChuKham(){    
    this.tabActiveIndex=0;
    this.extQuayLai.emit(true);
  }
  batDauKhamCuaDangKyMoi(event:number){
    this.taoDangKyMoi=false;
    this.data=event;
    this.tabActiveIndex=0;
    this.extBatDauKham.emit(this.data);
  }
  huyDangKy(){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn hủy đăng ký khám của người bệnh này?",
        yesColor:'warn',
        inputReason:true,
        reasonLabel:"Lý do"

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.Chon == true) {
        this.apiService.post("TiepNhanNguoiBenhBacSiGiaDinhDangKyKham/HuyDangKyKham",{Id:this.thongTinHanhChinhVo.YeuCauTiepNhanId,LyDoHuy:result.Reason}).subscribe((result:any)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám thành công", "success");
            this.extQuayLaiVaTaiLai.emit(true);
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Hủy đăng ký khám không thành công", "error");
          }
          this.closePopupLoadingData();
          // //Hiển thị bệnh nhân tiếp theo
          // let dialogRef = this.dialog.open(NguoiBenhDangKhamTiepTheoComponent, {
          //   data: {
          //     thongTinNguoiBenhTiepTheo:result
          //   }
          // });
          // dialogRef.afterClosed().subscribe(response => {
          //   if (response == true) {            
          //     this.data=result.Id;
          //     this.tabActiveIndex=0;
          //     this.extBatDauKham.emit(result.Id);
          //   }
          // });
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
  nguoiBenhVang(){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn người bệnh này hiện tại không có mặt ở phòng khám?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.apiService.post("KhamBenhBacSiGiaDinhBacSiKham/BenhNhanVangNguoiBenhDangKham",{id:this.thongTinHanhChinhVo.YeuCauTiepNhanId}).subscribe((_result)=>{
          CommonService.openSnackBar(this.snackBar, "Cập nhật người bệnh vắng thành công", "success");
          this.closePopupLoadingData();
          this.extQuayLaiVaTaiLai.emit(true);
           //Hiển thị bệnh nhân tiếp theo
          // let dialogRef = this.dialog.open(NguoiBenhDangKhamTiepTheoComponent, {
          //   data: {
          //     thongTinNguoiBenhTiepTheo:result
          //   }
          // });
          // dialogRef.afterClosed().subscribe(response => {
          //   if (response == true) {            
          //     this.data=result.Id;
          //     this.tabActiveIndex=0;
          //     this.extBatDauKham.emit(result.Id);
          //   }
          // });
        },(err:any) => {
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error");
          }
          else{
            const mess = this.errorService.getValidationErrors(err);
            if (mess != null) {
              CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
            }
          }
          this.closePopupLoadingData();
        });
      }
    });
  }
  luu(){
    this.showPopupLoadingData("Đang lưu dữ liệu...");
    this.nhanLuu=true;
  }
  extLuuXong(){
    this.nhanLuu=false;
    this.nhanNhapLai=false; 
    if(this.nhanHoanThanhKham)
    {      
      CommonService.openSnackBar(this.snackBar, "Hoàn thành khám người bệnh thành công", "success");
        this.nhanHoanThanhKham=false;
        this.closePopupLoadingData();
        this.quayLai();
      // this.apiService.post("KhamBenhBacSiGiaDinhBacSiKham/HoanThanhKhamNguoiBenhDangKham",{id:this.data}).subscribe((result:any)=>{
      //   CommonService.openSnackBar(this.snackBar, "Hoàn thành khám người bệnh thành công", "success");
      //   this.nhanHoanThanhKham=false;
      //   this.closePopupLoadingData();
      //   this.quayLai();
        
      //   //Hiển thị bệnh nhân tiếp theo
      //   let dialogRef = this.dialog.open(NguoiBenhDangKhamTiepTheoComponent, {
      //     data: {
      //       thongTinNguoiBenhTiepTheo:result
      //     }
      //   });
      //   dialogRef.afterClosed().subscribe(response => {
      //     if (response == true) {            
      //       this.data=result.Id;
      //       this.tabActiveIndex=0;
      //       this.extBatDauKham.emit(result.Id);
      //     }
      //   });
      // },(err:any) => {
      //   this.validationErrors = err.ValidationErrors;
      //   if (err.Message != "Validation Failed") {
      //     CommonService.openSnackBar(this.snackBar, err.Message, "error");
      //   }
      //   else{
      //     const mess = this.errorService.getValidationErrors(err);
      //     if (mess != null) {
      //       CommonService.openSnackBar(this.snackBar, mess, "error",null,7000)  ;
      //     }
      //   }
      //   this.closePopupLoadingData();
      // });
    }
    else{           
      this.closePopupLoadingData();
    }
  }
  luuVaHoanThanh(){
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn đã hoàn thành khám cho người bệnh này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.nhanHoanThanhKham=true;
        this.luu();
      }
    });
  }
  nhapLai(){    
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn quay lại thông tin ban đầu cho màn hình này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.nhanNhapLai=true;    
      }
    });
  }
  popupLoadingData:any=null;
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
  taiLaiChanDoanDieuTri:boolean=false;
  extClosePopupVienPhi(){
    this.taiLaiChanDoanDieuTri=true;
  }
  taiLaiChanDoanDieuTriXong(){
    this.taiLaiChanDoanDieuTri=false;
  }
}

