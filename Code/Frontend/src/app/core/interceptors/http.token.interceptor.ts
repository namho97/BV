// import { NotificationComponent } from 'src/app/shared/component/dialogs/notification/notification.component';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  dialogWarning:any=null;
  constructor(private authService: AuthService) { 
    this.dialogWarning=null;
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getToken();
    if (req.url.indexOf("SaveFileUpload") > -1) {
      //   //req.url: structure JSON [{name, url}];
      // let urls = JSON.parse(req.url);
      // let url: string = "";
      // let data: any = null;
      // let contentType = undefined;
      // if (req.body) {
      //   req.body.forEach(file => {
      //     data = file;
      //     contentType = file.type;
      //     url = urls.filter(o => o.name == file.name)[0].url;
      //   });
      // }
      // const headers = new HttpHeaders({
      //   'content-type': contentType,
      // })
      // const request = new HttpRequest('PUT', url, data, { headers: headers, reportProgress: true });
      // return next.handle(request);
      return next.handle(req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken.Token}`) }));
    }
    else {
      const userLocal = this.authService.getAccessUser();
      const headersConfig = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };      
      if (accessToken) {
        headersConfig['Authorization'] = `Bearer ${accessToken.Token}`;
      }

      if(userLocal)
      {
        headersConfig['UserType'] = userLocal.UserType + "";
      }
      const request = req.clone({ setHeaders: headersConfig });
      return next.handle(request);
    }



  }
}
