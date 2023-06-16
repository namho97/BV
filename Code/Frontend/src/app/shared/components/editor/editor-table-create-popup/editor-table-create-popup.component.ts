import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editor-table-create-popup',
  templateUrl: './editor-table-create-popup.component.html',
  styleUrls: ['./editor-table-create-popup.component.scss']
})
export class EditorTableCreatePopupComponent implements OnInit {

  validationErrors:any;
  tableVo:any={};
  constructor(public dialogRef: MatDialogRef<EditorTableCreatePopupComponent>) { }

  ngOnInit() {
  }
  create(){
    this.dialogRef.close(this.tableVo);
  }
}
