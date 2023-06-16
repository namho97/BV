
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChucVuComponent } from './chuc-vu.component';


const routes: Routes = [
  {
    path: '',
     component: ChucVuComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > CHỨC VỤ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChucVuRoutingModule { }
