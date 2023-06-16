
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoiDanComponent } from './loi-dan.component';


const routes: Routes = [
  {
    path: '',
     component: LoiDanComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > LỜI DẶN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoiDanRoutingModule { }
