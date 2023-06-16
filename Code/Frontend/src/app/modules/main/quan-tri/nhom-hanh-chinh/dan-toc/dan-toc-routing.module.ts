
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DanTocComponent } from './dan-toc.component';


const routes: Routes = [
  {
    path: '',
     component: DanTocComponent,
     title: 'QUẢN TRỊ > NHÓM HÀNH CHÍNH > DÂN TỘC - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanTocRoutingModule { }
