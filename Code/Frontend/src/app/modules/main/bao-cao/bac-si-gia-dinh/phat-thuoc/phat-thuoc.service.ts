import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class PhatThuocService extends BaseService {
controllerName = 'BaoCaoBacSiGiaDinhPhatThuoc';

constructor(apiService: ApiService) {
    super(apiService);
}
}