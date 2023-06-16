import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';

// import { ConsoleReporter } from 'jasmine';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  controllerName = '';
  constructor(private apiService: ApiService
  ) {}

  // downloadFile(url: string,fileName:string) {
  //   const options = new RequestOptions({responseType: ResponseContentType.Blob });
  //   // Process the file downloaded
  //   this.httpTemp.get(url, options).subscribe(res => {
  //       //const fileName = getFileNameFromResponseContentDisposition(res);
  //       saveFile(res.blob(), fileName);
  //   });
  // }

  create<T>(dto: any): Observable<T> {
    return this.apiService.post<T>(this.controllerName, dto);
  }
  update<T>(dto: any): Observable<T> {
    return this.apiService.put<T>(this.controllerName, dto);
  }
  getById<T>(id: number): Observable<T> {
    return this.apiService.get<T>(`${this.controllerName}/${id}`);
  }
  deleteById(id: number) {
    return this.apiService.delete(`${this.controllerName}/${id}`);
  }
  deleteByIds(ids: number[]) {
    
    return this.apiService.post(`${this.controllerName}/Deletes`,{Ids:ids});
  }
  getDataForGrid(gridQueryInfo: any, urlCustom: string = '') {
    if (gridQueryInfo == null) {
        // var searchText = '';
        // searchText = '<SearchTerms>' + searchText + '</SearchTerms>';
        // searchText = btoa('<AdvancedQueryParameters>' + searchText + '</AdvancedQueryParameters>');

        gridQueryInfo = { skip: 0, take: 50, pageSize: 50, searchString: null };
    }
    let url = this.controllerName + '/GetDataForGridAsync';
    if (urlCustom !== undefined && urlCustom !== '') {
        url = urlCustom;
    }
    return this.apiService.post(url, gridQueryInfo);
}
getTotalPageForGrid(gridQueryInfo: any, urlCustom: string = '') {
  if (gridQueryInfo == null) {
      // var searchText = '';
      // searchText = '<SearchTerms>' + searchText + '</SearchTerms>';
      // searchText = btoa('<AdvancedQueryParameters>' + searchText + '</AdvancedQueryParameters>');

      gridQueryInfo = { skip: 0, take: 50, pageSize: 50, searchString: null };
  }
  let url = this.controllerName + '/GetTotalPageForGridAsync';
  if (urlCustom !== undefined && urlCustom !== '') {
      url = urlCustom;
  }
  return this.apiService.post(url, gridQueryInfo);
}
getDataForTree(treeQueryInfo: any, urlCustom: string = '') {  
  let url = this.controllerName + '/GetDataForTreeAsync';
  if (urlCustom !== undefined && urlCustom !== '') {
      url = urlCustom;
  }
  return this.apiService.post(url, treeQueryInfo);
}
}
