import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonService } from 'src/app/core/utilities/common.helper';

@Component({
  selector: 'app-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoneyComponent implements OnInit {
  suggestionArray:any[]=[];
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() maxLength: number;
  @Input() min: number=0;
  @Input() max: number;
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
  @Input() suggestions: boolean = true;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model != undefined && changes.model.currentValue != null) {
      this.model=CommonService.formatMoney(changes.model.currentValue);
    }
  }
  ngAfterViewInit(){
    var self = this;
    if (this.isAutoFocus) {
      setTimeout(function () {
        self.focus();
      },1000);
    }
  }

  getSuggestions(input:any){
    this.suggestionArray=[];
    if(input!=null)
    {
      if(input.toString().length<4)
      {
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(4-input.toString().length)));
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(5-input.toString().length)));
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(6-input.toString().length)));

      }
      else{
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(1)));
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(2)));
        this.suggestionArray.push(Number(input.toString()+CommonService.genString0(3)));
      }
    }

  }
  selectSuggestion(item:any){
    this.model=CommonService.formatMoney(item);
    this.emit(this.model);
  }
  emit(event: any) {
    this.validationerror = "";
    event = event.replace(/\./g, '');
    event = Number(event);
    this.modelChange.emit(event);
    this.getSuggestions(event);
  }
  blur() {
    if(this.model!=null)
    {
      var data=this.model.replace(/\./g, '');
      data = Number(data);
      if(this.min!=null && this.min>data)
      {
        this.validationerror=this.label +" không được nhỏ hơn "+CommonService.formatMoney(this.min);
        if (document.getElementById(this.id) != undefined) {
          document.getElementById(this.id).focus();
          this.cd.detectChanges();
        }
      }
      else{
        if(this.max!=null && this.max<data)
        {
          this.validationerror=this.label +" không được lớn hơn "+CommonService.formatMoney(this.max);
          if (document.getElementById(this.id) != undefined) {
            document.getElementById(this.id).focus();
            this.cd.detectChanges();
          }
        }
        else{
          this.blurChange.emit(true);        
        }
      }
    }
    else{
      this.blurChange.emit(true);        
    }
    var self=this;
    setTimeout(function(){      
      self.suggestionArray=[];
    },500)
  }
  reset(){
    this.model=null;
    this.validationerror=null;
    this.modelChange.emit(null);
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

  focus() {
    if (document.getElementById(this.id + "-focus") != undefined) {
      document.getElementById(this.id + "-focus").focus();
      this.cd.detectChanges();
    }
  }
}
