import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from 'src/app/shared/models/api-error.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getClientErrorMessage(error: Error): string {
    return error.message ?
           error.message :
           error.toString();
  }

  getServerError(error: HttpErrorResponse): ApiError {
    if (!navigator.onLine) {
      return new ApiError('No Internet Connection')
    }
    if(error.error!=null && error.error.Message){
      return new ApiError(error.error.Message, error.status, error.error.Detail, error.error.Errors)
    }
    return new ApiError(error.message)
  }
  getValidationErrors(error: ApiError) {
   if(error!=null && error.ValidationErrors!=null && error.ValidationErrors.length>0)
   {
     var mess="CÓ LỖI XẢY RA TRONG QUÁ TRÌNH GỬI YÊU CẦU:<br/><ul class='m-0 pl-4'>";
     
     error.ValidationErrors.forEach((item, _index) =>{
      mess+="<li>"+item.Message+"</li>";
     });
     mess+="</ul>";
     return mess;
   }
   return null;
  }
}
