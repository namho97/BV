
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViTriDeDuocPhamVatTuComponent } from './vi-tri-de-duoc-pham-vat-tu.component';


const routes: Routes = [
  {
    path: '',
     component: ViTriDeDuocPhamVatTuComponent,
     title: 'QUẢN TRỊ > NHÓM KHO > VỊ TRÍ ĐỂ DP/VT - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViTriDeDuocPhamVatTuRoutingModule { }
