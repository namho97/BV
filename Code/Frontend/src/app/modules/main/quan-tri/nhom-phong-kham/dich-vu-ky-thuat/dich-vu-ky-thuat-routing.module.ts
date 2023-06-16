
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DichVuKyThuatComponent } from './dich-vu-ky-thuat.component';


const routes: Routes = [
  {
    path: '',
     component: DichVuKyThuatComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > DỊCH VỤ KỸ THUẬT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DichVuKyThuatRoutingModule { }
