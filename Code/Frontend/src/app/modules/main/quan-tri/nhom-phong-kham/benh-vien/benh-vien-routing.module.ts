
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BenhVienComponent } from './benh-vien.component';


const routes: Routes = [
  {
    path: '',
     component: BenhVienComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > BỆNH VIỆN - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BenhVienRoutingModule { }
