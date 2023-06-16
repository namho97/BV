import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorService } from 'src/app/core/error/error.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseService } from 'src/app/core/services/base.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { SecurityOperation } from 'src/app/shared/enum/security-operation.enum\'';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { DocumentType } from 'src/app/shared/enum/document-type.enum';

@Component({
  selector: 'app-noi-dung-mau-chi-tiet',
  templateUrl: './noi-dung-mau-chi-tiet.component.html',
  styleUrls: ['./noi-dung-mau-chi-tiet.component.scss']
})
export class NoiDungMauChiTietComponent implements OnInit {
  noiDungMauVo: any = {};
  isUpdate: boolean = false;
  validationErrors: any[] = [];
  documentType: DocumentType = DocumentType.QuanTriNhomCauHinhNoiDungMau;
  @Input() data: any;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() quayLaiChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dialog: MatDialog, private baseService: BaseService, private snackBar: MatSnackBar, private errorService: ErrorService, private authService: AuthService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes && changes.data && changes.data.currentValue) {
      if (changes.data.currentValue.Id == undefined || changes.data.currentValue.Id == 0) {
        this.isUpdate = false;
        this.noiDungMauVo = { GioiTinh: 1 };

      }
      else {
        this.isUpdate = true;
        this.getById(changes.data.currentValue.Id);
      }

    }
  }

  getById(id) {
    if (id != null && id > 0) {
      let dialogLoading = this.dialog.open(LoadingComponent);
      this.baseService.getById(id).subscribe((data: any) => {
        if (data) {
          this.noiDungMauVo = data;
        }
        dialogLoading.close();
      }, (err: ApiError) => {
        CommonService.openSnackBar(this.snackBar, err.Message, "error")
        dialogLoading.close();
      });
    }
  }

  quayLai() {
    this.quayLaiChange.emit(true);
  }

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
  nhapLai() {
    if (this.noiDungMauVo.Id != null && this.noiDungMauVo.Id != 0) {
      this.getById(this.noiDungMauVo.Id);
    }
    else {
      this.noiDungMauVo = { GioiTinh: 1 };
    }
  }

  luu() {
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      this.validationErrors = [];
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu nội dung này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.noiDungMauVo).subscribe((result) => {
            if (result) {
              CommonService.openSnackBar(this.snackBar, "Lưu thành công", "success");
              this.noiDungMauVo = { GioiTinh: 1 };
              this.dataChange.emit(true);
            }
            else {
              CommonService.openSnackBar(this.snackBar, "Lưu không thành công", "error");
            }
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
  capNhat() {
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Update)) {
      this.validationErrors = [];
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn cập nhật nội dung này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.noiDungMauVo).subscribe((result) => {
            if (result) {
              CommonService.openSnackBar(this.snackBar, "Cập nhật nội dung thành công", "success");
              this.dataChange.emit(true);
            }
            else {
              CommonService.openSnackBar(this.snackBar, "Cập nhật nội dung không thành công", "error");
            }
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

}
