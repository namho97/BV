import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  @Input() id:string;
  @Input() label:string;
  @Input() model:any;
  @Input() placeHolder:string="";
  @Input() type:string="text";
  @Input() readonly:boolean=false;
  @Input() disabled:boolean=false;
  @Input() upperCase:boolean=false;
  @Input() required:boolean=false;
  @Input() minHeight:number=15;
  @Input() validationerror:string="";
  @Input() maxlength:number;
  @Input() showIconClear: boolean = true;
  @Output() modelChange:EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  emit(event: any) {
    this.validationerror = "";
    if (this.upperCase == true && event != null) {
      event = event.toString().toUpperCase();
    }
    this.modelChange.emit(event);
  }
  blur() {
    this.blurChange.emit(true);
  }
  reset(){
    this.model=null;
    this.modelChange.emit(this.model);
  }
}
