
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhapKhoComponent } from './nhap-kho.component';


const routes: Routes = [
  {
    path: '',
     component: NhapKhoComponent,
     title: 'NHẬP XUẤT > VẬT TƯ > NHẬP KHO - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhapKhoRoutingModule { }
