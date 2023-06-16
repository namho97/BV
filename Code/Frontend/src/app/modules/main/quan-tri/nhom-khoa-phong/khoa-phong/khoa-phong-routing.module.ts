
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhoaPhongComponent } from './khoa-phong.component';


const routes: Routes = [
  {
    path: '',
     component: KhoaPhongComponent,
     title: 'QUẢN TRỊ > NHÓM KHOA PHÒNG > KHOA PHÒNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoaPhongRoutingModule { }
