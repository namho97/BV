import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextboxComponent implements OnInit {
  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
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
  @Input() showIconSearch: boolean = false;
  @Input() iconSuffix: boolean = true;
  @Input() showOnHeader: boolean = false;
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() blurChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onKeyChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private cd: ChangeDetectorRef
  ) { }

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
    this.modelChange.emit(null);
    this.clearEvent.emit(true);
  }
  search(){
    this.searchEvent.emit(true);
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
