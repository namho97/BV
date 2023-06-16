import { ErrorService } from './../../../../../../../../core/error/error.service';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './../../../../../../../../core/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';

@Component({
  selector: 'app-luu-toa-mau-moi',
  templateUrl: './luu-toa-mau-moi.component.html',
  styleUrls: ['./luu-toa-mau-moi.component.scss']
})
export class LuuToaMauMoiComponent implements OnInit {

  toaMauVo:any={};
  validationErrors:any=null;
  constructor(public dialogRef: MatDialogRef<LuuToaMauMoiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar,private apiService: ApiService,private dialog:MatDialog,
    private errorService:ErrorService) { 
      this.toaMauVo.ToaThuocMauChiTiets=data.ToaThuocs;
      this.toaMauVo.IcdId=data.IcdId;
      this.toaMauVo.BacSiId=data.BacSiId;
      this.toaMauVo.GhiChu=data.GhiChu;
    }

  ngOnInit() {
  }
  
  bacSiChange(event:any){
    if(event != null){
      this.toaMauVo.BacSiId = event.KeyId;
      this.toaMauVo.BacSiDisplay = event.DisplayName;
    }
    else{
      this.toaMauVo.BacSiId = null;
      this.toaMauVo.BacSiDisplay = null;
    }
  }
  themHoacSuaBacSiLuuChange(event: any) {
    this.toaMauVo.BacSiId = event.Id;
    this.toaMauVo.BacSiDisplay = event.Ten;
    this.dialog.closeAll();
  }

  popupLoadingData:any=null;
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
  luu(){
    this.validationErrors = [];
      if (this.toaMauVo.Ten === null || this.toaMauVo.Ten === undefined || this.toaMauVo.Ten == "") {
        this.validationErrors.push({
          Field: "Ten",
          Message: CommonService.format(SystemMessage.ObjectRequirement, [
            "TÊN TOA MẪU",
          ]),
        });
      }
      if (this.toaMauVo.ToaThuocMauChiTiets === null || this.toaMauVo.ToaThuocMauChiTiets === undefined || this.toaMauVo.ToaThuocMauChiTiets.length==0) {
        this.validationErrors.push({
          Field: "ToaThuocMauChiTiets",
          Message: CommonService.format(SystemMessage.ObjectRequirement, [
            "DANH SÁCH THUỐC",
          ]),
        });
      }
      // if (this.icdChinh === null || this.icdChinh === undefined || this.icdChinh == 0) {
      //   this.validationErrors.push({
      //     Field: "IcdChinh",
      //     Message: CommonService.format(SystemMessage.ObjectRequirement, [
      //       "ICD CHÍNH",
      //     ]),
      //   });
      // }
      if (this.validationErrors.length > 0) {
        CommonService.openSnackBar(this.snackBar, "Có lỗi xảy ra khi xác nhận. Bạn hãy kiểm tra lại thông tin.", "error");
        return;
      }
      else {
        this.showPopupLoadingData();
        this.toaMauVo.HieuLuc=true;
        this.toaMauVo.ToaThuocMauChiTiets.forEach(element => {
          element.Id=0;
        });
        this.apiService.post("QuanTriNhomPhongKhamToaThuocMau",this.toaMauVo).subscribe(()=>{
          
          CommonService.openSnackBar(this.snackBar, "Tạo toa mẫu thành công", "success");
          this.closePopupLoadingData();
          this.dialogRef.close(false);
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
  }
  huy(){
    this.dialogRef.close(false);
  }
}
