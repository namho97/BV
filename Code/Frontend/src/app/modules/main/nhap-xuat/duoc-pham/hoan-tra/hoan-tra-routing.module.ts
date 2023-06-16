
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HoanTraComponent } from './hoan-tra.component';


const routes: Routes = [
  {
    path: '',
     component: HoanTraComponent,
     title: 'NHẬP XUẤT > DƯỢC PHẨM > HOÀN TRẢ - CAMINO CLINIC'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HoanTraRoutingModule { }
