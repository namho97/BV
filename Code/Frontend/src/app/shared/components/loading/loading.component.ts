import { Component, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  Title: string = "Đang tải dữ liệu...";

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null && data.Title != null) {
      this.Title = data.Title;
    }

  }
}
