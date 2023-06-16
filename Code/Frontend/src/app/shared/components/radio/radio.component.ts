import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {
  @Input() id:string;
  @Input() label:string;
  @Input() model:any;
  @Input() items:string;
  @Input() placeHolder:string="";
  @Input() type:string="text";
  @Input() readonly:boolean=false;
  @Input() disabled:boolean=false;
  @Input() required:boolean=false;
  @Input() style:string="float: right;";
  @Input() validationerror:string="";
  @Input() customClass:string="";
  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  emit(event:any){
    this.validationerror="";
    this.modelChange.emit(event);
  }
}
