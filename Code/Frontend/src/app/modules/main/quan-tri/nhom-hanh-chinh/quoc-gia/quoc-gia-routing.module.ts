
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuocGiaComponent } from './quoc-gia.component';


const routes: Routes = [
  {
    path: '',
     component: QuocGiaComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > QUỐC GIA - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuocGiaRoutingModule { }
