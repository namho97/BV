import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
import { NguoiBenhService } from '../nguoi-benh.service';


@Component({
  selector: 'app-nguoi-benh-chi-tiet',
  templateUrl: './nguoi-benh-chi-tiet.component.html',
  styleUrls: ['./nguoi-benh-chi-tiet.component.scss']
})
export class NguoiBenhChiTietComponent implements OnInit {

  id :number =null;
  nguoiBenhVo: any = {};
  validationErrors: any = null;
  documentType: DocumentType = DocumentType.QuanTriNhomNguoiBenhNguoiBenh;
  @Input() showOnPopup: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() data: any = null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private baseService: BaseService, private snackBar: MatSnackBar, private errorService: ErrorService,
    private nguoiBenhService: NguoiBenhService, private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName = this.nguoiBenhService.controllerName;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.nguoiBenhVo = {};
      }
      else {
        this.isUpdate = true;
        this.id = changes.data.currentValue.Id;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result) => {
        this.nguoiBenhVo = result;
      });
    }
  }
  quayLai() {
    this.quayLaiChange.emit(true);
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
  nhapLai() { 
    if(this.isUpdate){
      this.getById(this.id);
     }
     if(!this.isUpdate){
      this.nguoiBenhVo = {};
     }
  }
  capNhat() {

    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật nguoiBenh này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.nguoiBenhVo).subscribe(() => {
            this.dataChange.emit(this.nguoiBenhVo);
            CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Cập nhật"]));
            this.closePopupLoadingData();
          }, (err: any) => {

            this.validationErrors = err.ValidationErrors;
            if (err.Message != "Validation Failed") {
              CommonService.openSnackBar(this.snackBar, err.Message, "error");
            }
            else {
              const mess = this.errorService.getValidationErrors(err);
              if (mess != null) {
                CommonService.openSnackBar(this.snackBar, mess, "error", null, 7000);
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
  luu() {
    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu người bệnh này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.nguoiBenhVo).subscribe((result) => {
            this.nguoiBenhVo = {};
            this.dataChange.emit(result);
            CommonService.openSnackBar(this.snackBar, CommonService.format(SystemMessage.ActionSuccessfully, ["Lưu"]));
            this.closePopupLoadingData();
          }, (err: any) => {

            this.validationErrors = err.ValidationErrors;
            if (err.Message != "Validation Failed") {
              CommonService.openSnackBar(this.snackBar, err.Message, "error");
            }
            else {
              const mess = this.errorService.getValidationErrors(err);
              if (mess != null) {
                CommonService.openSnackBar(this.snackBar, mess, "error", null, 7000);
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
  ngayThangNamSinhChange(event: any) {

    if (event != null) {
      let tn =new Date(event);
      var fd = CommonService.formatDateTime(tn, "mm/dd/yyyy");
      if(fd != null){
   
         let result = fd.split('/')
        this.nguoiBenhVo.NamSinh = (new Date(event)).getFullYear();

        this.nguoiBenhVo.NgaySinh =result[1] ;
        this.nguoiBenhVo.ThangSinh = result[0];
      }
    
    }
    else {
      this.nguoiBenhVo.NamSinh = null;
      this.nguoiBenhVo.NgaySinh = null;
      this.nguoiBenhVo.ThangSinh= null;
    }
  }
  themHoacSuaTinhThanhLuuChange(event: any) {
    this.nguoiBenhVo.TinhThanhId = event.Id;
    this.nguoiBenhVo.TinhThanhTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaQuanHuyenLuuChange(event: any) {
    this.nguoiBenhVo.QuanHuyenId = event.Id;
    this.nguoiBenhVo.QuanHuyenTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaPhuongXaLuuChange(event: any) {
    this.nguoiBenhVo.PhuongXaId = event.Id;
    this.nguoiBenhVo.PhuongXaTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaThonXomLuuChange(event: any) {
    this.nguoiBenhVo.KhomApId = event.Id;
    this.nguoiBenhVo.KhomApTen = event.Ten;
    this.dialog.closeAll();
  }
  changeNgheNghiep(event: any){
    if(event != null){
      this.nguoiBenhVo.NgheNghiep = event.DisplayName;
    }
    else{
      this.nguoiBenhVo.NgheNghiep = null;
    }
    
  }
}
