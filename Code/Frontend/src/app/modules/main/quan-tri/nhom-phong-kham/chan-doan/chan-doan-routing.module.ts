
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChanDoanComponent } from './chan-doan.component';


const routes: Routes = [
  {
    path: '',
     component: ChanDoanComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > CHẨN ĐOÁN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChanDoanRoutingModule { }
