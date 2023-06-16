
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChucDanhComponent } from './chuc-danh.component';


const routes: Routes = [
  {
    path: '',
     component: ChucDanhComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > CHỨC DANH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChucDanhRoutingModule { }
