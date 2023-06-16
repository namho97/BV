
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoiDungMauComponent } from './noi-dung-mau.component';


const routes: Routes = [
  {
    path: '',
     component: NoiDungMauComponent,
     title: 'QUẢN TRỊ > NHÓM CẤU HÌNH > NỘI DUNG MẪU - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoiDungMauRoutingModule { }
