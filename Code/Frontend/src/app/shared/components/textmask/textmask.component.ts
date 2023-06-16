import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textmask',
  templateUrl: './textmask.component.html',
  styleUrls: ['./textmask.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextmaskComponent implements OnInit {

  @Input() id:string;
  @Input() label:string;
  @Input() model:any;
  @Input() placeHolder:string="";
  @Input() type:string="text";
  @Input() readonly:boolean=false;
  @Input() disabled:boolean=false;
  @Input() upperCase:boolean=false;
  @Input() required:boolean=false;
  @Input() minHeight:number=20;
  @Input() validationerror:string="";
  @Input() mask:any=['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }


  emit(event:any){
    this.validationerror="";
    if(this.upperCase==true && event!=null)
    {
      event=event.toString().toUpperCase();
    }
    this.modelChange.emit(event);
  }
  blur(){
    this.blurChange.emit(true);
  }
}
