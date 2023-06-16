
import { ApiService } from 'src/app/core/services/api.service';
import { Login } from './login.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { LocalStorageHelper } from 'src/app/core/utilities/local-storage.helper';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: Login;
  showCaptcha:boolean=false;
  validationErrors: any[] = [];
  iconEye:string="visibility";
  iconTooltip:string="Hiện mật khẩu";
  typePassword:string="password";
  @ViewChild('recaptcha') recaptcha: any;
  constructor(private router: Router, private authService: AuthService,
     public dialog: MatDialog,  private apiService:ApiService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.login = new Login();
    this.login.captchaToken = undefined;
  }
  blurUsernameChange(){
    //this.checkUsername(this.login.userName);
  }
  checkUsername(userName:string){
    if(userName!=null && userName!="")
    {
      var checkModel=new Login();
      checkModel.userName=userName;
      this.apiService.post<any>("auth/CheckUsername",checkModel).subscribe((result)=>{
        if(result==false)
        {
          this.showCaptcha=true;
        }
        else
        {
          this.showCaptcha=false;
        }
      });
    }
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
  submit() {
    this.validationErrors = [];
    if (this.login.userName === null || this.login.userName === undefined || this.login.userName === "") {
      this.validationErrors.push({
        Field: "UserName",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "SỐ ĐIỆN THOẠI",
        ]),
      });
    }
    if (this.login.password === null || this.login.password === undefined || this.login.password === "") {
      this.validationErrors.push({
        Field: "Password",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "MẬT KHẨU",
        ]),
      });
    }
    if (this.showCaptcha && (this.login.captchaToken == "" || this.login.captchaToken == null || this.login.captchaToken == undefined)) {
      this.validationErrors.push({
        Field: "CaptchaToken",
        Message: CommonService.format(SystemMessage.ObjectRequirement, [
          "CAPTCHA",
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
            Title: "Đang kiểm tra..."
          }
        }
      );
      this.authService.login(this.login).subscribe((result) => {
        dialogLoading.close();
        if (result.DangNhapLanDau == true) {
          this.router.navigate(['/doi-mat-khau']);
        }
        else {
          var navigationitems = this.authService.getAccessRoute();
          if (navigationitems != null) {
            var firstItem = navigationitems.filter(o=>o.Hide!=true)[0];
            var childs = this.authService.getChilds(firstItem);
            if (firstItem.route != null && firstItem.route != "" && firstItem.canViewType != undefined) {
              this.router.navigate([firstItem.route]);
            }
            else {
              if (childs.length > 0) {
                let route = null;
                childs.forEach(item => {
                  if (route == null && item.route != null && item.route != "" && item.canViewType != undefined) {
                    route = item.route;
                  }
                });
                this.router.navigate([route]);
              }
            }
          }
          LocalStorageHelper.setItem("AccountClinic", this.login);
        }
      },
        (err: ApiError) => {
          this.validationErrors = err.ValidationErrors;
          this.recaptcha.reset();
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message, "error")
          }
          dialogLoading.close();
        });
    }
  }
  onKey(event: any) {
    if (event.key == 'Enter') {
      this.submit();
    }
  }

}
