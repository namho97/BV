
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhaSanXuatComponent } from './nha-san-xuat.component';


const routes: Routes = [
  {
    path: '',
     component: NhaSanXuatComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > NHÀ SẢN XUẤT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhaSanXuatRoutingModule { }
