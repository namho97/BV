import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nguoi-benh-dang-kham-tiep-theo',
  templateUrl: './nguoi-benh-dang-kham-tiep-theo.component.html',
  styleUrls: ['./nguoi-benh-dang-kham-tiep-theo.component.scss']
})
export class NguoiBenhDangKhamTiepTheoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NguoiBenhDangKhamTiepTheoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  close(result:any) {
    this.dialogRef.close(result);
  }
}
