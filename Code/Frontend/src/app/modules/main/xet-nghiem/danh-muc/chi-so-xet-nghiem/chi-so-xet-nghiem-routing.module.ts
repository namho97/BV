
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChiSoXetNghiemComponent } from './chi-so-xet-nghiem.component';


const routes: Routes = [
  {
    path: '',
     component: ChiSoXetNghiemComponent,
     title: 'XÉT NGHIỆM > DANH MỤC > CHỈ SỐ XÉT NGHIỆM - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChiSoXetNghiemRoutingModule { }
