import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { CommonService } from "../utilities/common.helper";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.api_url}/${path}`, { params });
  }

  put<T>(path: string, body: Object = {}): Observable<T> {
    var bodyCopy=Object.assign({}, body);
    return this.http.put<T>(
      `${environment.api_url}/${path}`,
      JSON.stringify(CommonService.replaceDateToStringBeforeStringify(bodyCopy))
    );
  }

  post<T>(path: string, body: Object = {}): Observable<T> {
    var bodyCopy=Object.assign({}, body);
    return this.http.post<T>(
      `${environment.api_url}/${path}`,
      JSON.stringify(CommonService.replaceDateToStringBeforeStringify(bodyCopy))
    );
  }

  postArray<T>(path: string, body): Observable<T> {
    return this.http.post<T>(
      `${environment.api_url}/${path}`,
      JSON.stringify(body)
    );
  }
  // post<T>(path: string, body: Object = {}): Observable<T> {
  //   return this.http.post<T>(
  //     `${environment.api_url}${path}`,
  //     JSON.stringify(body)
  //   ).pipe(catchError(this.formatErrors));
  // }

  putFormData<T>(path: string, body: any = undefined, withContentType = true): Observable<T> {
    //var bodyCopy = Object.assign({}, body);
    return this.http.put<T>(`${environment.api_url}/${path}`, withContentType ? this.getFormUrlNotEncoded(body) : body,
    
    withContentType ? 
    {
      headers:
      {
        'Content-Type': withContentType ? 'application/x-www-form-urlencoded' : '',
      }
    } : undefined);
  }
  postFormData<T>(path: string, body: any = undefined): Observable<T> {
    return this.http.post<T>(`${environment.api_url}/${path}`, this.getFormUrlNotEncoded(body), {
      headers:
      {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }
  private getFormUrlNotEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = toConvert[property];
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${environment.api_url}/${path}`);
  }

  postExportExcel<T>(path: string, body: Object = {}): Observable<T> {
    var bodyCopy=Object.assign({}, body);
    return this.http.post<T>(
      `${environment.api_url}/${path}`,
      JSON.stringify(CommonService.replaceDateToStringBeforeStringify(bodyCopy)), {
        responseType: 'arrayBuffer' as 'json', headers: null
      }
    );
  }

  postExportPdf<T>(path: string, body: Object = {}): Observable<T> {
    var bodyCopy=Object.assign({}, body);
    return this.http.post<T>(
      `${environment.api_url}/${path}`,
      JSON.stringify(CommonService.replaceDateToStringBeforeStringify(bodyCopy)), {
        responseType: 'arrayBuffer' as 'json', headers: null
      }
    );
  }
}
