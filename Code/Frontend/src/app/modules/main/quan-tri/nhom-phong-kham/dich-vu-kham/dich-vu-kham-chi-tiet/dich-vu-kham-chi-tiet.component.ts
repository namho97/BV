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
import { DichVuKhamService } from '../dich-vu-kham.service';

@Component({
  selector: 'app-dich-vu-kham-chi-tiet',
  templateUrl: './dich-vu-kham-chi-tiet.component.html',
  styleUrls: ['./dich-vu-kham-chi-tiet.component.scss']
})
export class DichVuKhamChiTietComponent implements OnInit {

  id:number = null;
  dichVuKhamVo: any = {};
  validationErrors: any = null;
  documentType: DocumentType = DocumentType.QuanTriNhomPhongKhamDichVuKham;
  @Input() showOnPopup: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() data: any = null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private baseService: BaseService, private snackBar: MatSnackBar, private errorService: ErrorService,
    private dichVuKhamService: DichVuKhamService, private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName = this.dichVuKhamService.controllerName;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        // this.dichVuKhamVo = {};
        this.dichVuKhamVo={DichVuKhamBenhGias:[{Id:0}]};
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
        this.dichVuKhamVo = result;
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
      this.dichVuKhamVo = {};
     }
  }
  capNhat() {

    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật dịch vụ khám này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.dichVuKhamVo).subscribe(() => {
            this.dataChange.emit(this.dichVuKhamVo);
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
          message: "Bạn chắc chắn muốn lưu dịch vụ khám này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.dichVuKhamVo).subscribe((result) => {
            this.dichVuKhamVo = {};
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

  themDonGia(event:any){
    this.dichVuKhamVo.DichVuKhamBenhGias.forEach(element => {
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

          if( this.dichVuKhamVo.DichVuKhamBenhGias.length>0)
          {
            this.dichVuKhamVo.DichVuKhamBenhGias[this.dichVuKhamVo.DichVuKhamBenhGias.length-1].DenNgayRequired=false;
          }
        }
      });
      
      
    }
  }
  hieuLucChange(event:any){
    if(event != null){
      if(event == 1){
        this.dichVuKhamVo.HieuLuc = true;
      }
      if(event == 2)
      {
        this.dichVuKhamVo.HieuLuc = false;
      }
    }
    else{
      this.dichVuKhamVo.HieuLuc = null;
    }
    
  }
  macDinhChange(event:any){
    if(event != null){
      if(event == 1){
        this.dichVuKhamVo.MacDinh = true;
      }
      if(event == 2)
      {
        this.dichVuKhamVo.MacDinh = false;
      }
    }
    else{
      this.dichVuKhamVo.MacDinh = null;
    }
    
  }

}
