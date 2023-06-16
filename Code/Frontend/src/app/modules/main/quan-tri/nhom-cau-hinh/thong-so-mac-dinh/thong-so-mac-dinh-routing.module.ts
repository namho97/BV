
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongSoMacDinhComponent } from './thong-so-mac-dinh.component';


const routes: Routes = [
  {
    path: '',
     component: ThongSoMacDinhComponent,
     title: 'QUẢN TRỊ > NHÓM CẤU HÌNH > THÔNG SỐ MẶC ĐỊNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongSoMacDinhRoutingModule { }
