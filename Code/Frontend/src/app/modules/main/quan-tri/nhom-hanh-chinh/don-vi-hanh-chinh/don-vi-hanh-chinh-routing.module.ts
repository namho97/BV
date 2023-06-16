
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonViHanhChinhComponent } from './don-vi-hanh-chinh.component';


const routes: Routes = [
  {
    path: '',
     component: DonViHanhChinhComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > ĐƠN VỊ HÀNH CHÍNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonViHanhChinhRoutingModule { }
