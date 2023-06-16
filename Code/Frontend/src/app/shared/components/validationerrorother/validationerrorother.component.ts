
import { Component,Input,OnInit,ViewEncapsulation ,Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-validationerrorother',
  templateUrl: './validationerrorother.component.html',
  styleUrls: ['./validationerrorother.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ValidationerrorotherComponent implements OnInit {

  @Input() validationerror:string="";
  @Output() clearValidateErrorOtherCallback = new EventEmitter<any>();
  constructor() {
  }
  ngOnInit(){

  }
  clear(){
    this.clearValidateErrorOtherCallback.emit(this.validationerror);
    this.validationerror="";
  }
}
