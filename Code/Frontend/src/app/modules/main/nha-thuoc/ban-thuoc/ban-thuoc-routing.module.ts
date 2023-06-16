
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanThuocComponent } from './ban-thuoc.component';


const routes: Routes = [
  {
    path: '',
     component: BanThuocComponent,
     title: 'NHÀ THUỐC > BÁN THUỐC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanThuocRoutingModule { }
