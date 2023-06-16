import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ApiError } from 'src/app/shared/models/api-error.model';
import { DoiMatKhau } from '../tai-khoan/tai-khoan.model';

@Component({
  selector: 'app-doi-mat-khau',
  templateUrl: './doi-mat-khau.component.html',
  styleUrls: ['./doi-mat-khau.component.scss']
})
export class DoiMatKhauComponent implements OnInit {

  doiMatKhau:DoiMatKhau;
  validationErrors:any[]=[];
  constructor(private apiService:ApiService, private dialog:MatDialog, private snackBar:MatSnackBar, private dialogRef:MatDialogRef<DoiMatKhauComponent>) { }

  ngOnInit() {
    this.doiMatKhau=new DoiMatKhau();
  }
  capNhat(){
    this.validationErrors=[];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message:"Bạn chắc chắn muốn đổi mật khẩu?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==true)
      {
        let dialogLoading=this.dialog.open(LoadingComponent);
        this.apiService.put("QuanTriNhomNhanVienTaiKhoanNguoiDung/DoiMatKhau", this.doiMatKhau).subscribe(()=>{
          CommonService.openSnackBar(this.snackBar,"Đổi mật khẩu thành công");  
          dialogLoading.close();
          this.dialogRef.close();
        },
        (err:ApiError)=>{
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, err.Message,"error")
          }
          dialogLoading.close();

        })
      }
    });
  }
  huycapNhat(){
    this.dialogRef.close();
  }

}
