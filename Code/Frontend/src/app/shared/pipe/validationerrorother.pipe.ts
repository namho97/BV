
import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
  name: 'validationerrorother',
  pure: false
})
@Injectable()
export class ValidationErrorOtherPipe implements PipeTransform {
  transform(propertyName:string,error:any) {
    var mess="";
    if(error!=null)
    {
      error.forEach(element => {
        if(element.PropertyName===propertyName){
          mess="has-error";
        }
      });   
    }
    return mess;
  }
}