import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() required:boolean=false;
  @Input() validationerror: string = "";
  @Input() showIconClear: boolean = true;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    // You can also use model.previousValue and
    // model.firstChange for comparing old and new values
    if(changes.model!=undefined &&changes.model.currentValue!=null)
    {
      if(typeof(changes.model.currentValue)=="string" && changes.model.currentValue.split("/").length==3)
      {
        var arr=changes.model.currentValue.split("/");
        this.model=new Date(parseInt(arr[2]),parseInt(arr[1]),parseInt(arr[0]),0,0,0);
      }
      else{
        var d=new Date(changes.model.currentValue);
        this.model=new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0);
      }
    }
  }

  emit(event: any) {
    console.log(event);
    if(event==null && jQuery("#"+this.id).find("input").length>0 && jQuery("#"+this.id).find("input").val()!=null && jQuery("#"+this.id).find("input").val()!="")
    {
      var arr=jQuery("#"+this.id).find("input").val().split('/');
      if(arr.length==3 && parseInt(arr[0])>0 && parseInt(arr[1])>0 && parseInt(arr[2])>0)
      {
        event=new Date(parseInt(arr[2]),parseInt(arr[1])-1,parseInt(arr[0]),0,0,0);
      }
    }
    this.validationerror = "";
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
