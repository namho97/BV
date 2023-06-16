import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges,ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { DuocPhamService } from '../duoc-pham.service';
declare let $: any;

@Component({
  selector: 'app-duoc-pham-chi-tiet',
  templateUrl: './duoc-pham-chi-tiet.component.html',
  styleUrls: ['./duoc-pham-chi-tiet.component.scss']
})
export class DuocPhamChiTietComponent implements OnInit {

  id:number = null;
  duocPhamVo:any={};
  validationErrors:any=null;
  documentType: DocumentType = DocumentType.QuanTriNhomDuocPhamDuocPham;
  @Input() showOnPopup:boolean=false;
  @Input() isUpdate:boolean=false;
  @Input() data:any=null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog:MatDialog,
    private baseService:BaseService,
    private snackBar:MatSnackBar,
    private errorService:ErrorService,
    private duocPhamService:DuocPhamService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName=this.duocPhamService.controllerName;
  }

  ngOnInit() {
    this.formatFormContent();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.duocPhamVo={DuocPhamGias:[{Id:0}]};
      }
      else {
        this.isUpdate = true;
        this.id =changes.data.currentValue.Id;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }
  
  formatFormContent() {
    if (this.showOnPopup==true && $(".form-content") != null && $(".form-content").length > 0) {
      $(".form-content").css({ "height": "500px" });
    }
  }
  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result)=>{
        this.duocPhamVo=result;
      });
    }
  }
  quayLai(){
    this.quayLaiChange.emit(true);
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
  nhapLai(){
    if(this.isUpdate){
      this.getById(this.id);
     }
     if(!this.isUpdate){
      this.duocPhamVo = {};
     }
  }
  capNhat(){
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật dược phẩm này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.duocPhamVo).subscribe(()=>{
            this.dataChange.emit(this.duocPhamVo);
            CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ["Cập nhật"]));
            this.closePopupLoadingData();
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
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }




   
  }
  luu(){
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu dược phẩm này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.duocPhamVo).subscribe((result)=>{
            this.duocPhamVo={};
            CommonService.openSnackBar(this.snackBar,CommonService.format(SystemMessage.ActionSuccessfully, ["Lưu"]));
            this.dataChange.emit(result);
            this.closePopupLoadingData();
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
    else {
      CommonService.openSnackBar(this.snackBar, SystemMessage.UnAuthorizedMessage, "error");
    }
  }
  donViTinhChange(event:any){
    if(event != null){
      this.duocPhamVo.DonViTinhId = event.KeyId;
      this.duocPhamVo.TenDonViTinh = event.DisplayName;
    }
    else{
      this.duocPhamVo.DonViTinhId = null;
      this.duocPhamVo.TenDonViTinh = null;
    }
  }
  duongDungChange(event:any){
    if(event != null){
      this.duocPhamVo.DuongDungId = event.KeyId;
      this.duocPhamVo.TenDuongDung = event.DisplayName;
    }
    else{
      this.duocPhamVo.DuongDungId = null;
      this.duocPhamVo.TenDuongDung = null;
    }
  }
  nhaSXChange(event:any){
    if(event != null){
      this.duocPhamVo.NhaSanXuatId = event.KeyId;
      this.duocPhamVo.TenNhaSanXuat = event.DisplayName;
    }
    else{
      this.duocPhamVo.NhaSanXuatId = null;
      this.duocPhamVo.TenNhaSanXuat = null;
    }
  }
  nuocSXChange(event:any){
    if(event != null){
      this.duocPhamVo.NuocSanXuatId = event.KeyId;
      this.duocPhamVo.TenNuocSanXuat = event.DisplayName;
    }
    else{
      this.duocPhamVo.NuocSanXuatId = null;
      this.duocPhamVo.TenNuocSanXuat = null;
    }
  }
  themHoacSuaDonViTinhLuuChange(event: any) {
    this.duocPhamVo.DonViTinhId = event.Id;
    this.duocPhamVo.TenDonViTinh = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaDuongDungLuuChange(event: any) {
    this.duocPhamVo.DuongDungId = event.Id;
    this.duocPhamVo.TenDuongDung = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaNhaSanXuatLuuChange(event: any) {
    this.duocPhamVo.NhaSanXuatId = event.Id;
    this.duocPhamVo.TenNhaSanXuat = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaNuocSanXuatLuuChange(event: any) {
    this.duocPhamVo.NuocSanXuatId = event.Id;
    this.duocPhamVo.TenNuocSanXuat = event.Ten;
    this.dialog.closeAll();
  }
  themDonGia(event:any){
    this.duocPhamVo.DuocPhamGias.forEach(element => {
      element.DenNgayRequired=true;
    });
    if(event == undefined)
    {
      let gias :any ={
        Gia:0,
        TuNgay:null,
        DenNgay:null
      };
      event =[];
      event.push(gias);
    }
    else{
      let gias :any ={
        Gia:0,
        TuNgay:null,
        DenNgay:null
      };
      event.push(gias);
    }
    
  }
  xoaDonGia(event:any,item:any){
    if(event != null && item != null){
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn xóa đơn giá này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
        
          let dataSource: any = event;
          let indexRemove = dataSource.findIndex((existingItem) => existingItem ==item);
          dataSource.splice(indexRemove, 1);
          event = [];
          event = dataSource;

          if( this.duocPhamVo.DuocPhamGias.length>0)
          {
            this.duocPhamVo.DuocPhamGias[this.duocPhamVo.DuocPhamGias.length-1].DenNgayRequired=false;
          }
        }
      });
      
      
    }
  }
  hieuLucChange(event:any){
    if(event != null){
      if(event == 1){
        this.duocPhamVo.HieuLuc = true;
      }
      if(event == 2)
      {
        this.duocPhamVo.HieuLuc = false;
      }
    }
    else{
      this.duocPhamVo.HieuLuc = null;
    }
    
  }
}
