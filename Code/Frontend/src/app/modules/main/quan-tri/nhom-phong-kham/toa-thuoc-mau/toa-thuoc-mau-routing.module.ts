
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToaThuocMauComponent } from './toa-thuoc-mau.component';


const routes: Routes = [
  {
    path: '',
     component: ToaThuocMauComponent,
     title: 'QUẢN TRỊ > NHÓM PHÒNG KHÁM > TOA THUỐC MẪU - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToaThuocMauRoutingModule { }
