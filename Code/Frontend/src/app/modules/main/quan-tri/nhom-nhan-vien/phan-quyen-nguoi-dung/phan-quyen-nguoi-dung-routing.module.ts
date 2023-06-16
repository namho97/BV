
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhanQuyenNguoiDungComponent } from './phan-quyen-nguoi-dung.component';


const routes: Routes = [
  {
    path: '',
     component: PhanQuyenNguoiDungComponent,
     title: 'QUẢN TRỊ > NHÓM NHÂN VIÊN > PHÂN QUYỀN NGƯỜI DÙNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhanQuyenNguoiDungRoutingModule { }
