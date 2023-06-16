import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class QuanHeThanNhanService extends BaseService {
controllerName = 'QuanTriNhomNguoiBenhQuanHeThanNhan';

constructor(apiService: ApiService) {
    super(apiService);
}
}