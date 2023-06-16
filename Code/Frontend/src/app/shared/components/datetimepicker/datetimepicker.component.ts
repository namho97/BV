import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonService } from 'src/app/core/utilities/common.helper';
declare var jQuery: any;

@Component({
  selector: 'app-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  modelTime:string=null;
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() disabledDateOnly: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() required:boolean=false;
  @Input() validationerror: string = "";
  @Input() showIconClear: boolean = true;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    // You can also use model.previousValue and
    // model.firstChange for comparing old and new values
    if(changes.model!=undefined &&changes.model.currentValue!=null)
    {
      if(typeof(changes.model.currentValue)=="string" && (changes.model.currentValue.indexOf("AM")>=0 || changes.model.currentValue.indexOf("PM")>=0))
      {
        var date=CommonService.convertStringDDMMYYYHHMMTTToDate(changes.model.currentValue);
        this.model=date;
        this.modelTime=CommonService.formatTime(this.model);
      }
      else{
        this.model=new Date(changes.model.currentValue);
        this.modelTime=CommonService.formatTime(this.model);
      }
    }
    else{
      this.reset();
    }
  }

  emit(event: any) {
    if(event!=null && event!="")
    {
      var resultValue=null;
      this.validationerror = "";
      if(this.modelTime==null)
      {
        this.modelTime="00:00 AM";
      }
      if(event==null && jQuery("#"+this.id+"-date").length>0 && jQuery("#"+this.id+"-date").val()!=null && jQuery("#"+this.id+"-date").val()!="")
      {
        var arr=jQuery("#"+this.id+"-date").val().split('/');
        if(arr.length==3 && parseInt(arr[0])>0 && parseInt(arr[1])>0 && parseInt(arr[2])>0)
        {
          resultValue=new Date(parseInt(arr[1])+"/"+parseInt(arr[0])+"/"+parseInt(arr[2]) +" "+ this.modelTime);
          this.modelChange.emit(resultValue);
        }
      }
      if(resultValue==null && this.model!=null)
      {
        resultValue=new Date((this.model.getMonth()+1)+"/"+this.model.getDate()+"/"+this.model.getFullYear() +" "+ this.modelTime);
        this.modelChange.emit(resultValue);
      }
    }
    else{
      this.modelTime=null;
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
