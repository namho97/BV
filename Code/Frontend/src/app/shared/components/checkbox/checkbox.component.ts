import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() model: any;
  @Input() placeHolder: string = "";
  @Input() readonly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() validationerror: string = "";
  @Input() customClass: string = "mb-3";
  @Output() modelChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.model != undefined && changes.model.currentValue != null) {
      this.model=JSON.parse(changes.model.currentValue)
    }
  }

  emit(event: any) {
    this.validationerror = "";
    this.modelChange.emit(event);
  }

}
