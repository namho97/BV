
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoiDungMauXuatRaPdfComponent } from './noi-dung-mau-xuat-ra-pdf.component';


const routes: Routes = [
  {
    path: '',
     component: NoiDungMauXuatRaPdfComponent,
     title: 'BÁO CÁO > BÁC SĨ > KHÁM BỆNH - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoiDungMauXuatRaPdfRoutingModule { }
