
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhoaPhongNhanVienComponent } from './khoa-phong-nhan-vien.component';


const routes: Routes = [
  {
    path: '',
     component: KhoaPhongNhanVienComponent,
     title: 'QUẢN TRỊ > NHÓM KHOA PHÒNG > KHOA PHÒNG - NHÂN VIÊN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoaPhongNhanVienRoutingModule { }
