import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../error/error.service';
import { Router } from '@angular/router';
import { SystemMessage } from 'src/app/shared/configdata/system-message';
import { ApiError } from 'src/app/shared/models/api-error.model';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService,private router:Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          return throwError(new ApiError(SystemMessage.UnAuthorizedMessage));
        }
        else{
          if (error.status === 401) {
            //this.authService.expiredSection();
            this.router.navigate(['/']);
            var err=new ApiError("Thời gian làm việc của bạn đã hết. Bạn phải đăng nhập lại.");
            return throwError(err);
          } else {
            if(error.statusText== "Unknown Error")
            {
              //this.router.navigate(["loi-he-thong"]);
              var err=new ApiError("Có lỗi xảy ra trong quá trình gửi yêu cầu lên server. Bạn hãy thử làm lại lần nữa. Cảm ơn.");
              return throwError(err);
            }
            else
            {
              return throwError(this.errorService.getServerError(error));
            }
          }
        }
      })
    );
  }
}
