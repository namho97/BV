
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuongDungComponent } from './duong-dung.component';


const routes: Routes = [
  {
    path: '',
     component: DuongDungComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > ĐƯỜNG DÙNG - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuongDungRoutingModule { }
