import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessagingService } from 'src/app/core/services/messaging.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { LocalStorageHelper } from 'src/app/core/utilities/local-storage.helper';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { AccessUser } from 'src/app/shared/models/access-user.model';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { Login } from '../login/login.model';
import { DoiMatKhau } from './doi-mat-khau.model';

@Component({
  selector: 'app-doi-mat-khau',
  templateUrl: './doi-mat-khau.component.html',
  styleUrls: ['./doi-mat-khau.component.scss']
})
export class DoiMatKhauComponent implements OnInit {

  login: Login;
  accessUser: AccessUser;
  doiMatKhau: DoiMatKhau;
  validationErrors: any[] = [];
  constructor(private router: Router, private authService: AuthService,  private dialog: MatDialog, private snackBar: MatSnackBar
    , private messagingService: MessagingService) {
    this.accessUser = authService.getAccessUser();
    if (this.accessUser == null) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.doiMatKhau = new DoiMatKhau();
    this.doiMatKhau.username = this.accessUser.UserName;
    this.login = new Login();
    this.login.captchaToken = undefined;
  }
  submit() {
    this.validationErrors = [];
    if (this.doiMatKhau.oldpassword === null || this.doiMatKhau.oldpassword === undefined || this.doiMatKhau.oldpassword === "") {
      this.validationErrors.push({
        Field: "OldPassword",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "MẬT KHẨU CŨ",
        ]),
      });
    }
    if (this.doiMatKhau.password === null || this.doiMatKhau.password === undefined || this.doiMatKhau.password === "") {
      this.validationErrors.push({
        Field: "Password",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "MẬT KHẨU MỚI",
        ]),
      });
    }
    if (this.doiMatKhau.repassword === null || this.doiMatKhau.repassword === undefined || this.doiMatKhau.repassword === "") {
      this.validationErrors.push({
        Field: "RePassword",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "NHẬP LẠI MẬT KHẨU MỚI",
        ]),
      });
    }
    if (this.doiMatKhau.password != null && this.doiMatKhau.password != undefined && this.doiMatKhau.password != "" &&
      this.doiMatKhau.repassword != null && this.doiMatKhau.repassword != undefined && this.doiMatKhau.repassword != "" &&
      this.doiMatKhau.password != this.doiMatKhau.repassword) {
      this.validationErrors.push({
        Field: "RePassword",
        Message: CommonService.format(SystemMessage.ObjectNotMacth, [
          "NHẬP LẠI MẬT KHẨU MỚI",
        ]),
      });
    }
    if (this.validationErrors.length > 0) {
      return;
    }
    else {
      let dialogLoading = this.dialog.open(LoadingComponent,
        {
          data: {
            Title: "Đang đổi mật khẩu..."
          }
        }
      );
      this.authService.setPassword(this.doiMatKhau).subscribe(() => {
        dialogLoading.close();
        this.login.userName = this.doiMatKhau.username;
        this.login.password = this.doiMatKhau.password;
        this.login.rememberMe = true;
        CommonService.openSnackBar(this.snackBar, "Đổi mật khẩu thành công.");
        dialogLoading = this.dialog.open(LoadingComponent,
          {
            data: {
              Title: "Đang đăng nhập..."
            }
          }
        );
        this.login.fcmToken = this.messagingService.getFcmToken();
        this.authService.login(this.login).subscribe(() => {
          dialogLoading.close();
          this.router.navigate(['/trang-chu']);
          LocalStorageHelper.setItem("AccountClinic", this.login);
        },
          (err: ApiError) => {
            this.validationErrors = err.ValidationErrors;
            if (err.Message != "Validation Failed") {
              CommonService.openSnackBar(this.snackBar, err.Message, "error")
            }
            dialogLoading.close();
          });
      },
        (err: ApiError) => {
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error")
          }
          dialogLoading.close();
        })
      // this.router.navigate(['/trang-chu']);
    }
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
      this.submit();
    }
  }
}
