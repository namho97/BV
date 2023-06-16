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
import { KhoService } from '../kho.service';


@Component({
  selector: 'app-kho-chi-tiet',
  templateUrl: './kho-chi-tiet.component.html',
  styleUrls: ['./kho-chi-tiet.component.scss']
})
export class KhoChiTietComponent implements OnInit {

  id :number = null;
  khoVo: any = {};
  validationErrors: any = null;
  documentType: DocumentType = DocumentType.QuanTriNhomKhoKho;
  @Input() showOnPopup: boolean = false;
  @Input() isUpdate: boolean = false;
  @Input() data: any = null;
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private baseService: BaseService, private snackBar: MatSnackBar, private errorService: ErrorService,
    private khoService: KhoService, private authService: AuthService,
    private cdRef: ChangeDetectorRef) {
    this.baseService.controllerName = this.khoService.controllerName;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.khoVo = {};
      }
      else {
        this.isUpdate = true;
        this.id =changes.data.currentValue.Id;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      this.baseService.getById(id).subscribe((result) => {
        this.khoVo = result;
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
      this.khoVo = {};
     }
   }
  capNhat() {

    this.validationErrors = [];
    this.cdRef.detectChanges();

    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật kho này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.khoVo).subscribe(() => {
            this.dataChange.emit(this.khoVo);
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
          message: "Bạn chắc chắn muốn lưu kho này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.khoVo).subscribe((result) => {
            this.khoVo = {};
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

  hieuLucChange(event:any){
    if(event != null){
      if(event == 1){
        this.khoVo.HieuLuc = true;
      }
      if(event == 2)
      {
        this.khoVo.HieuLuc = false;
      }
    }
    else{
      this.khoVo.HieuLuc = null;
    }
    
  }

}
