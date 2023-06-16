
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XuatKhoComponent } from './xuat-kho.component';


const routes: Routes = [
  {
    path: '',
     component: XuatKhoComponent,
     title: 'NHẬP XUẤT > DƯỢC PHẨM > XUẤT KHO - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XuatKhoRoutingModule { }
