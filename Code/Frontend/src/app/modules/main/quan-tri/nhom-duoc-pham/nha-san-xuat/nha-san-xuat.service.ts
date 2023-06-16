
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class NhaSanXuatService extends BaseService {
  controllerName = 'QuanTriNhomDuocPhamNhaSanXuat';

  constructor(apiService: ApiService) {
    super(apiService);
  }
}