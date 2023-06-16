
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrieuChungComponent } from './trieu-chung.component';


const routes: Routes = [
  {
    path: '',
     component: TrieuChungComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > TRIỆU CHỨNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrieuChungRoutingModule { }
