
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VanBanChuyenMonComponent } from './van-ban-chuyen-mon.component';


const routes: Routes = [
  {
    path: '',
     component: VanBanChuyenMonComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > VĂN BẰNG CHUYÊN MÔN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VanBanChuyenMonRoutingModule { }
