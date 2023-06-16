import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-textboxnumeric',
    templateUrl: './textboxnumeric.component.html',
    styleUrls: ['./textboxnumeric.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TextboxnumericComponent implements OnInit {

    
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() min: number;
  @Input() max: number;
  @Input() stepNumber: number=1;
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() upperCase: boolean = false;
  @Input() required: boolean = false;
  @Input() validationerror: string = "";
  @Input() customClass: string = "";
  @Input() icon: string = null;
  @Input() iconTooltip: string = null;
  @Input() isAutoFocus: boolean = false; // required id
  @Input() floatLabel: string = "auto";  //auto||always
  @Input() showIconClear: boolean = true;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconClick: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    var self = this;
    if (this.isAutoFocus) {
      setTimeout(function () {
        self.focus();
      },1000);
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.model != undefined && changes.model.currentValue != null) {
      if(this.min!=null && changes.model.currentValue<this.min)
      {
        this.validationerror=this.label+ " phải lớn hơn "+this.min;
      }
      else{
        if(this.max!=null && changes.model.currentValue>this.max)
        {
          this.validationerror=this.label+ " phải nhỏ hơn "+this.max;
        }      
        else{
          this.emit(changes.model.currentValue);
        }
      }
    }
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
    this.emit(this.model);
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

  focus() {
    if (document.getElementById(this.id + "-focus") != undefined) {
      document.getElementById(this.id + "-focus").focus();
      this.cd.detectChanges();
    }
  }
  giam(){
    if(this.model==null ||this.model==0)
    {
      this.model=0;
    }
    else{
      this.model=Number(this.model) - this.stepNumber;
    }
    this.emit(this.model);
  }
  tang(){    
    if(this.model==null)
    {
      this.model=1;
    }
    else{
      this.model=Number(this.model) + this.stepNumber;
    }
    this.emit(this.model);
  }
}


