
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThietBiXetNghiemComponent } from './thiet-bi-xet-nghiem.component';


const routes: Routes = [
  {
    path: '',
     component: ThietBiXetNghiemComponent,
     title: 'XÉT NGHIỆM > DANH MỤC > THIẾT BỊ XÉT NGHIỆM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThietBiXetNghiemRoutingModule { }
