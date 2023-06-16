import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
declare let $;

@Component({
  selector: 'app-textbox-double',
  templateUrl: './textbox-double.component.html',
  styleUrls: ['./textbox-double.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextboxDoubleComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() model1: any;
  @Input() model2: any;
  @Input() placeHolder: string = "";
  @Input() maxLength: number;
  @Input() type: string = "text";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() required: boolean = false;
  @Input() validationerror: string = "";
  @Input() customClass: string = "";
  @Input() iconType: number = 1;//1: material icon,2: base 64 image
  @Input() icon: string = null;
  @Input() iconTooltip: string = null;
  @Input() isAutoFocus: boolean = false; // required id
  @Input() floatLabel: string = "auto";  //auto||always
  @Input() showIconClear: boolean = true;
  @Input() iconSuffix: boolean = true;
  @Output() model1Change: EventEmitter<any> = new EventEmitter<any>();
  @Output() model2Change: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    var self = this;
    if (this.isAutoFocus) {
      setTimeout(function () {
        self.focus(1);
      },1000);
    }
  }

  emit(type:number,event: any) {
    this.validationerror = "";
    if (this.type=='money') {
      event = event.replace(/\./g, '');
      event = Number(event);
    }
    if(type==1)
      this.model1Change.emit(event);
    if(type==2)
      this.model2Change.emit(event);
  }
  blur(type:number) {
    this.blurChange.emit(true);
    if(type==2 && (this.model1==null||this.model1=="") && (this.model2==null||this.model2==""))
    {
      if($("#"+this.id).find("mat-form-field").hasClass("mat-form-field-should-float"))
      {
        $("#"+this.id).find("mat-form-field").removeClass("mat-form-field-should-float");
      }
    }
  }
  click(type:number){
    var self = this;
    setTimeout(function () {
      if (document.getElementById(self.id + type) != undefined) {
        document.getElementById(self.id + type).focus();
        self.cd.detectChanges();
        if($("#"+self.id).find("mat-form-field").length>0)
        {
          $("#"+self.id).find("mat-form-field").addClass("mat-form-field-should-float");
        }
      }
    });
  }
  reset(){
    this.model1=null;
    this.model2=null;
    this.emit(1,this.model1);
    this.emit(2,this.model2);
    this.clearEvent.emit(true);
  }

  onKey(event)
  {
    this.onKeyChange.emit(event);
  }
  onEnter(event) {
    this.onEnterChange.emit(event);
  }
  iconClick(){
    this.onIconClick.emit(event);

  }

  focus(type:number) {
    if (document.getElementById(this.id + type+"-focus") != undefined) {
      document.getElementById(this.id + type+"-focus").focus();
      this.cd.detectChanges();
    }
  }
}
