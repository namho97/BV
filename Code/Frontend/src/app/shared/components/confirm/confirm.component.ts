import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/core/utilities/common.helper';
import { SystemMessage } from '../../configdata/system-message';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  title: string = "XÁC NHẬN";
  colorClassTitle: string = null;
  iconClassTitle: string = null;
  message: string;
  yesName: string = "CÓ";
  yesColor: string = "primary";
  noName: string = "KHÔNG";
  reason: string = null;
  reasonLabel: string = null;
  inputReason: boolean = false;
  showButtonYes: boolean = true;
  showButtonNo: boolean = true;
  validationErrors: any[] = [];
  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    this.title = data.title != null ? data.title : "XÁC NHẬN";
    this.colorClassTitle = data.colorClassTitle != null ? data.colorClassTitle : null;
    this.iconClassTitle = data.iconClassTitle != null ? data.iconClassTitle : null;
    this.message = data.message;
    this.inputReason = data.inputReason;
    this.reasonLabel = data.reasonLabel;
    this.yesName = data.yesName != null ? data.yesName : "CÓ";
    this.yesColor = data.yesColor != null ? data.yesColor : "primary";
    this.noName = data.noName != null ? data.noName : "KHÔNG";
    this.showButtonNo = data.showButtonNo != null ? data.showButtonNo : true;
    this.showButtonYes = data.showButtonYes != null ? data.showButtonYes : true;
  }

  ngOnInit() {
  }
  no() {
    this.dialogRef.close(false);
  }
  yes() {
    if (this.inputReason == true) {
      this.validationErrors = [];
      if (this.reason === null || this.reason === undefined || this.reason == "") {
        this.validationErrors.push({
          Field: "Reason",
          Message: CommonService.format(SystemMessage.ObjectRequirement, [
            this.reasonLabel,
          ]),
        });
      }
      if (this.validationErrors.length > 0) {
        CommonService.openSnackBar(this.snackBar, "Có lỗi xảy ra khi xác nhận. Bạn hãy kiểm tra lại thông tin.", "error");
        return;
      }
      else {
        this.dialogRef.close({ Chon: true, Reason: this.reason });
      }
    }
    else {
      this.dialogRef.close(true);
    }
  }
}
