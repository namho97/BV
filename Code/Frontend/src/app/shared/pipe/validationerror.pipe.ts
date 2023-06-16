import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { ValidationError } from "../models/api-error.model";

@Pipe({
  name: 'validationerror',
  pure: false
})
@Injectable()
export class ValidationErrorPipe implements PipeTransform {
  transform(field:string,errors: ValidationError[]) {
    var mess="";
    if(errors!=null)
    {
      errors.forEach(element => {
        if(element.Field === field){
          mess+=element.Message+"<br/>";
        }
      });
    }
    return mess;
  }
}
