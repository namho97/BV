
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhomThuocComponent } from './nhom-thuoc.component';


const routes: Routes = [
  {
    path: '',
     component: NhomThuocComponent,
     title: 'QUẢN TRỊ > NHÓM DƯỢC PHẨM > NHÓM THUỐC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhomThuocRoutingModule { }
