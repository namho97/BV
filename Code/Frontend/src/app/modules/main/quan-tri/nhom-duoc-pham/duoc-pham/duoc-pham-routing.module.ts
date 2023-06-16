
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuocPhamComponent } from './duoc-pham.component';


const routes: Routes = [
  {
    path: '',
     component: DuocPhamComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > DƯỢC PHẨM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuocPhamRoutingModule { }
