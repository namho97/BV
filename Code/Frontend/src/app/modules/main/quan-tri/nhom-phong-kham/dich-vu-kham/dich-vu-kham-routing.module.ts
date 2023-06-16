
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DichVuKhamComponent } from './dich-vu-kham.component';


const routes: Routes = [
  {
    path: '',
     component: DichVuKhamComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > DỊCH VỤ KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DichVuKhamRoutingModule { }
