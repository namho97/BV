
import { Directive } from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Directive({
  selector: 'mat-select[openOnKeyup]'
})
export class OpenOnKeyUpDirective {
  constructor(select: MatSelect) {
    const nativeEl = select._elementRef.nativeElement;
    nativeEl.addEventListener("keyup", (e) => {
      if(e.code!='Tab' && e.code!='Enter')
      {
        select.open();  
      }      
    });
  }
}