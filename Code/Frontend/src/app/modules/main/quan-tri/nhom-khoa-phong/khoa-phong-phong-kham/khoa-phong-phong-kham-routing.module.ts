
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhoaPhongPhongKhamComponent } from './khoa-phong-phong-kham.component';


const routes: Routes = [
  {
    path: '',
     component: KhoaPhongPhongKhamComponent,
     title: 'QUẢN TRỊ > NHÓM KHOA PHÒNG > KHOA PHÒNG - PHÒNG KHÁM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoaPhongPhongKhamRoutingModule { }
