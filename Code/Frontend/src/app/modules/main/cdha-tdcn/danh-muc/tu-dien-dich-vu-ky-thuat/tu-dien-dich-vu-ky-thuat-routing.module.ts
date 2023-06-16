
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TuDienDichVuKyThuatComponent } from './tu-dien-dich-vu-ky-thuat.component';


const routes: Routes = [
  {
    path: '',
     component: TuDienDichVuKyThuatComponent,
     title: 'CĐHA-TDCN > DANH MỤC > TỪ ĐIỂN DỊCH VỤ KỸ THUẬT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TuDienDichVuKyThuatRoutingModule { }
