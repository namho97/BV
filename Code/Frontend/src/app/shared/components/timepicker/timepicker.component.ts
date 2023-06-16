import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/core/utilities/common.helper';
@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() model: any;//Format: hh:mm tt
  @Input() placeHolder: string = "";
  @Input() readonly: boolean = true;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() modelIsNumber:boolean=false;
  @Input() required:boolean=false;
  @Input() validationerror: string = "";
  @Input() showIconClear: boolean = true;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    // You can also use model.previousValue and
    // model.firstChange for comparing old and new values
    if(changes.model!=undefined &&changes.model.currentValue!=null)
    {
      if(this.modelIsNumber==true && typeof changes.model.currentValue=="number")
      {
        this.model=CommonService.sec2time(changes.model.currentValue,true,false);
      }
      else{
        this.model=changes.model.currentValue;
      }
    }
  }
  emit(event: any) {
    this.validationerror = "";
    if(event!=null && event!="")
    {
      if(this.modelIsNumber==true)
      {
        var now=new Date();
        var d=new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" "+event);
        this.modelChange.emit(CommonService.time2sec(d));
      }
      else{
        this.modelChange.emit(event);
      }
    }
    else{
      this.modelChange.emit(event);
    }
  }
  blur() {
    this.blurChange.emit(true);
  }
  reset(){
    this.model=null;
    this.emit(this.model);
    this.clearEvent.emit(true);
  }

}
