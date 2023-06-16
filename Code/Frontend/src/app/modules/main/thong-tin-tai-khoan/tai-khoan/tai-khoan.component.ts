import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { ApiError } from 'src/app/shared/models/api-error.model';
@Component({
  selector: 'app-tai-khoan',
  templateUrl: './tai-khoan.component.html',
  styleUrls: ['./tai-khoan.component.scss']
})
export class TaiKhoanComponent implements OnInit {

  taiKhoan:any={};
  danhSachNamSinhs:any=[];
  danhSachNgaySinhs:any=[];
  danhSachThangSinhs:any=[];
  validationErrors:any[]=[];
  constructor(public dialog: MatDialog, private apiService:ApiService, private snackBar:MatSnackBar, private dialogRef:MatDialogRef<TaiKhoanComponent>) { }

  ngOnInit() {
    this.getThongTin();
  }
  getThongTin(){
    this.apiService.get("QuanTriNhomNhanVienTaiKhoanNguoiDung/GetThongTinTaiKhoan").subscribe((data:any)=>{
      this.taiKhoan = data;
    })
  }
  
  ngayThangNamSinhChange(event: any) {
    if (event != null) {
      this.taiKhoan.NamSinh = (new Date(event)).getFullYear();
    }
    else {
      this.taiKhoan.NamSinh = null;
    }
  }

  themHoacSuaTinhThanhLuuChange(event: any) {
    this.taiKhoan.TinhThanhId = event.Id;
    this.taiKhoan.TinhThanhTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaQuanHuyenLuuChange(event: any) {
    this.taiKhoan.QuanHuyenId = event.Id;
    this.taiKhoan.QuanHuyenTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaPhuongXaLuuChange(event: any) {
    this.taiKhoan.PhuongXaId = event.Id;
    this.taiKhoan.PhuongXaTen = event.Ten;
    this.dialog.closeAll();
  }
  themHoacSuaThonXomLuuChange(event: any) {
    this.taiKhoan.KhomApId = event.Id;
    this.taiKhoan.KhomApTen = event.Ten;
    this.dialog.closeAll();
  }
  capNhat(){
    this.validationErrors=[];
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message:"Bạn chắc chắn muốn cập nhật thông tin tài khoản?"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result==true)
      {
        let dialogLoading=this.dialog.open(LoadingComponent);
        this.apiService.put("QuanTriNhomNhanVienTaiKhoanNguoiDung/CapNhatThongTin", this.taiKhoan).subscribe(()=>{
          this.getThongTin();
          CommonService.openSnackBar(this.snackBar,"Cập nhật thành công");  
          dialogLoading.close();
          this.dialogRef.close();
        },
        (err:ApiError)=>{
          this.validationErrors = err.ValidationErrors;
          if (err.Message != "Validation Failed") {
            CommonService.openSnackBar(this.snackBar, "Có lỗi xảy ra khi cập nhật. Bạn hãy kiểm tra lại thông tin.","error")
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
