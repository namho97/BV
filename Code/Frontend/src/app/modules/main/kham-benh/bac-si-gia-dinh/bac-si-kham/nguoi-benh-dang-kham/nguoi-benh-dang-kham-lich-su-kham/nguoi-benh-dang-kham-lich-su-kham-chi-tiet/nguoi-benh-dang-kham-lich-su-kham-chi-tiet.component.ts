import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nguoi-benh-dang-kham-lich-su-kham-chi-tiet',
  templateUrl: './nguoi-benh-dang-kham-lich-su-kham-chi-tiet.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-lich-su-kham-chi-tiet.component.scss']
})
export class NguoiBenhDangKhamLichSuKhamChiTietComponent implements OnInit {

  dataChon:any;
  constructor(public dialogRef: MatDialogRef<NguoiBenhDangKhamLichSuKhamChiTietComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
      this.dataChon=data.dataItem;
    }

  ngOnInit() {
  }
  close(){
    this.dialogRef.close();
  }
}
