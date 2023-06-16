
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonViTinhComponent } from './don-vi-tinh.component';


const routes: Routes = [
  {
    path: '',
     component: DonViTinhComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > ĐƠN VỊ TÍNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonViTinhRoutingModule { }
