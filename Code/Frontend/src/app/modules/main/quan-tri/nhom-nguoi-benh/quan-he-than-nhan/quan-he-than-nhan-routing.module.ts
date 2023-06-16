
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanHeThanNhanComponent } from './quan-he-than-nhan.component';


const routes: Routes = [
  {
    path: '',
     component: QuanHeThanNhanComponent,
     title: 'QUẢN TRỊ > NHÓM NGƯỜI BỆNH > QUAN HỆ THÂN NHÂN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuanHeThanNhanRoutingModule { }
