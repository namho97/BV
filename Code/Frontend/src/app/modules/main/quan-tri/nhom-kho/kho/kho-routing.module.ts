
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhoComponent } from './kho.component';


const routes: Routes = [
  {
    path: '',
     component: KhoComponent,
     title: 'QUẢN TRỊ > NHÓM KHO > KHO - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhoRoutingModule { }
