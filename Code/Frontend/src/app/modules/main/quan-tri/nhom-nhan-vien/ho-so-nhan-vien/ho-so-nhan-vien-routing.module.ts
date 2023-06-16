
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoSoNhanVienComponent } from './ho-so-nhan-vien.component';


const routes: Routes = [
  {
    path: '',
     component: HoSoNhanVienComponent,
     title: 'QUẢN TRỊ > NHÓM NHÂN VIÊN > HỒ SƠ NHÂN VIÊN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoSoNhanVienRoutingModule { }
