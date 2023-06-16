import { ErrorService } from 'src/app/core/error/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-ho-so-nhan-vien-doi-mat-khau',
  templateUrl: './ho-so-nhan-vien-doi-mat-khau.component.html',
  styleUrls: ['./ho-so-nhan-vien-doi-mat-khau.component.scss']
})
export class HoSoNhanVienDoiMatKhauComponent implements OnInit {

  hoSoNhanVienVo:any={};
  iconEye:string="visibility";
  iconTooltip:string="Hiện mật khẩu";
  typePassword:string="password";
  validationErrors:any;
  constructor(public dialogRef: MatDialogRef<HoSoNhanVienDoiMatKhauComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private dialog: MatDialog,private apiService:ApiService,private snackBar:MatSnackBar,private errorService:ErrorService) {
    this.hoSoNhanVienVo=data.dataItem;
   }

  ngOnInit() {
  }
  close(result = null) {
    this.dialogRef.close(result);
  }
  passwordEyeClick(){
    if(this.typePassword=="password")
    {
      this.typePassword="text";
      this.iconEye="visibility_off";
      this.iconTooltip="Ẩn mật khẩu";
    }
    else
    {
      this.typePassword="password";
      this.iconEye="visibility";
      this.iconTooltip="Hiện mật khẩu";
    }

  }
  popupLoadingData:any;
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
  capNhat(){
    this.validationErrors = [];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: "Bạn chắc chắn muốn cập nhật mật khẩu cho nhân viên này?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.showPopupLoadingData();
        this.apiService.post("QuanTriNhomNhanVienHoSoNhanVien/DoiMatKhau",this.hoSoNhanVienVo).subscribe((result)=>{
          if(result)
          {
            CommonService.openSnackBar(this.snackBar, "Cập nhật mật khẩu thành công", "success");
          }
          else{
            CommonService.openSnackBar(this.snackBar, "Cập nhật mật khẩu không thành công", "error");
          }
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
}
