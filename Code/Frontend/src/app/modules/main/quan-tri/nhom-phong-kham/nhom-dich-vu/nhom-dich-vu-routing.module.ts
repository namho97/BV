
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhomDichVuComponent } from './nhom-dich-vu.component';


const routes: Routes = [
  {
    path: '',
     component: NhomDichVuComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > NHÓM DỊCH VỤ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhomDichVuRoutingModule { }
