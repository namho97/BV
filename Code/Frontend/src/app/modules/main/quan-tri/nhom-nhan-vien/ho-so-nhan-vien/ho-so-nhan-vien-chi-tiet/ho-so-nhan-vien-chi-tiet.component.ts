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
  selector: 'app-ho-so-nhan-vien-chi-tiet',
  templateUrl: './ho-so-nhan-vien-chi-tiet.component.html',
  styleUrls: ['./ho-so-nhan-vien-chi-tiet.component.scss']
})
export class HoSoNhanVienChiTietComponent implements OnInit {

  iconEye: string = "visibility";
  iconTooltip: string = "Hiện mật khẩu";
  typePassword: string = "password";
  hoSoNhanVienVo: any = {};
  isUpdate: boolean = false;
  validationErrors: any[] = [];
  documentType: DocumentType = DocumentType.QuanTriNhomNhanVienHoSoNhanVien;
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
        this.hoSoNhanVienVo = { GioiTinh: 1 };

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
          this.hoSoNhanVienVo = data;
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

  ngayThangNamSinhChange(event: any) {
    if (event != null) {
      this.hoSoNhanVienVo.NamSinh = (new Date(event)).getFullYear();
    }
    else {
      this.hoSoNhanVienVo.NamSinh = null;
    }
  }

  themHoacSuaTinhThanhLuuChange(event: any) {
    this.hoSoNhanVienVo.TinhThanhId = event.Id;
    this.hoSoNhanVienVo.TinhThanhTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaQuanHuyenLuuChange(event: any) {
    this.hoSoNhanVienVo.QuanHuyenId = event.Id;
    this.hoSoNhanVienVo.QuanHuyenTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaPhuongXaLuuChange(event: any) {
    this.hoSoNhanVienVo.PhuongXaId = event.Id;
    this.hoSoNhanVienVo.PhuongXaTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaThonXomLuuChange(event: any) {
    this.hoSoNhanVienVo.KhomApId = event.Id;
    this.hoSoNhanVienVo.KhomApTen = event.Ten;
    this.dialog.closeAll();
  }

  passwordEyeClick() {
    if (this.typePassword == "password") {
      this.typePassword = "text";
      this.iconEye = "visibility_off";
      this.iconTooltip = "Ẩn mật khẩu";
    }
    else {
      this.typePassword = "password";
      this.iconEye = "visibility";
      this.iconTooltip = "Hiện mật khẩu";
    }

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
    if (this.hoSoNhanVienVo.Id != null && this.hoSoNhanVienVo.Id != 0) {
      this.getById(this.hoSoNhanVienVo.Id);
    }
    else {
      this.hoSoNhanVienVo = { GioiTinh: 1 };
    }
  }

  luu() {
    if (this.authService.hasPermission(this.documentType, SecurityOperation.Add)) {
      this.validationErrors = [];
      let dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: "Bạn chắc chắn muốn lưu nhân viên này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.create(this.hoSoNhanVienVo).subscribe((result) => {
            if (result) {
              CommonService.openSnackBar(this.snackBar, "Lưu thành công", "success");
              this.hoSoNhanVienVo = { GioiTinh: 1 };
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
          message: "Bạn chắc chắn muốn cập nhật nhân viên này?"
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true) {
          this.showPopupLoadingData();
          this.baseService.update(this.hoSoNhanVienVo).subscribe((result) => {
            if (result) {
              CommonService.openSnackBar(this.snackBar, "Cập nhật nhân viên thành công", "success");
              this.dataChange.emit(true);
            }
            else {
              CommonService.openSnackBar(this.snackBar, "Cập nhật nhân viên không thành công", "error");
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
